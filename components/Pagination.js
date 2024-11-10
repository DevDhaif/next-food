import { Button } from "./ui/button";

const Pagination = ({
  currentPage,
  totalPages,
  onPageClick,
  onNextPage,
  onPrevPage,
}) => {
  return (
    <div className="pagination">
      <Button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className="mr-2"
      >
        Previous
      </Button>

      {/* Render numbered page buttons */}
      {[...Array(totalPages).keys()].map((page) => (
        <Button
          key={page + 1}
          onClick={() => onPageClick(page + 1)}
          className={
            page + 1 === currentPage
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }
        >
          {page + 1}
        </Button>
      ))}

      <Button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className="ml-2"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
