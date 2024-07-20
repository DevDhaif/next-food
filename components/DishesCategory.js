"use client";
import { useState, useEffect } from "react";
import CategorySelector from "./CategorySelector";
import LikesHandler from "./LikesHandler";
import useLikes from "@/lib/hooks/useLikes";
import { Skeleton } from "@/components/ui/skeleton";

function DishesCategory({ categories, allDishes }) {
  const [dishesByCategory, setDishesByCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [loading, setLoading] = useState(true);

  const {
    likedDishes,
    isLikeButtonDisabled,
    incrementLikes,
    debouncedIncrementLikes,
    dishes,
  } = useLikes(allDishes);

  useEffect(() => {
    setLoading(true);
    handleCategoryChange(activeCategory);
    setLoading(false);
  }, [activeCategory, dishes]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    const filteredDishes = dishes.filter((dish) => dish.category === category);
    setDishesByCategory(filteredDishes);
  };

  return (
    <>
      <CategorySelector
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <div>
        <div
          key={activeCategory}
          value={activeCategory}
          className="grid grid-cols-1 mt-16 md:mt-24 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
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
            <div className="mx-4 p-6 pt-0 grid place-items-center">
              {loading ? (
                <div className="content w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  <div className="mt-12 text-center relative flex flex-col  w-full border rounded-md border-red-500/20 justify-between">
                    <div className=" flex flex-col h-full bg-gray-100 rounded-md">
                      <Skeleton className="bg-gray-400 border-b h-full min-h-64 max-h-64 w-full " />
                      <div className=" relative flex flex-col  h-full w-full text-right  justify-around  pt-8 ">
                        <Skeleton className="flex flex-col items-center absolute top-0 left-1/2 -translate-x-1/2 -mt-4 bg-gray-300 w-8 h-8 rounded-full" />
                        <Skeleton
                          style={{ direction: "rtl" }}
                          className="w-32 self-end  h-8 text-right bg-gray-200 "
                        />
                        <Skeleton
                          style={{ direction: "rtl" }}
                          className="w-28 self-end  h-4 text-right bg-gray-200 "
                        />
                        <Skeleton
                          style={{ direction: "rtl" }}
                          className="w-28 self-end  h-4 text-right bg-gray-200 "
                        />
                      </div>
                      <Skeleton className="h-36 mt-12 w-full bg-gray-200 " />
                    </div>
                  </div>
                </div>
              ) : (
                <LikesHandler
                  dishesByCategory={dishesByCategory}
                  likedDishes={likedDishes}
                  isLikeButtonDisabled={isLikeButtonDisabled}
                  incrementLikes={incrementLikes}
                  debouncedIncrementLikes={debouncedIncrementLikes}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DishesCategory;
