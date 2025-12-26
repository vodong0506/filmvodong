import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const categoryRef = collection(db, "category");

export const createCategory = (name) => {
  return addDoc(categoryRef, {
    name,
    createdAt: serverTimestamp(),
  });
};

export const getCategories = async () => {
  const q = query(categoryRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deleteCategory = async (id) => {
  try {
    const docRef = doc(db, "category", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Xóa thể loại thất bại:", error);
    throw error; // để component có thể bắt lỗi
  }
};

export const updateCategory = async (id, name) => {
  try {
    const docRef = doc(db, "category", id);
    await updateDoc(docRef, {
      name,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Cập nhật thể loại thất bại:", error);
    throw error;
  }
};
