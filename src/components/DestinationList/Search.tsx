import React, { useMemo, useState } from 'react';
import { DestinationsType } from '../../types/DestinationListTypes';
import styles from './Search.module.scss';
import Category from './Category';
import { useSearchParams } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { DEFAULT_DESTINATIONS } from './Dummy';

// 사용자에게 쿼리 받음 -> 검색 함수 전달 -> 검색함수가 쿼리랑, 목적지 받아서 검색 수행 -> 검색 결과 Destinations 파일에 전달

function Search() {
  const [data, setData] = useState<DestinationsType[]>(DEFAULT_DESTINATIONS);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQueryParam = useMemo(() => {
    return searchParams.get('search') ?? '';
  }, [searchParams]);

  const searchResults = useMemo(() => {
    const searchResultDestinations = data.filter((destination) => {
      const destinationTitle = destination?.title?.trim();
      const destinationAddress = destination?.addr1?.trim();
      return (
        destinationTitle?.includes(searchQueryParam.trim()) ||
        destinationAddress?.includes(searchQueryParam.trim())
      );
    });
    return searchResultDestinations ?? [];
  }, [searchQueryParam]);

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
    setSearchParams(`?search=${searchQueryString}`);
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
        <Category destinations={searchResults} />
      </div>
    </>
  );
}

export default Search;
