import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, storage } from "../config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const addUser = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData, { merge: true });
    console.log("Додано користувача:", userId);
    return userData;
  } catch (error) {
    console.error("Помилка додавання користувача:", error);
  }
};

export const addPost = async (userId, post) => {
  try {
    const userDocRef = doc(db, "posts", userId);

    await updateDoc(userDocRef, {
      posts: arrayUnion(post),
    });

    console.log("Пост додано:", post);
  } catch (error) {
    if (error.code === "not-found") {
      await setDoc(doc(db, "posts", userId), { userId, posts: [post] });
      console.log("Документ створений:", post);
    } else {
      console.error("Помилка поста:", error);
    }
  }
};

export const getUser = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("Немає користувача!");
    return null;
  }
};

export const updateUserInFirestore = async (uid, data) => {
  try {
    await setDoc(doc(db, "users", uid), data, { merge: true }); // merge: true - для оновлення існуючого документа або створення нового
    console.log("Дані користувача змінені:", uid);
  } catch (error) {
    console.error("Помилка зберігання до БД:", error);
  }
};

export const getPosts = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is undefined or invalid");
    }

    const docRef = doc(db, "posts", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().posts;
    } else {
      console.warn("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error;
  }
};

export const uploadImage = async (userId, file, fileName) => {
  try {
    const imageRef = ref(storage, `profilePhotos/${userId}/${fileName}`);
    const result = await uploadBytes(imageRef, file);

    const imageUrl = await getImageUrl(imageRef);
    console.log("Upload result:", result);
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const getImageUrl = async (imageRef) => {
  const url = await getDownloadURL(imageRef);
  return url;
};

export const addCommentToPost = async (userId, postId, newComment) => {
  console.log("userId", userId, "postId", postId);
  try {
    const postRef = doc(db, "posts", userId);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      const postData = postSnap.data();

      const updatedPost = {
        ...postData,
        posts: postData.posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...post.comments, newComment],
            };
          }
          return post;
        }),
      };

      await updateDoc(postRef, { posts: updatedPost.posts });
      console.log("Comment added successfully!");
    } else {
      console.log("No such post exists!");
    }
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};
