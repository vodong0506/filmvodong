import {
  addDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const commentRef = collection(db, "comments");

export const createComment = async (data) => {
  return addDoc(commentRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const getCommentsByMovieId = async (movieId) => {
  if (!movieId) return [];

  const q = query(
    commentRef,
    where("movieId", "==", movieId),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};


