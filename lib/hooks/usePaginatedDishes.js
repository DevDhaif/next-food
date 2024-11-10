import { useState, useEffect, useCallback } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";
import db from "../firestore"; // Firestore initialization
import { PAGE_SIZE } from "../constants"; // e.g., PAGE_SIZE = 10

const usePaginatedDishes = (searchQuery) => {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Function to calculate total pages
  const getTotalPages = useCallback(async () => {
    try {
      const dishesRef = collection(db, "dishes");
      const countSnapshot = await getCountFromServer(dishesRef);
      const totalDishes = countSnapshot.data().count;
      setTotalPages(Math.ceil(totalDishes / PAGE_SIZE));
    } catch (error) {
      console.error("Error fetching total pages:", error);
    }
  }, []);

  // Fetch dishes for a specific page
  const fetchDishes = useCallback(
    async (page, searchQuery, reset = false) => {
      setIsLoading(true);

      try {
        const dishesRef = collection(db, "dishes");
        let q = query(
          dishesRef,
          orderBy("createdAt", "desc"),
          limit(PAGE_SIZE)
        );

        // Only apply pagination if it's not the first page or we aren't resetting the pagination
        if (page > 1 && lastVisible && !reset) {
          q = query(
            dishesRef,
            orderBy("createdAt", "desc"),
            startAfter(lastVisible),
            limit(PAGE_SIZE)
          );
        }

        const snapshot = await getDocs(q);
        const fetchedDishes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (reset) {
          setDishes(fetchedDishes); // Replace dishes when resetting
        } else {
          setDishes((prevDishes) => [...prevDishes, ...fetchedDishes]); // Add more dishes when paginating
        }

        setLastVisible(snapshot.docs[snapshot.docs.length - 1]); // Track last visible doc for pagination
      } catch (error) {
        console.error("Error fetching paginated dishes:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [lastVisible]
  );

  // Reset pagination and fetch dishes on query or page change
  useEffect(() => {
    setLastVisible(null); // Reset pagination when search query changes
    fetchDishes(currentPage, searchQuery, true); // Reset dishes and start over
  }, [currentPage, searchQuery]);

  // Fetch total pages on mount
  useEffect(() => {
    getTotalPages();
  }, [getTotalPages]);

  // Add dish and handle pagination
  const addDish = (newDish) => {
    setDishes((prevDishes) => {
      const updatedDishes = [newDish, ...prevDishes];
      if (updatedDishes.length > PAGE_SIZE) {
        return updatedDishes.slice(0, PAGE_SIZE); // Keep only PAGE_SIZE on the current page
      }
      return updatedDishes;
    });
    getTotalPages(); // Recalculate total pages after adding a dish
  };

  // Update dish in the state
  const updateDishInState = (updatedDish) => {
    setDishes((prevDishes) =>
      prevDishes.map((dish) =>
        dish.id === updatedDish.id ? updatedDish : dish
      )
    );
  };

  // Remove dish and handle pagination
  const removeDishInState = (dishId) => {
    setDishes((prevDishes) => {
      const updatedDishes = prevDishes.filter((dish) => dish.id !== dishId);
      if (updatedDishes.length < PAGE_SIZE) {
        fetchDishes(currentPage + 1, searchQuery); // Fetch more dishes from the next page
      }
      return updatedDishes;
    });
    getTotalPages(); // Recalculate total pages after removing a dish
  };

  // Handlers for pagination navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      setLastVisible(null); // Reset lastVisible to fetch the next page properly
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    setLastVisible(null); // Reset lastVisible for previous page
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    setLastVisible(null); // Reset lastVisible to fetch the selected page
  };

  return {
    dishes,
    isLoading,
    handleNextPage,
    handlePrevPage,
    handlePageClick,
    currentPage,
    totalPages,
    addDish,
    updateDishInState,
    removeDishInState,
  };
};

export default usePaginatedDishes;
