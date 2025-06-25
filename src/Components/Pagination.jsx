import React from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import styles from "./Pagination.module.css";

const Pagination = ({ currPage, setCurrPage, totalPages }) => {
  return (
    <div className={styles.paginationWrapper}>
      <button
        onClick={() => {
          if (currPage > 1) {
            setCurrPage((prev) => prev - 1);
          }
        }}
        disabled={currPage == 1}
      >
        <IoIosArrowRoundBack />
      </button>
      <div className={styles.pgNo}>
        <p>{currPage}</p>
      </div>

      <button
        onClick={() => {
          if (totalPages != currPage) {
            setCurrPage((prev) => prev + 1);
          }
        }}
        disabled={totalPages == currPage}
      >
        <IoIosArrowRoundForward />
      </button>
    </div>
  );
};

export default Pagination;
