import { Link } from "react-router-dom";
const Pagination = ({ currentPage, totalPages }) => {
  return (
    <>
      <div className="flex items-center justify-center space-x-2 mt-12">
        {currentPage !== 1 && (
          <>
            <PaginationButton page="1">&lt;&lt; First</PaginationButton>
            <PaginationButton page={currentPage - 1}>
              &lt; Prev
            </PaginationButton>
          </>
        )}
        {currentPage - 2 > 0 && (
          <PaginationButton page={currentPage - 2}>
            {currentPage - 2}
          </PaginationButton>
        )}
        {currentPage - 1 > 0 && (
          <PaginationButton page={currentPage - 1}>
            {currentPage - 1}
          </PaginationButton>
        )}
        <PaginationButton disabled={true} page={currentPage}>
          {currentPage}
        </PaginationButton>
        {currentPage + 1 > 0 && currentPage + 1 < totalPages && (
          <PaginationButton page={currentPage + 1}>
            {currentPage + 1}
          </PaginationButton>
        )}
        {currentPage + 2 > 0 && currentPage + 1 < totalPages && (
          <PaginationButton page={currentPage + 2}>
            {currentPage + 2}
          </PaginationButton>
        )}
        {currentPage !== totalPages && totalPages > 0 && (
          <>
            <PaginationButton page={currentPage + 1}>
              Next &gt;
            </PaginationButton>
            <PaginationButton page={totalPages}>Last &gt;&gt;</PaginationButton>
          </>
        )}
      </div>
    </>
  );
};

export const PaginationButton = ({ children, page, disabled }) => {
  return (
    <Link to={`/page/${page}`}>
      <button
        className={`bg-gray-500 rounded-md px-3 py-2 hover:bg-opacity-40 text-center hover:text-neutral-50 disabled:opacity-40 disabled:hover:bg-opacity-100`}
        disabled={disabled}
      >
        {children}
      </button>
    </Link>
  );
};

export default Pagination;
