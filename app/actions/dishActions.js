// app/actions/dishActions.js
"use server";

import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "@firebase/storage";
import db from "@/lib/firestore";

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
      calories: formData.get("calories"),
      category: formData.get("category"),
      description: formData.get("description"),
      price: formData.get("price"),
      imgUrl: imgUrl,
      updatedAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating dish:", error);
    return { success: false, error: error.message };
  }
}
