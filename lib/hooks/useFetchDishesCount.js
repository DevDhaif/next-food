import { useState, useEffect, useCallback } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  increment as firebaseIncrement,
} from "@firebase/firestore";
import db from "../firestore";

const useFetchDishCount = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDishCount = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const docRef = doc(db, "metadata", "dishsCount");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCount(docSnap.data().count || 0);
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDishCount();
  }, [fetchDishCount]);

  const incrementCount = useCallback(async () => {
    try {
      console.log("INCREMENT COUNT GETS CALLED");
      const docRef = doc(db, "metadata", "dishsCount");
      await updateDoc(docRef, {
        count: firebaseIncrement(1),
      });
      setCount((prevCount) => prevCount + 1);
    } catch (err) {
      console.error("Error incrementing count:", err);
      setError(err);
    }
  }, []);

  const decrementCount = useCallback(async () => {
    try {
      const docRef = doc(db, "metadata", "dishsCount");
      await updateDoc(docRef, {
        count: firebaseIncrement(-1),
      });
      setCount((prevCount) => prevCount - 1);
    } catch (err) {
      console.error("Error decrementing count:", err);
      setError(err);
    }
  }, []);

  return { count, isLoading, error, incrementCount, decrementCount };
};

export default useFetchDishCount;
