"use client";
import { useEffect, useRef, useState } from "react";
import foodData from "../data/data";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TabPannel,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CategorySelector from "@/components/CategorySelector";

// const categories = ["ماء", "لحوم", "طلبات", "كشري", "سندويشات", "HHHH"];
function renderContent(dishesByCategory, activeCategory) {
  const dishes = dishesByCategory[activeCategory];

  if (!dishes || dishes.length === 0) {
    return <div>No dishes available for this category.</div>;
  }

  return (
    <>
      <div className="flex flex-col  mt-24 px-4">
        <div className="text-2xl font-semibold leading-none tracking-tight">
          {activeCategory}
        </div>

        <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          استعرض اطباقنا من قائمة ال{activeCategory.toLowerCase()} .
        </div>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-3 mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300">
        {dishes.map((item) => (
          <div
            key={item.id}
            className="mt-12 text-center md:text-right relative md:mx-4 flex flex-col bg-gray-100 md:flex-row w-full md:w-auto border rounded-md border-red-500/20 justify-between"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full md:w-40 object-fill"
            />
            <div className="flex flex-col space-y-4 justify-around p-8">
              <div className="font-semibold text-xl">{item.name}</div>
              <div
                style={{ direction: "rtl" }}
                className="text-green-700 font-semibold"
              >
                {item.price} ريال
              </div>
              <div
                style={{ direction: "rtl" }}
                className="text-red-700 font-semibold"
              >
                {item.calories} سعرة حرارية
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
function Page() {
  const [dishesByCategory, setDishesByCategory] = useState({});
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    const categoryDishes = foodData.reduce((acc, item) => {
      const { category, dishes } = item;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category] = acc[category].concat(dishes);
      return acc;
    }, {});

    setDishesByCategory(categoryDishes);
    setActiveCategory(Object.keys(categoryDishes)[0]); // Set the first category as active
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="w-full overflow-x-scroll container  relative px-4">
      <div
        className={`inline-flex h-12 rounded-md border-b bg-slate-100 text-slate-800 border-white/20 z-50 p-1  dark:bg-slate-800 dark:text-slate-400 fixed mx-auto container -mt-4 lg:justify-center  w-full -translate-x-1/2 left-1/2 overflow-x-auto whitespace-nowrap  items-center `}
      >
        {Object.keys(dishesByCategory).map((category) => (
          <button
            onClick={() => handleCategoryChange(category)} // Pass the category to the handler
            className={`inline-flex items-center justify-center whitespace-nowrap mx-4  text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50 rounded-md  h-10 px-4 py-2
             ${
               activeCategory === category
                 ? " text-red-600 text-[17px] font-extrabold"
                 : ""
             }
            `}
            key={category}
            value={category}
          >
            {category}
          </button>
        ))}
      </div>
      <div
        key={activeCategory}
        value={activeCategory}
        className="grid grid-cols-1 mt-8 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 "
      >
        <div className="bg-transparent border-none mt-4 rounded-lg border border-slate-200 text-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50">
          <div className="flex flex-col p-6">
            <div className="text-2xl font-semibold leading-none tracking-tight">
              {activeCategory}
            </div>
            <div className="text-sm text-slate-400 dark:text-slate-400 mt-2">
              استعرض اطباقنا من قائمة ال{activeCategory.toLowerCase()}
            </div>
          </div>
          <div className="mx-4 p-6 pt-0">
            <div className="content grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 ">
              {dishesByCategory[activeCategory]?.map((item) => (
                <div
                  key={item.id}
                  className="mt-12 text-center md:text-right relative md:mx-4 flex flex-col bg-gray-100 md:flex-row w-full md:w-auto border rounded-md border-red-500/20 justify-between"
                >
                  <div className="absolute w-12 h-12 bg-red-600 rounded-full md:-translate-x-1/2 md:-mt-6 md:left-1/2 "></div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full md:w-40 object-cover"
                  />
                  <div className="flex flex-col space-y-4 justify-around p-8">
                    <div className="text-slate-800 font-semibold text-xl">
                      {item.name}
                    </div>
                    <div
                      style={{ direction: "rtl" }}
                      className="text-green-700 font-semibold"
                    >
                      {item.price} ريال
                    </div>
                    <div
                      style={{ direction: "rtl" }}
                      className="text-red-700 font-semibold"
                    >
                      {item.calories} سعرة حرارية
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
//   inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500 dark:bg-slate-800 dark:text-slate-400 fixed mx-auto   w-full max-w-lg -translate-x-1/2 left-1/2 overflow-x-auto whitespace-nowrap

//   (
// <div
//   id="parent"
//   ref={parentRef}
//   className="relative bg-green-50 container mx-auto mt-24"
// >
//   <div
//     id="tabnavigation"
//     ref={tabNavigationRef}
//     className="fixed bottom-0 mt-24 flex space-x-6 overflow-x-scroll h-24 bg-indigo-300"
//   >
//     <p className="w-96 bg-rose-200">item1</p>
//     <p className="w-96 bg-rose-200">item2</p>
//     <p className="w-96 bg-rose-200">item3</p>
//     <p className="w-96 bg-rose-200">item4</p>
//     <p className="w-96 bg-rose-200">item5</p>
//     <p className="w-96 bg-rose-200">item6</p>
//     <p className="w-96 bg-rose-200">item7</p>
//   </div>
//   <div className="bg-blue-400 space-y-12 mb-28">
//     <div className="h-96 bg-black"></div>
//     <div className="h-96 bg-black"></div>
//     <div className="h-96 bg-black"></div>
//   </div>
//       <div>

//       <div className="sticky top-0 z-50 w-full">
//         <CategorySelector
//           categories={categories}
//           activeCategory={activeCategory}
//           onCategoryChange={handleCategoryChange}
//         />
//       </div>
//       {renderContent(dishesByCategory, activeCategory)}
//       </div>

//   );
// }

export default Page;
