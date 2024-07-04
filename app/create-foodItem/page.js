"use client";
import { useState } from "react";
import db from "@/lib/firestore";
import { collection, addDoc, serverTimestamp } from "@firebase/firestore";
import { useToast } from "@/components/ui/use-toast";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import categories from "../data/catgegories";
import CustomNumberInput from "@/components/CustomNumberInput";

function CreateFoodItem() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [calories, setCalories] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imgUrl = "";
    if (image) {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `foodImages/${image.name}`);
        const uploadTaskSnapshot = await uploadBytes(storageRef, image);
        imgUrl = await getDownloadURL(uploadTaskSnapshot.ref);
        setName("");
        setPrice(0);
        setCalories(0);
        setCategory("");
        setImage("");
      } catch (e) {
        console.error("ERROR UPLOADING THE IMAGE", e);
        toast({
          title: "ERROR UPLOADING THE IMAGE!",
          description: e.message,
          duration: 3000,
        });
        return;
      } finally {
        setLoading(false);
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col  px-4 py-8 space-y-12 w-full bg-slate-100 rounded-lg shadow-md shadow-slate-100"
    >
      <div>
        <label
          className="block text-red-800 font-semibold text-xl"
          htmlFor="name"
        >
          الاسم
        </label>
        <input
          className="focus:shadow-outline block  text-red-900 appearance-none  border border-red-300 bg-red-50 px-4 py-2 text-right text-lg leading-tight shadow hover:border-red-500 focus:outline-none w-full rounded-md mt-4 focus:outline  outline-red-500 outline-1 outline-offset-2"
          type="text"
          id="name"
          placeholder="اسم الطبق"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div>
        <label
          className="block text-red-800 font-semibold text-xl"
          htmlFor="category"
        >
          :الصنف
        </label>
        <div className="relative mt-4 inline-block w-full text-gray-700">
          <select
            className="focus:shadow-outline block w-full text-red-900 appearance-none rounded border border-red-300 bg-red-50 px-4 py-2 text-right text-lg leading-tight shadow hover:border-red-500 focus:outline-none"
            value={category}
            id="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              اختر صنف
            </option>
            {categories.map((option) => (
              <option
                className="bg-red-50/50 text-lg text-red-950 text-right"
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-red-500 size-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <label
          htmlFor="price"
          className="block text-red-800 font-semibold text-xl"
        >
          :السعر
        </label>
        <input
          className="block mt-4 appearance-none w-full text-right text-lg px-4 py-2  rounded shadow leading-tight  focus:outline-none focus:shadow-outline focus:shadow-outline text-red-900 border border-red-300 bg-red-50  hover:border-red-500"
          type="number"
          name="price"
          placeholder="السعر"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="calories"
          className="block text-red-800 font-semibold text-xl"
        >
          :السعرات الحرارية
        </label>

        <input
          className=" mt-4 focus:shadow-outline block w-full text-red-900 appearance-none rounded border border-red-300 bg-red-50 px-4 py-2 text-right text-lg leading-tight shadow hover:border-red-500 focus:outline-none"
          type="number"
          name="calories"
          placeholder="عدد السعرات"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
      </div>
      <div class="flex w-full  ">
        <label class="w-full flex space-x-4 justify-center items-center px-4 py-2 bg-red-50 text-red-950 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white-red-800">
          <svg
            class="size-7"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span class=" text-base leading-normal">اختر صورة</span>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            max="6"
            accept=".jpg,.png,.jpeg"
            required
            class="hidden"
          />
        </label>
      </div>
      <button
        type="submit"
        className={`w-full px-4 py-2 text-xl font-bold text-red-50 bg-red-950 rounded-md shadow ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:text-red-100"
        }`}
        disabled={loading}
      >
        {loading ? "جار الرفع..." : "اضافة طبق"}
      </button>
    </form>
  );
}

export default CreateFoodItem;
