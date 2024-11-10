"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import categories from "@/app/data/catgegories";
import { useToast } from "../ui/use-toast";
import FormField from "./FormField";
import { updateDish } from "@/app/actions/dishActions";

export function EditDishForm({ item, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    calories: item.calories,
    category: item.category,
    description: item.description,
    imgUrl: item.imgUrl,
    name: item.name,
    price: item.price,
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
        formDataWithFile.append(key, value);
      });
      if (image) {
        formDataWithFile.append("image", image);
      }
      formDataWithFile.append("id", item.id);

      const result = await updateDish(formDataWithFile);

      if (result.success) {
        toast({
          title: "Success!",
          description: "Dish updated successfully.",
          duration: 3000,
        });
        onSuccess({
          id: item.id,
          ...formData,
          imgUrl: result.imgUrl || formData.imgUrl, // Use updated image if available
        });
        onClose();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("ERROR UPDATING THE DISH", error);
      toast({
        title: "ERROR UPDATING THE DISH!",
        description: error.message,
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <FormField
          id="name"
          label="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <FormField
          id="calories"
          label="Calories"
          value={formData.calories}
          onChange={handleInputChange}
        />
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">
            Category
          </Label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="col-span-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <FormField
          id="description"
          label="Description"
          value={formData.description}
          onChange={handleInputChange}
        />

        <FormField
          id="price"
          label="Price"
          value={formData.price}
          onChange={handleInputChange}
        />
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="image" className="text-right">
            Image
          </Label>
          <label
            className="col-span-3 flex space-x-4 justify-center items-center px-4 py-2 bg-red-50 text-red-950 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white-red-800"
            htmlFor="image"
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
              className="hidden"
            />
          </label>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit"> {loading ? "..." : "Save changes"}</Button>
      </div>
    </form>
  );
}
