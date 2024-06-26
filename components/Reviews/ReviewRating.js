import React from "react";

const ReviewRating = ({ rating }) => (
  <div className="text-2xl text-yellow-600">
    {[...Array(5)].map((star, i) => (
      <span
        aria-label={`star ${i < rating ? "filled" : "empty"}`}
        key={i}
        className={i < rating ? "text-yellow-600" : "text-gray-200"}
      >
        &#9733;
      </span>
    ))}
  </div>
);
export default ReviewRating;
