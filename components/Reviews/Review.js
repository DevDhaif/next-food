"use client";
import { useState } from "react";
import db from "@/lib/firestore";
import { collection, addDoc, runTransaction, doc } from "@firebase/firestore";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

function Review() {
  const [rating, setRating] = useState(1);
  const [name, setName] = useState("Anon");
  const [review, setReview] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date();
      const docRef = await addDoc(collection(db, "reviews"), {
        name: name,
        review: review,
        rating: rating,
        date: currentDate,
      });

      const countRef = doc(db, "metadata", "reviewsCount");
      await runTransaction(db, async (transaction) => {
        const countDoc = await transaction.get(countRef);
        const newCount = countDoc.exists() ? countDoc.data().count + 1 : 1;
        transaction.set(countRef, { count: newCount });
      });
      toast({
        title: "!شكرًا على تقييمك",
        description: "نشوفك قريب ان شاء الله",
        duration: 3000,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <section className="flex flex-col-reverse md:flex-row w-full mx-auto overflow-hidden border border-white/20 text-white rounded-lg shadow-lg">
      <div className="w-full md:w-1/2  p-5">
        <Toaster className="text-right" rtl={true} />
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4 text-right">
            <label htmlFor="name" className="block mb-2 text-sm font-medium  ">
              الاسم
            </label>
            <input
              type="text"
              id="name"
              className="text-gray-800 py-3 px-4 block w-full  border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 text-right"
              placeholder="أدخل اسمك"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="mb-4 text-right">
            <label
              htmlFor="review"
              className="block mb-2 text-sm font-medium  "
            >
              المراجعة
            </label>
            <textarea
              id="review"
              className="text-gray-800 py-3 px-4 block w-full  border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 text-right"
              placeholder="تقييمك"
              onChange={(e) => setReview(e.target.value)}
              value={review}
            ></textarea>
          </div>
          <div className="mb-4 text-right">
            <label className="block mb-2 text-sm font-medium  ">التقييم</label>
            <div className="flex justify-end">
              {[...Array(5)].map((_, index) => {
                const starValue = 5 - index;
                return (
                  <label key={index} className="cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      value={starValue}
                      className="sr-only"
                      onChange={() => setRating(starValue)}
                      required
                    />
                    <span
                      aria-label={`star ${
                        starValue <= rating ? "filled" : "empty"
                      }`}
                      className={`text-4xl ${
                        starValue <= rating
                          ? "text-yellow-600"
                          : "text-gray-400"
                      } fill-current hover:text-yellow-600`}
                    >
                      &#9733;
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
          <button
            type="submit"
            className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            إرسال
          </button>
        </form>
      </div>
      <div
        className="relative w-full md:w-1/2 bg-cover bg-center text-white text-right  "
        style={{ backgroundImage: "url('images/baklawa.webp')" }}
      >
        <div className="w-full py-24 px-10 h-full backdrop-blur-sm bg-black/60">
          <h2 className="text-3xl font-bold mb-2">!رأيك مهم</h2>
          <p className="mb-4 text-xl font-semibold">سعيدين بمعرفة رأيك وتحسين الخدمة</p>
        </div>
      </div>
    </section>
  );
}

export default Review;
