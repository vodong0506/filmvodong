import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const commentRef = collection(db, "comments");

export const createComment = async (data) => {
  return addDoc(commentRef, {
    ...data,
    createdAt: new Date(),
  });
};

export const getCommentsByMovieId = async (movieId) => {
  if (!movieId) return [];

  const q = query(commentRef, where("movieId", "==", movieId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deleteComment = async (movieId) => {
  if (!movieId) return;

  const commentDoc = doc(db, "comments", movieId);
  return deleteDoc(commentDoc);
};




