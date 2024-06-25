"use client";
import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  increment,
  getDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import db from "@/lib/firestore";
import moment from "moment";

// Utility functions for local storage handling
const useLocalStorageArray = (key) => {
  const getArray = () => JSON.parse(localStorage.getItem(key) || "[]");
  const setArray = (array) => localStorage.setItem(key, JSON.stringify(array));

  return [getArray, setArray];
};

const ReviewItem = ({ review, onToggleHelpful }) => {
  const [getMarkedHelpful, setMarkedHelpful] =
    useLocalStorageArray("markedHelpful");
  const [getUnmarkedHelpful, setUnmarkedHelpful] =
    useLocalStorageArray("unmarkedHelpful");

  const isMarkedHelpful = getMarkedHelpful().includes(review.id);
  const isUnmarkedHelpful = getUnmarkedHelpful().includes(review.id);
  const reviewClass = isMarkedHelpful
    ? "bg-red-500 "
    : isUnmarkedHelpful
    ? "border"
    : "";

  return (
    <article
      key={review.id}
      className="text-white border-b border-white/10 px-4 py-8"
    >
      <div dir="rtl" className="flex space-x-12 items-center">
        <div className="inline-block w-10 h-10 rounded-full bg-[#ccc] text-center leading-10 text-white text-xl">
          {review.name ? review.name[0] : "A"}
        </div>
        <div className="pr-4">
          <h4>{review.name || "ANON"}</h4>
          <p>{moment.unix(review.date?.seconds).format("D/M/YYYY")}</p>
        </div>
      </div>

      <div className="text-2xl text-yellow-600">
        {[...Array(5)].map((star, i) => (
          <span
            aria-label="stars rating"
            key={i}
            className={i < review.rating ? "text-yellow-600" : "text-gray-200"}
          >
            &#9733;
          </span>
        ))}
      </div>
      <button
        onClick={() => onToggleHelpful(review.id)}
        className={`text-white font-bold py-2 px-4 rounded ${reviewClass}`}
      >
        مفيد ({review.helpful})
      </button>
      <p className="mt-2 text-lg text-gray-300">{review.review}</p>
    </article>
  );
};

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const reviewsCollectionRef = query(
          collection(db, "reviews"),
          orderBy("date"),
          limit(1)
        );
        const reviewsSnapshot = await getDocs(reviewsCollectionRef);
        const reviewsList = reviewsSnapshot.docs.map((doc) => ({
          id: doc.id,
          helpful: doc.data().helpful || 0,
          ...doc.data(),
        }));
        setReviews(reviewsList);
      } catch (err) {
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const toggleHelpful = async (reviewId) => {
    const [getMarkedHelpful, setMarkedHelpful] =
      useLocalStorageArray("markedHelpful");
    const [getUnmarkedHelpful, setUnmarkedHelpful] =
      useLocalStorageArray("unmarkedHelpful");

    let isHelpfulUpdated = false;
    let incrementValue = 0;

    if (getMarkedHelpful().includes(reviewId)) {
      setMarkedHelpful(getMarkedHelpful().filter((id) => id !== reviewId));
      setUnmarkedHelpful([...getUnmarkedHelpful(), reviewId]);
      incrementValue = -1;
    } else {
      setMarkedHelpful([...getMarkedHelpful(), reviewId]);
      setUnmarkedHelpful(getUnmarkedHelpful().filter((id) => id !== reviewId));
      incrementValue = 1;
    }

    try {
      const reviewRef = doc(db, "reviews", reviewId);
      await updateDoc(reviewRef, { helpful: increment(incrementValue) });
      isHelpfulUpdated = true;
    } catch (error) {
      console.error("Error updating document: ", error);
    }

    if (isHelpfulUpdated) {
      try {
        const reviewRef = doc(db, "reviews", reviewId);
        const reviewSnap = await getDoc(reviewRef);
        if (reviewSnap.exists()) {
          const updatedReview = reviewSnap.data();
          setReviews((currentReviews) =>
            currentReviews.map((review) =>
              review.id === reviewId
                ? { ...review, helpful: updatedReview.helpful }
                : review
            )
          );
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching updated review: ", error);
      }
    }
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="p-4 space-y-2 mt-4 border rounded border-white/20">
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          onToggleHelpful={toggleHelpful}
        />
      ))}

      {/* <button onClick={handlePrevious}>Previous</button>
      {hasMore && (
        <button
          onClick={fetchReviews}
          disabled={loading}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
      <button onClick={handleNext}>Next</button> */}
    </section>
  );
}

export default Reviews;
