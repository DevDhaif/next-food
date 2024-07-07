"use client";
import { useEffect, useState, useCallback } from "react";
import categories from "../data/catgegories";

import {
  collection,
  doc,
  getDocs,
  increment,
  updateDoc,
} from "@firebase/firestore";
import db from "@/lib/firestore";
import { debounce } from "@/lib/utils";
import DishCard from "@/components/DishCard";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";

function Page() {
  const [dishesByCategory, setDishesByCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [dishes, setDishes] = useState([]);
  const [likedDishes, setLikedDishes] = useState([]);
  const [isLikeButtonDisabled, setIsLikeButtonDisabled] = useState(false);

  const fetchDishes = async () => {
    const dishesCol = collection(db, "dishes");
    const dishesSnapshot = await getDocs(dishesCol);
    const dishesList = dishesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDishes(dishesList);
    setDishesByCategory(dishesList.filter((i) => i.category == activeCategory));
    console.log(dishesByCategory);
  };

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likedDishes"));
    if (storedLikes) {
      setLikedDishes(storedLikes);
    }

    fetchDishes();
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    const filteredDishes = dishes.filter((dish) => dish.category === category);
    setDishesByCategory(filteredDishes);
  };
  const incrementLikes = async (dishId) => {
    if (isLikeButtonDisabled) return;
    setIsLikeButtonDisabled(true);
    const isLiked = likedDishes.includes(dishId);

    const dishRef = doc(db, "dishes", dishId);

    try {
      await updateDoc(dishRef, {
        likes: increment(isLiked ? -1 : 1),
      });
      let updatedLikedDishes = isLiked
        ? likedDishes.filter((id) => id !== dishId)
        : [...likedDishes, dishId];
      setLikedDishes(updatedLikedDishes);
      const updatedDishesByCategory = dishesByCategory.map((dish) => {
        if (dish.id === dishId) {
          return { ...dish, likes: dish.likes + (isLiked ? -1 : 1) };
        }
        return dish;
      });
      setDishesByCategory(updatedDishesByCategory);
      const updatedDishes = dishes.map((dish) => {
        if (dish.id === dishId) {
          return { ...dish, likes: dish.likes + (isLiked ? -1 : 1) };
        }
        return dish;
      });
      setDishes(updatedDishes);
      localStorage.setItem("likedDishes", JSON.stringify(updatedLikedDishes));
    } catch (error) {
      console.error("Error updating document: ", error);
    } finally {
      setIsLikeButtonDisabled(false);
    }
  };
  const debouncedIncrementLikes = debounce(incrementLikes, 500);

  return (
    <div className="w-full overflow-x-scroll relative">
      <div
        className={`inline-flex py-3  md:rounded-md  border-b bg-slate-100 text-slate-800 border-white/20 z-50 px-2  dark:bg-slate-800 dark:text-slate-400 fixed mx-auto container  lg:justify-center  w-full max-w-7xl -translate-x-1/2 left-1/2 overflow-x-auto whitespace-nowrap items-center `}
      >
        {categories.map((category) => (
          <button
            onClick={() => handleCategoryChange(category)} // Pass the category to the handler
            className={`inline-flex flex-col items-center justify-center whitespace-nowrap mx-4  text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50 rounded-md  h-full 
             ${
               activeCategory === category
                 ? " text-red-600 text-[19px] font-extrabold"
                 : ""
             }
            `}
            key={category}
            value={category}
          >
            <div className="mx-4 relative w-16 h-16 ">
              <img
                className={`w-full h-full rounded-full ${
                  activeCategory === category
                    ? " outline outline-1 outline-red-500 outline-offset-2"
                    : ""
                }`}
                src="images/baklawa.webp"
                alt=""
              />
            </div>
            <span className="mt-2">{category}</span>
          </button>
        ))}
      </div>
      <div>
        <div
          key={activeCategory}
          value={activeCategory}
          className="grid grid-cols-1 mt-16 md:mt-24 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2  dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 "
        >
          <div className="bg-transparent border-none mt-12 rounded-lg border border-slate-200 text-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50">
            <div className="flex flex-col py-6 px-4 md:px-12">
              <div className="text-2xl font-semibold leading-none tracking-tight">
                {activeCategory}
              </div>
              <div className="text-sm text-slate-400 dark:text-slate-400 mt-2">
                استعرض اطباقنا من قائمة ال{activeCategory.toLowerCase()}
              </div>
            </div>
            <div className="mx-4 p-6 pt-0">
              <div className="content grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 ">
                {dishesByCategory.map((item) => (
                  <DishCard
                    key={item.id}
                    {...{ item, likedDishes, isLikeButtonDisabled }}
                    incrementLikes={() => incrementLikes(item.id)}
                    debouncedIncrementLikes={() =>
                      debouncedIncrementLikes(item.id)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Page;
