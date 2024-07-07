"use client";
import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
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
      className="mt-12 text-center md:text-right relative md:mx-4 flex flex-col bg-gray-100  w-full md:w-auto border rounded-md border-red-500/20 justify-between"
    >
      <div className="flex flex-col md:flex-row md:justify-between  h-full">
        <img
          src={item.imgUrl}
          alt={item.name}
          className="border-b md:border-b-0  h-full min-h-40 max-h-40 md:h-auto md:max-h-max w-full object-contain"
        />
        <div className="relative  flex flex-col  h-full w-full text-right space-y-4 justify-around pr-8 py-8">
          <div className="flex flex-col  items-center absolute top-0 left-1/2 -translate-x-1/2 -mt-4   md:top-0  md:left-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`size-8 stroke-red-100  ${
                isLiked ? "fill-red-500" : "fill-red-300"
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
          <div className="text-slate-800 font-semibold text-xl">
            {item.name}
          </div>
          <div style={{ direction: "rtl" }} className="text-green-700 text-sm">
            {item.price} ريال
          </div>
          <div style={{ direction: "rtl" }} className="text-red-700 text-sm">
            {item.calories} سعرة حرارية
          </div>
        </div>
      </div>
      <div className="border-b py-4 border-1 border-red-600/10"></div>
      <Disclosure
        as="div"
        className="px-4 pt-2 pb-5 md:mt-4 text-center"
        defaultOpen={false}
      >
        <DisclosureButton className="group flex w-full items-center justify-between">
          <ChevronDownIcon className="size-5 fill-red-500/60 group-data-[hover]:fill-red-600/50 group-data-[open]:rotate-180" />
          <span className="text-sm/6 font-medium text-red-600 group-data-[hover]:text-red-500/80">
            المكونات
          </span>
        </DisclosureButton>
        <DisclosurePanel className="mt-2 text-sm/5 text-red-600/80">
          If you're unhappy with your purchase, we'll refund you in full.
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}

export default DishCard;
