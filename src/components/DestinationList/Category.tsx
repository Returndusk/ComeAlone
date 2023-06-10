import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DestinationsType } from '../../types/DestinationListTypes';
import Destinations from './Destinations';
import { getDestinationListByTitleAndCategoryId } from '../../apis/destinationList';
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
  const [filteredDestinations, setFilteredDestinations] =
    useState<DestinationsType[]>(rankedDestinations);

  const isSelectedAll = useMemo(() => {
    return selectedCategory.length === CATEGORIES_ID_LIST.length;
  }, [selectedCategory]);

  const removeCategoryFromSelectedCategoryList = (targetCategoryId: number) => {
    const subSelectedCategory = selectedCategory.filter(
      (categoryId) => categoryId !== targetCategoryId
    );
    setSelectedCategory([...subSelectedCategory]);
  };

  const addCategoryToSelectedCategoryList = (targetCategoryId: number) => {
    setSelectedCategory([...selectedCategory, targetCategoryId]);
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
      : setSelectedCategory(CATEGORIES_ID_LIST);
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

  useEffect(() => {
    if (selectedCategory.length <= 0) {
      return;
    }
    if (!isUserSearched) {
      setIsLoading(true);
      const categorizedRankingDestinations = rankedDestinations.filter(
        (destination) => {
          return selectedCategory.includes(destination.category_id);
        }
      );
      setFilteredDestinations(() => categorizedRankingDestinations);
      setIsLoading(false);
    }
    return;
  }, [selectedCategory, rankedDestinations]);

  const getCategorizedSearchingData = useCallback(async () => {
    if (selectedCategory.length <= 0) {
      return;
    }
    if (isUserSearched) {
      const res = await getDestinationListByTitleAndCategoryId(
        selectedCategory,
        searchQueryParam
      );
      const categorizedSearchingDestinationsList = res?.data.destinations;
      setFilteredDestinations(() => categorizedSearchingDestinationsList);
    }
    return;
  }, [selectedCategory, searchQueryParam]);

  useEffect(() => {
    setIsLoading(true);
    getCategorizedSearchingData();
    setIsLoading(false);
  }, [getCategorizedSearchingData]);

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
                className={
                  isSelectedAll
                    ? styles.activeSelectedAllButton
                    : styles.selectedAllButton
                }
                disabled={isLoading}
              >
                전체
              </button>
              {CATEGORIES_ID_LIST.map((categoryId, index) => (
                <button
                  key={index}
                  value={categoryId}
                  onClick={handleCategoryClick}
                  disabled={isLoading}
                  className={
                    selectedCategory.includes(categoryId)
                      ? styles.activeSelectedButton
                      : styles.selectedButton
                  }
                >
                  {CATEGORIES_ID.get(categoryId)}
                </button>
              ))}
            </div>
          </section>
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
