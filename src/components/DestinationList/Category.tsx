import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CategoryListType,
  CountedCategoryItemsType,
  DestinationsType,
  specifiedCategoryDestinationsType
} from '../../types/DestinationListTypes';
import Destinations from './Destinations';
import {
  countEachCategoryItemsByQuery,
  getAllCategoryList,
  getDestinationListByTitleAndCategoryId
} from '../../apis/destinationList';
import styles from './Category.module.scss';

type CategoryPropsTypes = {
  rankedDestinations: DestinationsType[] | [];
  isUserSearched: boolean;
  searchQueryParam: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const CATEGORIES_ID = new Map([
  [12, '관광지'],
  [14, '문화시설'],
  [15, '축제공연행사'],
  [25, '여행코스'],
  [28, '레포츠'],
  [32, '숙박'],
  [38, '쇼핑'],
  [39, '음식점']
]);

const CATEGORIES_ID_LIST = Array.from(CATEGORIES_ID.keys());

function Category({
  rankedDestinations,
  isUserSearched,
  searchQueryParam,
  isLoading,
  setIsLoading
}: CategoryPropsTypes) {
  const [selectedCategory, setSelectedCategory] = useState<number[]>([
    ...CATEGORIES_ID_LIST
  ]);
  const [filteredDestinations, setFilteredDestinations] = useState<
    specifiedCategoryDestinationsType[] | []
  >([]); // 랭킹데이터랑 일반 데이터랑 type이 달라서 타입에러 -> 일반 데이터로 임시 대체(API 변동 시 수정)
  const [filteredCount, setFilteredCount] = useState<number | null>(null);
  const [categoryList, setCategoryList] = useState<CategoryListType[] | null>(
    null
  );
  const [countedCategoryItems, setCountedCategoryItems] = useState<
    CountedCategoryItemsType[] | []
  >([]);

  const getAllCategoryData = useCallback(async () => {
    const res = await getAllCategoryList();
    const categoryListData = res?.data;
    setCategoryList(() => categoryListData);
    return;
  }, [setCategoryList]);

  useEffect(() => {
    getAllCategoryData();
  }, [getAllCategoryData]);

  //카테고리별 데이터 수 받아오기
  const countEachCategoryItems = useCallback(async () => {
    const res = await countEachCategoryItemsByQuery(
      searchQueryParam,
      selectedCategory
    );
    const categoryCount = res?.data.counts_by_category;
    setCountedCategoryItems(categoryCount);
  }, [searchQueryParam, selectedCategory, setCountedCategoryItems]);

  useEffect(() => {
    countEachCategoryItems();
  }, [countEachCategoryItems, searchQueryParam, selectedCategory]);

  //카테고리 id로 카테고리 아이템 수를 찾는 함수
  const findCategoryCountByCategoryId = (categoryid: number) => {
    const targetCategory = countedCategoryItems.find(
      (category) => category.category_id === categoryid
    );
    return targetCategory;
  };

  //카테고리 id => name 변환 함수
  const changeCategoryIdIntoName = useCallback(
    (destinationList: DestinationsType[]) => {
      const specifiedCatogory = destinationList?.map((el) => {
        const categoryName = CATEGORIES_ID.get(el.category_id) ?? '로딩 중..';
        return { ...el, category_name: categoryName }; //예외처리 다시 수정
      });
      return specifiedCatogory;
    },
    [CATEGORIES_ID]
  );

  //체크박스 로직
  const isSelectedAll = useMemo(() => {
    return selectedCategory?.length === categoryList?.length;
  }, [selectedCategory, categoryList]);

  const removeCategoryFromSelectedCategoryList = (targetCategoryId: number) => {
    const subSelectedCategory =
      selectedCategory?.filter(
        (categoryId) => categoryId !== targetCategoryId
      ) ?? [];
    setSelectedCategory([...subSelectedCategory]);
  };

  const addCategoryToSelectedCategoryList = (targetCategoryId: number) => {
    if (selectedCategory !== null) {
      return setSelectedCategory([...selectedCategory, targetCategoryId]);
    }
  };

  const handleCategoryClick: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    setIsLoading(true);
    const { value } = e.target as HTMLButtonElement;
    const targetCategoryId = Number(value);

    selectedCategory.includes(targetCategoryId)
      ? removeCategoryFromSelectedCategoryList(targetCategoryId)
      : addCategoryToSelectedCategoryList(targetCategoryId);
    setIsLoading(false);
    return;
  };

  const handleAllClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsLoading(true);
    isSelectedAll
      ? setSelectedCategory([])
      : setSelectedCategory(CATEGORIES_ID_LIST ?? []); //오류가능성
    setIsLoading(false);
    return;
  };

  useEffect(() => {
    const debouncer = setTimeout(() => {
      console.log('로딩 중입니다.');
    }, 400);

    return () => {
      clearTimeout(debouncer);
    };
  }, [isLoading]);

  //필터링 로직(유저 검색 O/X 분기)
  useEffect(() => {
    if (selectedCategory.length <= 0) {
      return;
    }
    if (!isUserSearched) {
      setIsLoading(true);
      const categorizedRankingDestinations =
        rankedDestinations?.filter((destination) => {
          return selectedCategory.includes(destination?.category_id);
        }) ?? [];
      setFilteredDestinations(() =>
        changeCategoryIdIntoName(categorizedRankingDestinations)
      );
      setFilteredCount(() => categorizedRankingDestinations.length);
      setIsLoading(false);
    }
    return;
  }, [
    selectedCategory,
    rankedDestinations,
    setFilteredCount,
    setIsLoading,
    isUserSearched
  ]);

  const getCategorizedSearchingData = useCallback(async () => {
    setIsLoading(true);
    const res = await getDestinationListByTitleAndCategoryId(
      selectedCategory,
      isUserSearched ? searchQueryParam : '' //랭킹순 추가 시 수정예정
    );
    const categorizedSearchingDestinationsList = res?.data.destinations;
    setFilteredDestinations(() =>
      changeCategoryIdIntoName(categorizedSearchingDestinationsList)
    );
    setFilteredCount(() => categorizedSearchingDestinationsList.length);
    setIsLoading(false);
    return;
  }, [
    selectedCategory,
    searchQueryParam,
    setFilteredDestinations,
    setFilteredCount,
    isUserSearched,
    setIsLoading
  ]);

  useEffect(() => {
    setIsLoading(true);
    getCategorizedSearchingData();
    setIsLoading(false);
  }, [getCategorizedSearchingData, setIsLoading]);

  return (
    <>
      {isLoading ? (
        <div className={styles.IsLoadingContainer}>로딩 중..</div>
      ) : (
        <>
          <section className={styles.categoryWrapper}>
            <div className={styles.categoryContainer}>
              <button
                onClick={handleAllClick}
                id={
                  isSelectedAll
                    ? styles.activeSelectedAllButton
                    : styles.selectedAllButton
                }
                disabled={isLoading}
              >
                전체
              </button>
              {CATEGORIES_ID_LIST?.map((categoryId, index) => (
                <button
                  key={index}
                  value={categoryId}
                  onClick={handleCategoryClick}
                  disabled={isLoading}
                  className={
                    selectedCategory?.includes(categoryId)
                      ? styles.activeSelectedButton
                      : styles.selectedButton
                  }
                  id={
                    selectedCategory?.includes(categoryId)
                      ? styles[`activeCategory-${categoryId}`]
                      : styles[`Category-${categoryId}`]
                  }
                >
                  {/* {categoryList?.find(
                    (categoryPair) => categoryPair.id === categoryId
                  )?.name ?? ''} */}
                  {`${
                    findCategoryCountByCategoryId(categoryId)?.category_name
                  }ㆍ${findCategoryCountByCategoryId(categoryId)?.count}`}
                </button>
              ))}
            </div>
          </section>
          {/* <div className={styles.filteredCounterWraper}>
            <p className={styles.filteredCounter}>{`전체ㆍ${
              filteredCount ?? '로딩 중...'
            }`}</p>
          </div> */}
          <Destinations
            filteredDestinations={filteredDestinations}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  );
}

export default Category;
