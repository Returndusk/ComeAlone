import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DestinationsType } from '../../types/DestinationListTypes';
import styles from './Search.module.scss';
import Category from './Category';
import { useSearchParams } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  getDestinationDetailsByDestinationId,
  getRankedDestinationsByRankingNumber
} from '../../apis/destinationList';

// 사용자 검색 X -> 랭킹 데이터를 props로 전송
// 사용자 검색 O -> 검색 쿼리를 props로 전송

const RANKED_DESTINAIONS_NUMBER = {
  count: 10
};

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rankedDestinations, setRankedDestinations] = useState<
    DestinationsType[] | []
  >([]);
  const [isUserSearched, setIsUserSearched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //인기 목적지 목록
  /*
  const getRankedDestinationsData = useCallback(async () => {
    const res = await getRankedDestinationsByRankingNumber(
      RANKED_DESTINAIONS_NUMBER.count
    );
    const rankedDestinationsList = res?.data;
    setRankedDestinations(() => rankedDestinationsList);
  }, []);

  useEffect(() => {
    getRankedDestinationsData();
  }, [getRankedDestinationsData]);
  */

  const getRankedDestinationsData = useCallback(async () => {
    const res = await getDestinationDetailsByDestinationId(2853453); //임시 id
    const rankedDestinationsList = res?.data.destinations;
    setRankedDestinations(() => rankedDestinationsList);
  }, []);

  useEffect(() => {
    getRankedDestinationsData();
  }, [getRankedDestinationsData]);

  const searchQueryParam = useMemo(() => {
    return searchParams.get('search') ?? '';
  }, [searchParams]);

  const isNullishSearchInput = (input: string) => {
    return input === '';
  };

  const handleSubmitQuery = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUserSearched(true);
    const submittedQuery = e.target.searchQuery.value;
    if (isNullishSearchInput(submittedQuery)) {
      alert('검색어를 입력해주세요.');
    }
    const searchQueryString = encodeURIComponent(submittedQuery);
    if (searchQueryString !== null) {
      setSearchParams(`?search=${searchQueryString}`);
    }
    return;
  };

  return (
    <>
      <div className={styles.filterContainer}>
        <div className={styles.searchContainer}>
          <form className={styles.searchBar} onSubmit={handleSubmitQuery}>
            <input
              id={styles.inputBar}
              type='text'
              name='searchQuery'
              placeholder='목적지를 입력해주세요.'
              defaultValue={searchQueryParam}
            />
            <button id={styles.searchButton} type='submit'>
              <AiOutlineSearch />
            </button>
          </form>
        </div>
        <Category
          rankedDestinations={rankedDestinations}
          isUserSearched={isUserSearched}
          searchQueryParam={searchQueryParam}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </>
  );
}

export default Search;
