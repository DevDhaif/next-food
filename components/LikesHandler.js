"use client";
import DishCard from "./DishCard";

function LikesHandler({
  dishesByCategory,
  likedDishes,
  isLikeButtonDisabled,
  incrementLikes,
  debouncedIncrementLikes,
}) {
  return (
    <div className="content w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {dishesByCategory.map((item) => (
        <DishCard
          key={item.id}
          item={item}
          likedDishes={likedDishes}
          isLikeButtonDisabled={isLikeButtonDisabled}
          incrementLikes={() => incrementLikes(item.id)}
          debouncedIncrementLikes={() => debouncedIncrementLikes(item.id)}
        />
      ))}
    </div>
  );
}

export default LikesHandler;
