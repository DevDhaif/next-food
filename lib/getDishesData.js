import { collection, getDocs } from "@firebase/firestore";
import db from "./firestore";

// Helper function to check if an object is a plain object
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

// Recursive function to convert Firestore timestamps to plain objects
function deepConvert(obj) {
  if (!obj) return obj;

  if (typeof obj !== "object") {
    return obj; // Return if obj is not an object
  }

  if (obj.seconds !== undefined && obj.nanoseconds !== undefined) {
    // Check if obj is a Firestore timestamp
    return new Date(
      obj.seconds * 1000 + obj.nanoseconds / 1000000
    ).toISOString();
  }

  // Convert all properties recursively
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      obj[key] = deepConvert(obj[key]);
    }
  }

  return obj;
}

export async function getDishesData() {
  const mealsCollection = collection(db, "dishes");
  const mealsSnapshot = await getDocs(mealsCollection);

  const dishesData = mealsSnapshot.docs.map((doc) => {
    const data = doc.data() || {};

    return {
      id: doc.id,
      ...deepConvert(data),
    };
  });

  return dishesData;
}
