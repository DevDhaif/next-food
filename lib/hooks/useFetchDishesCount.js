import { useState, useEffect } from "react";
import { doc, getDoc } from "@firebase/firestore";
import db from "../firestore";

const useFetchDishCount = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDishCount = async () => {
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
    };

    fetchDishCount();
  }, []);

  return { count, isLoading, error };
};
export default useFetchDishCount;
