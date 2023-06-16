import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.scss';
import { specifiedCategoryDestinationsType } from '../../types/DestinationListTypes';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight
} from 'react-icons/md';

type PaginationProps = {
  filteredDestinations: specifiedCategoryDestinationsType[] | [];
  setSlicedDestinations: React.Dispatch<
    React.SetStateAction<specifiedCategoryDestinationsType[]>
  >;
};

const PAGES = {
  START_INDEX_OF_PAGE: 1,
  PAGES_TO_SKIP: 1,
  ITEMS_PER_PAGE: 10,
  QUERY_OF_URL: 'page',
  PAGES_TO_SHOW_IN_NAVBAR: 5
};

function Pagination({
  filteredDestinations,
  setSlicedDestinations
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(PAGES.START_INDEX_OF_PAGE);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pageQueryParam = useMemo(() => {
    return searchParams.get('page');
  }, [searchParams]);

  const searchQueryParam = useMemo(() => {
    return searchParams.get('search');
  }, [searchParams]);

  const pageNumber = parseInt(
    pageQueryParam || PAGES.START_INDEX_OF_PAGE.toString()
  );

  const totalPages = useMemo(() => {
    return Math.ceil(filteredDestinations.length / PAGES.ITEMS_PER_PAGE);
  }, [filteredDestinations]);

  const firstDestinationIdx = useMemo(() => {
    return (page - PAGES.PAGES_TO_SKIP) * PAGES.ITEMS_PER_PAGE;
  }, [page]);

  const lastDestinationIdx = useMemo(() => {
    return firstDestinationIdx + PAGES.ITEMS_PER_PAGE;
  }, [firstDestinationIdx]);

  useEffect(() => {
    setSlicedDestinations(() => {
      return filteredDestinations.slice(
        firstDestinationIdx,
        lastDestinationIdx
      );
    });
  }, [
    filteredDestinations,
    firstDestinationIdx,
    lastDestinationIdx,
    setSlicedDestinations
  ]);

  useEffect(() => {
    setPage(() => pageNumber);
  }, [pageNumber]);

  // 중간에 페이지가 바뀌면 초기화
  useEffect(() => {
    setPage(() => PAGES.START_INDEX_OF_PAGE);
  }, [totalPages]);

  const handlePageQueryChange = (targetPageNumber: number) => {
    setPage(() => targetPageNumber);
    if (searchQueryParam !== null) {
      setSearchParams(`?page=${targetPageNumber}&search=${searchQueryParam}`);
    } else {
      setSearchParams(`?page=${targetPageNumber}`);
    }
    return;
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + PAGES.START_INDEX_OF_PAGE
  );

  const slicePageIdx = useMemo(() => {
    return (
      Math.floor(
        (page - PAGES.START_INDEX_OF_PAGE) / PAGES.PAGES_TO_SHOW_IN_NAVBAR
      ) *
        PAGES.PAGES_TO_SHOW_IN_NAVBAR +
      PAGES.START_INDEX_OF_PAGE
    );
  }, [page]);

  useEffect(() => {
    return () => {
      clearTimeout(clickTimeoutRef.current as NodeJS.Timeout);
    };
  }, []);

  const handlePreviousPageClick = () => {
    clearTimeout(clickTimeoutRef.current as NodeJS.Timeout);
    clickTimeoutRef.current = setTimeout(() => {
      if (page > 1) {
        handlePageQueryChange(page - PAGES.PAGES_TO_SKIP);
      }
    }, 150);
  };

  const handlePageClick = (pageNumber: number) => {
    clearTimeout(clickTimeoutRef.current as NodeJS.Timeout);
    clickTimeoutRef.current = setTimeout(() => {
      handlePageQueryChange(pageNumber);
    }, 150);
  };

  const handleNextPageClick = () => {
    clearTimeout(clickTimeoutRef.current as NodeJS.Timeout);
    clickTimeoutRef.current = setTimeout(() => {
      if (page < totalPages) {
        handlePageQueryChange(page + PAGES.PAGES_TO_SKIP);
      }
    }, 150);
  };

  const handleFirstPageClick = () => {
    clearTimeout(clickTimeoutRef.current as NodeJS.Timeout);
    clickTimeoutRef.current = setTimeout(() => {
      handlePageQueryChange(PAGES.START_INDEX_OF_PAGE);
    }, 150);
  };

  const handleLastPageClick = () => {
    clearTimeout(clickTimeoutRef.current as NodeJS.Timeout);
    clickTimeoutRef.current = setTimeout(() => {
      handlePageQueryChange(totalPages);
    }, 150);
  };

  return (
    <div className={styles.paginationBar}>
      <button onClick={handleFirstPageClick}>
        <MdOutlineKeyboardDoubleArrowLeft />
      </button>
      <button onClick={handlePreviousPageClick}>
        <MdOutlineKeyboardArrowLeft />
      </button>

      <ul className={styles.pageNumbers}>
        {pageNumbers
          .slice(
            slicePageIdx - PAGES.START_INDEX_OF_PAGE,
            slicePageIdx +
              PAGES.PAGES_TO_SHOW_IN_NAVBAR -
              PAGES.START_INDEX_OF_PAGE
          )
          .map((pageNumber) =>
            page === pageNumber ? (
              <li key={pageNumber}>
                <span className={`${styles.pageNumber} ${styles.selected}`}>
                  {pageNumber}
                </span>
              </li>
            ) : (
              <li key={pageNumber}>
                <NavLink
                  to={
                    searchQueryParam !== null
                      ? `?page=${pageNumber}&search=${searchQueryParam}`
                      : `?page=${pageNumber}`
                  }
                  className={styles.pageNumber}
                  key={pageNumber}
                  onClick={() => handlePageClick(pageNumber)}
                >
                  {pageNumber}
                </NavLink>
              </li>
            )
          )}
      </ul>

      <button onClick={handleNextPageClick}>
        <MdOutlineKeyboardArrowRight />
      </button>
      <button onClick={handleLastPageClick}>
        <MdOutlineKeyboardDoubleArrowRight />
      </button>
    </div>
  );
}

export default Pagination;
