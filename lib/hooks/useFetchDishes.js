import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from "@firebase/firestore";
import db from "@/lib/firestore";
import { PAGE_SIZE } from "@/lib/constants";

const useFetchDishes = (currentPage) => {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);

  useEffect(() => {
    const fetchDishes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const dishesRef = collection(db, "dishes");
        let q;

        if (currentPage === 1) {
          q = query(dishesRef, orderBy("name"), limit(PAGE_SIZE));
        } else if (lastVisible) {
          q = query(
            dishesRef,
            orderBy("name"),
            startAfter(lastVisible),
            limit(PAGE_SIZE)
          );
        }

        const querySnapshot = await getDocs(q);
        const fetchedDishes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDishes(fetchedDishes);

        if (querySnapshot.docs.length > 0) {
          setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDishes();
  }, [currentPage]);

  return { dishes, isLoading, error };
};

export default useFetchDishes;
