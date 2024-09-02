"use client";
import { useEffect, useState } from "react";
import useFetchDishes from "@/lib/hooks/useFetchDishes";
import useFetchDishCount from "@/lib/hooks/useFetchDishesCount";
import { PAGE_SIZE } from "@/lib/constants";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const { dishes, isLoading, error } = useFetchDishes(currentPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDishes, setFilteredDishes] = useState([]);

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
  useEffect(() => {
    setFilteredDishes(dishes);
  }, [dishes]);

  useEffect(() => {
    const filtered = dishes.filter(
      (dish) =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDishes(filtered);
  }, [searchQuery, dishes]);

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

  const handleEdit = (dish) => {
    // Implement your edit logic here
    console.log("Edit clicked for dish:", dish);
    // For example, open a modal to edit the dish
  };

  const handleDelete = (dishId) => {
    // Implement your delete logic here
    console.log("Delete clicked for dish ID:", dishId);
    // For example, make an API call to delete the dish
  };
  return (
    <div>
      {loadCount ? "..." : <p> Total Dishes: {count}</p>}
      <div>
        <div className="my-4">
          <input
            type="text"
            placeholder="Search by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border rounded-md max-w-sm"
          />
        </div>
        <div>
          <Table className="text-left min-w-full bg-white min-h-60">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Calories</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {filteredDishes.length > 0 ? (
                    filteredDishes.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <img
                            className="w-20 h-20"
                            src={item.imgUrl}
                            alt={item.name}
                          />
                        </TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.calories}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </div>
        {totalPages > 1 && (
          <div className="bg-white text-black">
            <button
              className="disabled:text-gray-600 px-2 py-1 border my-2 disabled:bg-slate-400/50"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {renderPageNumbers()}
            <button
              className="disabled:text-gray-600 px-2 py-1 border my-2 disabled:bg-slate-400/50"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
