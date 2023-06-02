import React, { useEffect, useState } from 'react';
import { DestinationsType } from './Types';
import styles from './Search.module.scss';
// import axios from 'axios';
import Category from './Category';
import { useNavigate } from 'react-router-dom';

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
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [destinations, setDestinations] = useState<DestinationsType[] | []>(
    data
  );
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('search');

  useEffect(() => {
    console.log(destinations, 'destinations 변경');
  }, [destinations]);

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

  //searchQuery 디버깅
  useEffect(() => {
    console.log(searchQuery, 'searchQuery 변경');
  }, [searchQuery]);

  const searchDestinations = (searchQuery: string) => {
    const searchResultDestinations = data.filter((destination) => {
      const destinationTitle = destination?.title?.trim();
      const destinationAddress = destination?.addr1?.trim();
      return (
        destinationTitle?.includes(searchQuery.trim()) ||
        destinationAddress?.includes(searchQuery.trim())
      );
    });
    return searchResultDestinations;
  };

  const handleSubmitQuery = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submittedQuery = e.target.searchQuery.value;
    const searchQueryString = `${encodeURIComponent(submittedQuery)}`;
    navigate(`/destination/list?search=${searchQueryString}`);
    setSearchQuery(() => submittedQuery);
    return;
  };

  useEffect(() => {
    if (search !== '' && search !== null && search !== undefined) {
      setSearchQuery(search);
    }
  }, [search]);

  useEffect(() => {
    if (searchQuery !== '') {
      const results = searchDestinations(searchQuery ?? '');
      setDestinations(() => results ?? []);
      return;
    }
  }, [searchQuery]);

  return (
    <>
      {searchQuery === '' && alert('검색어를 입력해주세요.')}
      <div className={styles.filterContainer}>
        <div className={styles.searchContainer}>
          <form className={styles.searchBar} onSubmit={handleSubmitQuery}>
            <input
              id={styles.inputBar}
              type='text'
              name='searchQuery'
              placeholder='목적지명을 입력해주세요.'
            />
            <button id={styles.searchButton} type='submit'>
              검색
            </button>
          </form>
        </div>
        <Category destinations={destinations} />
      </div>
    </>
  );
}

export default Search;
