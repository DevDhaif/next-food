"use client";
import { useState } from "react";
import db from "@/lib/firestore";
import { collection, addDoc } from "@firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "@/components/ui/toaster";

function Review() {
  const [rating, setRating] = useState(1);
  const [name, setName] = useState("Anon");
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "reviews"), {
        name: name,
        review: review,
        rating: rating,
      });
      console.log("Document written with ID: ", docRef.id);
      toast("Thank you!", { autoClose: 3000 });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <section className="flex flex-col-reverse md:flex-row w-full mx-auto overflow-hidden border border-white/20 text-white rounded-lg shadow-lg">
      <div className="w-full md:w-1/2  p-5">
        <ToastContainer style={{ zIndex: "1000" }} />
        <Toaster />
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
                    <svg
                      className={`h-8 w-8 ${
                        starValue <= rating ? "text-red-600" : "text-gray-400"
                      } fill-current hover:text-red-600`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.431 8.332 1.209-6.001 5.852 1.416 8.265L12 18.896l-7.415 3.898 1.416-8.265-6.001-5.852 8.332-1.209L12 .587z" />
                    </svg>
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
        <div className="w-full py-24 px-10 h-full backdrop-blur-sm bg-black/40">
          <h2 className="text-3xl  font-bold mb-2">!رأيك مهم</h2>
          <p className="mb-4">سعيدين بمعرفة رأيك وتحسين الخدمة</p>
        </div>
      </div>
    </section>
  );
}

export default Review;
