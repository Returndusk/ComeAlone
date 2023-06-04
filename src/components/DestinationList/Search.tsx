import React, { useMemo, useState } from 'react';
import { DestinationsType } from './Types';
import styles from './Search.module.scss';
// import axios from 'axios';
import Category from './Category';
import { useSearchParams } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

// 사용자에게 쿼리 받음 -> 검색 함수 전달 -> 검색함수가 쿼리랑, 목적지 받아서 검색 수행 -> 검색 결과 Destinations 파일에 전달

//Dummy data
const DEFAULT_DESTINATIONS = [
  {
    title: '제주도 시청',
    mapy: 33.48907969999994,
    mapx: 126.49932809999973,
    contenttypeid: '32'
  },
  {
    title: '한라산',
    mapy: 33.37915262371278,
    mapx: 126.54626368383182,
    tel: '064-772-3366',
    overview: '개요 설명입니다.',
    contenttypeid: '12'
  },
  {
    title: '서귀포 해양 도립공원',
    mapy: 33.241570451808215,
    mapx: 126.55770550692283,
    contenttypeid: '25'
  },
  {
    title: '금오름',
    mapy: 33.35452764241429,
    mapx: 126.30590904987518,
    contenttypeid: '12'
  }
];

function Search() {
  const [data, setData] = useState<DestinationsType[]>(DEFAULT_DESTINATIONS);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQueryParam = useMemo(() => {
    return searchParams.get('search') ?? '';
  }, [searchParams]);

  /* 백엔드 연결 후 수정
  async function getAllDestinations() {
    try {
      const res = await axios.get(
        'api/destinations'
      );
      return res.data;
    } catch (err) {
      throw new Error('목적지 리스트 데이터를 가져오는데 실패했습니다.');
    }
  }
*/

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
