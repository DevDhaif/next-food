import { useState, useEffect } from "react";
import { doc, getDoc, increment, updateDoc } from "@firebase/firestore";
import db from "../firestore";
import { debounce } from "@/lib/utils";

const useLikes = (initialDishes) => {
  const [likedDishes, setLikedDishes] = useState([]);
  const [isLikeButtonDisabled, setIsLikeButtonDisabled] = useState(false);
  const [dishes, setDishes] = useState(initialDishes);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likedDishes"));
    if (storedLikes) {
      setLikedDishes(storedLikes);
    }
  }, []);

  const incrementLikes = async (dishId) => {
    if (isLikeButtonDisabled) return;
    setIsLikeButtonDisabled(true);
    const isLiked = likedDishes.includes(dishId);
    const dishRef = doc(db, "dishes", dishId);
    try {
      const dishSnap = await getDoc(dishRef);
      const dishData = dishSnap.data();
      if (dishData && dishData.hasOwnProperty("likes")) {
        await updateDoc(dishRef, {
          likes: increment(isLiked ? -1 : 1),
        });
        let updatedLikedDishes = isLiked
          ? likedDishes.filter((id) => id !== dishId)
          : [...likedDishes, dishId];
        setLikedDishes(updatedLikedDishes);
        const updatedDishes = dishes.map((dish) => {
          if (dish.id === dishId) {
            return { ...dish, likes: dish.likes + (isLiked ? -1 : 1) };
          }
          return dish;
        });
        setDishes(updatedDishes);
        localStorage.setItem("likedDishes", JSON.stringify(updatedLikedDishes));
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    } finally {
      setIsLikeButtonDisabled(false);
    }
  };

  const debouncedIncrementLikes = debounce(incrementLikes, 500);

  return {
    likedDishes,
    isLikeButtonDisabled,
    incrementLikes,
    debouncedIncrementLikes,
    dishes,
  };
};

export default useLikes;
