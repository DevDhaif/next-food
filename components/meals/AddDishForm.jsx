"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useToast } from "@/components/ui/use-toast";
import { addDish } from "@/app/actions/dishActions";
import categories from "@/app/data/catgegories";

export function AddDishForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    calories: "",
    category: categories[0],
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "price" || name === "calories") {
      if (!/^\d*\.?\d*$/.test(value)) {
        return;
      }
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataWithFile = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "price" || key === "calories") {
          formDataWithFile.append(key, parseInt(value));
        } else {
          formDataWithFile.append(key, value);
        }
      });
      if (image) {
        formDataWithFile.append("image", image);
      }

      const result = await addDish(formDataWithFile);

      if (result.success) {
        toast({
          title: "!شكرًا",
          description: "تمت إضافة الطبق بنجاح",
          duration: 3000,
        });

        // Call onSuccess with the new dish data
        onSuccess({
          id: result.id,
          ...formData,
          imgUrl: result.imgUrl,
          createdAt: formData.createdAt || new Date(), // Assuming the server returns the image URL
        });

        onClose();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("ERROR ADDING THE DISH", error);
      toast({
        title: "!حدث خطأ",
        description: error.message,
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-6 w-full bg-slate-100 rounded-lg shadow-md shadow-slate-100 p-6"
    >
      <div>
        <Label
          htmlFor="name"
          className="block text-red-800 font-semibold text-xl"
        >
          الاسم
        </Label>
        <input
          className="focus:shadow-outline block w-full text-red-900 appearance-none border border-red-300 bg-red-50 px-4 py-2 text-right text-lg leading-tight shadow hover:border-red-500 focus:outline-none rounded-md mt-2 focus:outline outline-red-500 outline-1 outline-offset-2"
          type="text"
          id="name"
          name="name"
          placeholder="اسم الطبق"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <Label
          htmlFor="description"
          className="block text-red-800 font-semibold text-xl"
        >
          الوصف
        </Label>
        <textarea
          className="focus:shadow-outline block w-full text-red-900 appearance-none border border-red-300 bg-red-50 px-4 py-2 text-right text-lg leading-tight shadow hover:border-red-500 focus:outline-none rounded-md mt-2 focus:outline outline-red-500 outline-1 outline-offset-2"
          id="description"
          name="description"
          placeholder="وصف الطبق"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <Label
          htmlFor="category"
          className="block text-red-800 font-semibold text-xl"
        >
          الصنف
        </Label>
        <div className="relative mt-2 inline-block w-full text-gray-700">
          <select
            className="focus:shadow-outline block w-full text-red-900 appearance-none rounded border border-red-300 bg-red-50 px-4 py-2 text-right text-lg leading-tight shadow hover:border-red-500 focus:outline-none"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            {categories.map((option) => (
              <option
                key={option}
                value={option}
                className="bg-red-50/50 text-lg text-red-950 text-right"
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

      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex-1">
          <Label
            htmlFor="price"
            className="block text-red-800 font-semibold text-xl"
          >
            السعر
          </Label>
          <input
            className="focus:shadow-outline block w-full text-red-900 appearance-none rounded border border-red-300 bg-red-50 px-4 py-2 text-right text-lg leading-tight shadow hover:border-red-500 focus:outline-none mt-2"
            type="number"
            id="price"
            name="price"
            placeholder="السعر"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex-1">
          <Label
            htmlFor="calories"
            className="block text-red-800 font-semibold text-xl"
          >
            السعرات الحرارية
          </Label>
          <input
            className="focus:shadow-outline block w-full text-red-900 appearance-none rounded border border-red-300 bg-red-50 px-4 py-2 text-right text-lg leading-tight shadow hover:border-red-500 focus:outline-none mt-2"
            type="number"
            id="calories"
            name="calories"
            placeholder="عدد السعرات"
            value={formData.calories}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex-1">
          <label
            htmlFor="image"
            className="w-full focus-within:border-red-400 flex space-x-4 justify-center items-center px-4 py-2 bg-red-50 text-red-950 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white-red-800"
          >
            <svg
              className="size-7"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="text-base leading-normal">اختر صورة</span>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept=".jpg,.png,.jpeg,.webp"
              className="absolute w-0 h-0 m-0 p-0 overflow-hidden border-0 focus:outline-none"
              tabIndex="0"
              style={{ clip: "rect(0, 0, 0, 0)" }}
            />
          </label>
        </div>
        <Button
          type="submit"
          className={`flex-1 px-4 py-2 text-xl font-bold text-red-50 bg-red-950 rounded-md shadow ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:text-red-100"
          }`}
          disabled={loading}
        >
          {loading ? "جار الإضافة..." : "إضافة طبق"}
        </Button>
      </div>
    </form>
  );
}
