import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.scss';
import { DestinationsType } from '../../types/DestinationListTypes';

type PaginationProps = {
  filteredDestinations: DestinationsType[];
  setSlicedDestinations: React.Dispatch<
    React.SetStateAction<DestinationsType[]>
  >;
};

const PAGES = {
  START_INDEX_OF_PAGE: 1,
  PAGES_TO_SKIP: 1,
  ITEMS_PER_PAGE: 20,
  QUERY_OF_URL: 'page',
  PAGES_TO_SHOW_IN_NAVBAR: 5
};

function Pagination({
  filteredDestinations,
  setSlicedDestinations
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(PAGES.START_INDEX_OF_PAGE);

  const pageQueryParam = useMemo(() => {
    return searchParams.get('page') ?? '1';
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
  }, [filteredDestinations, firstDestinationIdx, lastDestinationIdx]);

  useEffect(() => {
    setPage(() => pageNumber);
  }, [pageNumber]);

  const handlePageQueryChange = (targetPageNumber: number) => {
    setPage(() => targetPageNumber);
    // pageQueryParam.set(PAGES.QUERY_OF_URL, targetPageNumber.toString());
    setSearchParams(`?page=${page}`);
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

  const handlePreviousPageClick = () => {
    if (page > 1) {
      handlePageQueryChange(page - PAGES.PAGES_TO_SKIP);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    handlePageQueryChange(pageNumber);
  };

  const handleNextPageClick = () => {
    if (page < totalPages) {
      handlePageQueryChange(page + PAGES.PAGES_TO_SKIP);
    }
  };

  const handleFirstPageClick = () => {
    handlePageQueryChange(PAGES.START_INDEX_OF_PAGE);
  };

  const handleLastPageClick = () => {
    handlePageQueryChange(totalPages);
  };

  return (
    <div className={styles.paginationBar}>
      <button onClick={handleFirstPageClick}>{`<<`}</button>
      <button onClick={handlePreviousPageClick}>{`<`}</button>

      {pageNumbers
        .slice(
          slicePageIdx - PAGES.START_INDEX_OF_PAGE,
          slicePageIdx +
            PAGES.PAGES_TO_SHOW_IN_NAVBAR -
            PAGES.START_INDEX_OF_PAGE
        )
        .map((pageNumber) =>
          page === pageNumber ? (
            <span
              key={pageNumber}
              className={styles.pageNumber}
              id={styles.selected}
            >
              {pageNumber}
            </span>
          ) : (
            <NavLink
              to={`?page=${pageNumber}`}
              className={styles.pageNumber}
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </NavLink>
          )
        )}
      {pageNumbers
        .slice(
          slicePageIdx - PAGES.START_INDEX_OF_PAGE,
          slicePageIdx +
            PAGES.PAGES_TO_SHOW_IN_NAVBAR -
            PAGES.START_INDEX_OF_PAGE
        )
        .includes(totalPages) ? (
        <span></span>
      ) : (
        <span className={styles.reducedNumber}>...</span>
      )}

      <button onClick={handleNextPageClick}>{`>`}</button>
      <button onClick={handleLastPageClick}>{`>>`}</button>
    </div>
  );
}

export default Pagination;
