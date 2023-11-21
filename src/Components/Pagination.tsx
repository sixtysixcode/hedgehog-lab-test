import "../styles/pagination.scss";

import { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  pages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  fetchUsers: (data: any) => void;
}

const Pagination = ({
  pages,
  currentPage,
  setCurrentPage,
  fetchUsers,
}: PaginationProps) => {
  const handleClick = (page: number) => {
    setCurrentPage(page);
    fetchUsers({ page: page });
  };

  return (
    <div className="pagination">
      {Array.from({ length: pages }, (page, i) => {
        return (
          <div
            onClick={() => handleClick(i + 1)}
            key={i}
            className={`pagination__element icon square-icon ${
              currentPage === i + 1 && "active"
            }`}
          >
            <span>{i + 1}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Pagination;
