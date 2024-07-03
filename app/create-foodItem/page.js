"use client";
import { useState } from "react";
import db from "@/lib/firestore";
import { collection, addDoc, serverTimestamp } from "@firebase/firestore";
import { useToast } from "@/components/ui/use-toast";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import categories from "../data/catgegories";

function CreateFoodItem() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [calories, setCalories] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [image, setImage] = useState(null);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (image) {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `foodImages/${image.name}`);
        const uploadTaskSnapshot = await uploadBytes(storageRef, image);
        imgUrl = await getDownloadURL(uploadTaskSnapshot.ref);
      } catch (e) {
        console.error("ERROR UPLOADING THE IMAGE", e);
        toast({
          title: "ERROR UPLOADING THE IMAGE!",
          description: e.message,
          duration: 3000,
        });
        return;
      }
    }
    try {
      const docRef = await addDoc(collection(db, "dishes"), {
        name: name,
        price: price,
        calories: calories,
        imgUrl: imgUrl,
        likes: 0,
        category: category,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast({
        title: "!شكرًا ",
        description: "DONE",
        duration: 3000,
      });
    } catch (e) {
      toast({
        title: "!something went wrong ",
        description: "NO",
        duration: 3000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">الاسم</label>
        <input
          type="text"
          id="name"
          placeholder="FOOD NAME"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
      />
      <input
        type="file"
        id="image"
        onChange={(e) => setImage(e.target.files[0])}
        max="6"
        accept=".jpg,.png,.jpeg"
        required
      />
      <button type="submit">Add Food Item</button>
    </form>
  );
}

export default CreateFoodItem;
