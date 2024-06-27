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
  startAfter,
} from "firebase/firestore";
import db from "@/lib/firestore";
import ReviewItem from "./ReviewItem";
import { useLocalStorageArray } from "./useLocalStorageArray";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const reviewsCollectionRef = query(
          collection(db, "reviews"),
          orderBy("date", "desc"),
          limit(5)
        );
        const reviewsSnapshot = await getDocs(reviewsCollectionRef);
        const reviewsList = reviewsSnapshot.docs.map((doc) => ({
          id: doc.id,
          helpful: doc.data().helpful || 0,
          ...doc.data(),
        }));
        setReviews(reviewsList);
        const lastVisibleDocument =
          reviewsSnapshot.docs[reviewsSnapshot.docs.length - 1];
        setLastVisible(lastVisibleDocument);
        setHasMore(reviewsSnapshot.docs.length > 0);
      } catch (err) {
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    const fetchTotalReviewsCount = async () => {
      try {
        const docRef = doc(db, "metadata", "reviewsCount");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists) {
          setTotalReviews(docSnap.data().count);
        }
      } catch (error) {
        console.error("Error fetching total reviews count: ", error);
        setError("Failed to fetch total reviews count.");
      }
    };

    fetchTotalReviewsCount();

    fetchReviews();
  }, []);
  const fetchMoreReviews = async () => {
    if (!lastVisible) return;
    setLoadingMore(true);

    try {
      const nextReviewsQuery = query(
        collection(db, "reviews"),
        orderBy("date", "desc"),
        startAfter(lastVisible),
        limit(5)
      );
      const reviewsSnapshot = await getDocs(nextReviewsQuery);
      const newReviews = reviewsSnapshot.docs.map((doc) => ({
        id: doc.id,
        helpful: doc.data().helpful || 0,
        ...doc.data(),
      }));
      setReviews((prevReviews) => [...prevReviews, ...newReviews]);
      const lastVisibleDocument =
        reviewsSnapshot.docs[reviewsSnapshot.docs.length - 1];
      setLastVisible(lastVisibleDocument);
      setHasMore(reviewsSnapshot.docs.length > 0);
    } catch (err) {
      console.error("Error loading more reviews:", err);

      setError("Failed to load more reviews. Please try again later.");
    } finally {
      setLoadingMore(false);
    }
  };
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
        }
      } catch (error) {
        console.error("Error fetching updated review: ", error);
      }
    }
  };

  if (loading && !loadingMore) return <p>جاري تحميل المراجعات ...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="p-4 space-y-2 mt-4 border rounded border-white/20">
      <h2 className="text-lg font-semibold text-white">
        اجمالي المراجعات : {totalReviews}
      </h2>
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          onToggleHelpful={toggleHelpful}
        />
      ))}
      {hasMore && (
        <button
          className="px-4 py-2 mt-4 rounded text-red-200  outline outline-1"
          onClick={fetchMoreReviews}
          disabled={!hasMore || loading || loadingMore}
        >
          {loadingMore ? "... جاري التحميل " : " تحميل المزيد"}
        </button>
      )}
    </section>
  );
}

export default Reviews;
