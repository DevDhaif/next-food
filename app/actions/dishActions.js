"use server";

import {
  updateDoc,
  doc,
  serverTimestamp,
  deleteDoc,
  addDoc,
  collection,
  increment,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "@firebase/storage";
import db from "@/lib/firestore";

export async function addDish(formData) {
  try {
    const image = formData.get("image");
    let imgUrl = "";

    if (image) {
      const storage = getStorage();
      const storageRef = ref(storage, `foodImages/${image.name}`);
      const uploadTaskSnapshot = await uploadBytes(storageRef, image);
      imgUrl = await getDownloadURL(uploadTaskSnapshot.ref);
    }

    const dishData = {
      name: formData.get("name"),
      calories: Number(formData.get("calories")),
      category: formData.get("category"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      imgUrl: imgUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "dishes"), dishData);

    return { success: true, id: docRef.id, imgUrl: imgUrl };
  } catch (error) {
    console.error("Error adding dish:", error);
    return { success: false, error: error.message };
  }
}

export async function updateDish(formData) {
  try {
    const id = formData.get("id");
    const image = formData.get("image");

    let imgUrl = formData.get("imgUrl");

    if (image) {
      const storage = getStorage();
      const storageRef = ref(storage, `foodImages/${image.name}`);
      const uploadTaskSnapshot = await uploadBytes(storageRef, image);
      imgUrl = await getDownloadURL(uploadTaskSnapshot.ref);
    }

    const dishRef = doc(db, "dishes", id);
    await updateDoc(dishRef, {
      name: formData.get("name"),
      calories: Number(formData.get("calories")),
      category: formData.get("category"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      imgUrl: imgUrl,
      updatedAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating dish:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteDish(id) {
  try {
    const dishRef = doc(db, "dishes", id);
    await deleteDoc(dishRef);
    const countRef = doc(db, "metadata", "dishsCount");
    // await updateDoc(countRef, { count: increment(-1) });
    return { success: true };
  } catch (error) {
    console.error("Error deleting dish:", error);
    return { success: false, error: error.message };
  }
}
