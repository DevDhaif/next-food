import React from "react";
import moment from "moment";
import { useLocalStorageArray } from "./useLocalStorageArray"; // Adjust the path as necessary
import ReviewRating from "./ReviewRating";

const ReviewItem = ({ review, onToggleHelpful }) => {
  const [getMarkedHelpful, setMarkedHelpful] =
    useLocalStorageArray("markedHelpful");
  const [getUnmarkedHelpful, setUnmarkedHelpful] =
    useLocalStorageArray("unmarkedHelpful");

  const isMarkedHelpful = getMarkedHelpful().includes(review.id);
  const isUnmarkedHelpful = getUnmarkedHelpful().includes(review.id);

  const getReviewClass = () => {
    if (isMarkedHelpful) return "bg-red-500";
    if (isUnmarkedHelpful) return "border";
    return "";
  };

  return (
    <article className="text-white border-b border-white/10 px-4 py-8">
      <div dir="rtl" className="flex space-x-12 items-center">
        <div className="inline-block w-10 h-10 rounded-full bg-[#ccc] text-center leading-10 text-white text-xl">
          {review.name ? review.name[0] : "A"}
        </div>
        <div className="pr-4">
          <h4>{review.name || "ANON"}</h4>
          <p>{moment.unix(review.date?.seconds).format("D/M/YYYY")}</p>
        </div>
      </div>

      <ReviewRating rating={review.rating} />
      <p className="mt-2 text-lg text-gray-300">{review.review}</p>
      <button
        onClick={() => onToggleHelpful(review.id)}
        className={`text-white border border-white/20 py-2 mt-2 px-4 rounded ${getReviewClass()}`}
      >
        مفيد ({review.helpful})
      </button>
    </article>
  );
};

export default ReviewItem;
