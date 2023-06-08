import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DestinationsType } from '../../types/DestinationListTypes';
import styles from './Search.module.scss';
import Category from './Category';
import { useSearchParams } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  getAllDestinationsList,
  getRankedDestinationsByRankingNumber
} from '../../apis/destinationList';

// 사용자에게 쿼리 받음 -> 검색 함수 전달 -> 검색함수가 쿼리랑, 목적지 받아서 검색 수행 -> 검색 결과 Destinations 파일에 전달

const RANKED_DESTINAIONS_NUMBER = {
  count: 10
};

function Search() {
  const [totalData, setTotalData] = useState<DestinationsType[] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [rankedDestinations, setRankedDestinations] = useState<
    DestinationsType[] | []
  >([]);
  const [resultData, setResultData] = useState<DestinationsType[] | []>(
    rankedDestinations
  );
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  //인기 목적지 목록
  const getRankedDestinationsData = useCallback(async () => {
    const res = await getRankedDestinationsByRankingNumber(
      RANKED_DESTINAIONS_NUMBER.count
    );
    const rankedDestinationsList = res?.data;
    setRankedDestinations(() => rankedDestinationsList);
    setResultData(rankedDestinations);
  }, []);

  useEffect(() => {
    getRankedDestinationsData();
  }, [getRankedDestinationsData]);

  // 전체 목록 가져오기
  const getAllDestinationsData = useCallback(async () => {
    const res = await getAllDestinationsList();
    const allDestinationsList = res?.data;
    setTotalData(() => allDestinationsList);
  }, []);

  useEffect(() => {
    getAllDestinationsData();
  }, [getAllDestinationsData]);

  // const totalDestinationsData = useMemo(() => {
  //   return totalData;
  // }, [totalData]);

  //검색 로직
  const searchQueryParam = useMemo(() => {
    return searchParams.get('search') ?? '';
  }, [searchParams]);

  const searchResults = useMemo(() => {
    const searchResultDestinations = totalData?.filter(
      (destination: DestinationsType) => {
        const destinationTitle = destination?.title?.trim();
        const destinationAddress = destination?.addr1?.trim();
        return (
          destinationTitle?.includes(searchQueryParam.trim()) ||
          destinationAddress?.includes(searchQueryParam.trim())
        );
      }
    );
    return searchResultDestinations;
  }, [searchQueryParam, totalData]);

  //검색 결과 저장
  useEffect(() => {
    if (searchQueryParam === '') {
      setResultData(rankedDestinations);
      return;
    }
    setResultData(searchResults ?? []);
  }, [searchResults]);

  const isNullishSearchInput = (input: string) => {
    return input === '';
  };

  const handleSubmitQuery = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          searchResults={resultData}
          // isLoading={isLoading}
          // setIsLoading={setIsLoading}
        />
      </div>
    </>
  );
}

export default Search;
