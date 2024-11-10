import { collection, onSnapshot } from "firebase/firestore";
import db from "../firestore";
import { useState, useEffect } from "react";

const useRealtimeDishCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const dishesRef = collection(db, "dishes");

    // Real-time listener for counting documents in the 'dishes' collection
    const unsubscribe = onSnapshot(dishesRef, (snapshot) => {
      setCount(snapshot.size); // Update count whenever documents are added/removed
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return count;
};

export default useRealtimeDishCount;
