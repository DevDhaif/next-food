import categories from "@/app/data/catgegories";
import DishesCategory from "@/components/DishesCategory";
import db from "@/lib/firestore";
import { collection, getDocs } from "@firebase/firestore";

function convertTimestampToPlainObject(data) {
  if (!data) return data;

  if (
    typeof data === "object" &&
    data.seconds !== undefined &&
    data.nanoseconds !== undefined
  ) {
    return new Date(
      data.seconds * 1000 + data.nanoseconds / 1000000
    ).toISOString();
  }

  if (typeof data === "object") {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        data[key] = convertTimestampToPlainObject(data[key]);
      }
    }
  }

  return data;
}

async function page() {
  try {
    const mealsCollection = collection(db, "dishes");
    const mealsSnapshot = await getDocs(mealsCollection);

    const mealsData = mealsSnapshot.docs.map((doc) => {
      const data = doc.data();
      const plainData = convertTimestampToPlainObject(data);

      return {
        id: doc.id,
        ...plainData,
      };
    });

    return (
      <div className="w-full overflow-x-scroll relative">
        <DishesCategory categories={categories} allDishes={mealsData} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching meals:", error);
    return <div>Error loading meals. Please try again later.</div>;
  }
}

export default page;
