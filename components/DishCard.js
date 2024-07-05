"use client";
import { useEffect, useState } from "react";

function DishCard({
  isLikeButtonDisabled,
  item,
  debouncedIncrementLikes,
  likedDishes,
}) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likedDishes.includes(item.id));
  }, [likedDishes, item.id]);

  return (
    <div
      key={item.id}
      className="mt-12 text-center md:text-right relative md:mx-4 flex flex-col bg-gray-100 md:flex-row w-full md:w-auto border rounded-md border-red-500/20 justify-between"
    >
      <div className="flex flex-col items-center absolute -translate-x-1/2 left-1/2 top-1/2 -mt-5 md:-translate-x-1/2 md:-mt-4 md:top-0 md:left-1/2 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-8 stroke-red-100  ${
            isLiked ? "fill-red-500  animate-pulse" : "fill-red-300"
          } cursor-pointer disabled:pointer-events-none`}
          onClick={debouncedIncrementLikes}
          disabled={isLikeButtonDisabled}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
        <p className="mt- text-red-600 ">{item.likes}</p>
      </div>
      <img
        src={item.imgUrl}
        alt={item.name}
        className="w-full border-b md:border-b-0  h-full min-h-40 max-h-40 md:h-auto md:max-h-max md:w-40 object-contain"
      />
      <div className="flex flex-col space-y-4 justify-around p-8">
        <div className="text-slate-800 font-semibold text-xl">{item.name}</div>
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
  );
}

export default DishCard;
