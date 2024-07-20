"use client";
import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import LikeDish from "./LikeDish";
function DishCard({
  isLikeButtonDisabled = false,
  item,
  debouncedIncrementLikes,
  likedDishes = [],
}) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likedDishes.includes(item.id));
  }, [likedDishes, item.id]);

  return (
    <div
      key={item.id}
      className="mt-12 text-center relative flex flex-col bg-gray-100 w-full border rounded-md border-red-500/20 justify-between"
    >
      <div className="flex flex-col h-full">
        <img
          src={item.imgUrl}
          alt={item.name}
          className="border-b h-full min-h-64 max-h-64 w-full "
          style={
            ({ backgroundSize: "cover" }, { backgroundPosition: "center" })
          }
        />
        <div className="relative flex flex-col h-full w-full text-right space-y-4 justify-around pr-8 py-8">
          <LikeDish
            isLiked={isLiked}
            item={item}
            isLikeButtonDisabled={isLikeButtonDisabled}
            debouncedIncrementLikes={() => debouncedIncrementLikes()}
          />
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
        <DisclosurePanel className="mt-2 text-sm/5 text-right text-red-600/80">
          {item.description}
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}

export default DishCard;
