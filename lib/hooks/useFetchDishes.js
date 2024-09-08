import { useState, useEffect, useCallback } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import db from "@/lib/firestore";
import { PAGE_SIZE } from "@/lib/constants";

const useFetchDishes = (currentPage) => {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);

  const fetchDishes = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const dishesRef = collection(db, "dishes");
      let q;

      if (currentPage === 1) {
        q = query(dishesRef, orderBy("createdAt", "desc"), limit(PAGE_SIZE));
      } else if (lastVisible) {
        q = query(
          dishesRef,
          orderBy("createdAt", "desc"),
          startAfter(lastVisible),
          limit(PAGE_SIZE)
        );
      } else {
        // If it's not the first page and we don't have lastVisible, we can't fetch
        setIsLoading(false);
        return;
      }

      const querySnapshot = await getDocs(q);
      const fetchedDishes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDishes(fetchedDishes);

      if (querySnapshot.docs.length > 0) {
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      } else {
        setLastVisible(null);
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, lastVisible]);

  useEffect(() => {
    fetchDishes();
  }, [currentPage]);

  const updateDishes = useCallback((newDish) => {
    setDishes((currentDishes) => {
      const index = currentDishes.findIndex((dish) => dish.id === newDish.id);

      if (index !== -1) {
        const updatedDishes = [...currentDishes];
        updatedDishes[index] = newDish;
        return updatedDishes;
      } else {
        const updatedDishes = [newDish, ...currentDishes];
        if (updatedDishes.length > PAGE_SIZE) {
          updatedDishes.pop(); // Remove the last item if we've exceeded the page size
        }
        return updatedDishes;
      }
    });
  }, []);

  const deleteDish = useCallback(async (dishId) => {
    try {
      const dishRef = doc(db, "dishes", dishId);
      await deleteDoc(dishRef);

      setDishes((currentDishes) => {
        return currentDishes.filter((dish) => dish.id !== dishId);
      });

      // Remove this line
      // if (decrementCount) {
      //   decrementCount();
      // }
      return { success: true };
    } catch (err) {
      console.error("Error deleting dish:", err);
      setError(err);
    }
  }, []);

  return {
    dishes,
    isLoading,
    error,
    updateDishes,
    deleteDish,
    refetch: fetchDishes,
  };
};

export default useFetchDishes;
