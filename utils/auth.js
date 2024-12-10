import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../config';
import { setUserInfo, clearUserInfo } from '../redux/reducers/userSlice';
import { addUser, getUser } from './store';

export const registerDB = async ({ email, password, displayName }, dispatch) => {
  try {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);
    const user = credentials.user;
    const userData = { uid: user.uid, email: user.email || '', displayName: displayName || ''}
    dispatch(setUserInfo({
      uid: userData.uid,
      email: userData.email,
      displayName: userData.displayName,
      profilePhoto: user?.photoURL,
    }));
    await addUser(user.uid, userData);
  } catch (error) {
    console.log('SIGNUP ERROR:', error)
  };
};

export const loginDB = async ({ email, password }, dispatch) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const user = credentials.user;

    dispatch(setUserInfo({
      uid: user.uid,
      email: user?.email || '',
      profilePhoto: user?.photoURL || "",
    }));
    return user;
  } catch (error) {
    console.log(error)
  }
};

export const logoutDB = async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(clearUserInfo());
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const authStateChanged = (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userData = await getUser(user.uid)

      dispatch(setUserInfo({
        ...userData,
        uid: user.uid,
        email: user.email || ''
      }));
    } else {
      dispatch(clearUserInfo());
    }
  });
};

export const updateUserProfile = async (update) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};
