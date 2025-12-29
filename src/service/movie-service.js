import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const movieRef = collection(db, "movie");

export const createMovie = async (data) => {
  return addDoc(movieRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const getListMovie = async () => {
  const q = query(movieRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deleteMovie = async (id) => {
  try {
    const movieRef = doc(db, "movie", id);
    await deleteDoc(movieRef);
  } catch (error) {
    console.error("Xóa thể loại thất bại:", error);
    throw error; // để component có thể bắt lỗi
  }
};

export const updateMovie = async (id, data) => {
  try {
    const docRef = doc(db, "movie", id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Cập nhật thể loại thất bại:", error);
    throw error;
  }
};

export const getMovieById = async (id) => {
  if (!id) return null;

  const ref = doc(db, "movie", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
};
