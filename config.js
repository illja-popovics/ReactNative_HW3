// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDTmpZxyxt67YLIgWKlEcvQiHXofYrF8r4',
  authDomain: 'homeworkapp-5941e.firebaseapp.com',
  projectId: 'homeworkapp-5941e',
  storageBucket: 'homeworkapp-5941e.appspot.com',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(
  app,
  { persistence: getReactNativePersistence(AsyncStorage)}
);
export const db = getFirestore(app);
export const storage = getStorage(app);
