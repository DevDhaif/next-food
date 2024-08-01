"use client";
import { useState } from "react";
import useFetchDishes from "@/lib/hooks/useFetchDishes";
import useFetchDishCount from "@/lib/hooks/useFetchDishesCount";
import { PAGE_SIZE } from "@/lib/constants";

function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const { dishes, isLoading, error } = useFetchDishes(currentPage);
  const {
    count,
    isLoading: loadCount,
    error: errorCount,
  } = useFetchDishCount();

  const totalPages = Math.ceil(count / PAGE_SIZE);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const renderPageNumbers = () => {
    let pages = [];
    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              background: currentPage === i ? "#ccc" : "#fff",
            }}
          >
            {i}
          </button>
        );
      }
    }
    return pages;
  };

  return (
    <div>
      {loadCount ? (
        "LOADING COUNT.."
      ) : (
        <div>
          Total Dishes: {count}
          <div>
            {isLoading
              ? "LOADING DISHES ..."
              : dishes.map((item) => <p key={item.id}>{item.name}</p>)}
          </div>
          {totalPages > 1 && (
            <div>
              <button onClick={handlePrev} disabled={currentPage === 1}>
                Prev
              </button>
              {renderPageNumbers()}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Page;
