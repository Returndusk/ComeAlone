import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DestinationsType } from '../../types/DestinationListTypes';
import Destinations from './Destinations';
import { getDestinationsListByCategoryId } from '../../apis/destinationList';
import styles from './Category.module.scss';

type CategoryPropsTypes = {
  searchResults: DestinationsType[] | [];
  // isLoading: boolean;
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
  searchResults
}: // isLoading,
// setIsLoading
CategoryPropsTypes) {
  const [selectedCategory, setSelectedCategory] = useState<number[]>([
    ...CATEGORIES_ID_LIST
  ]);

  const [categorizedData, setCategorizedData] = useState<
    DestinationsType[] | []
  >([]);
  const [filteredDestinations, setFilteredDestinations] = useState<
    DestinationsType[] | []
  >([]);

  const [isClicked, setIsClicked] = useState(false);

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
    setIsClicked(true);
    const { value } = e.target as HTMLButtonElement;
    const targetCategoryId = Number(value);

    selectedCategory.includes(targetCategoryId)
      ? removeCategoryFromSelectedCategoryList(targetCategoryId)
      : addCategoryToSelectedCategoryList(targetCategoryId);
    setIsClicked(false);
    return;
  };

  const handleAllClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsClicked(true);
    isSelectedAll
      ? setSelectedCategory([])
      : setSelectedCategory(CATEGORIES_ID_LIST);
    setIsClicked(false);
    return;
  };

  useEffect(() => {
    const debouncer = setTimeout(() => {
      console.log('로딩 중입니다.');
    }, 400);

    return () => {
      clearTimeout(debouncer);
    };
  }, [isClicked]);

  const getCategorizedDestinationsData = useCallback(async () => {
    if (selectedCategory.length > 0) {
      const res = await getDestinationsListByCategoryId(selectedCategory);
      const categorizedDestinationsList = res?.data.result;
      setCategorizedData(() => categorizedDestinationsList);
    } else {
      setCategorizedData(() => []);
    }
  }, [selectedCategory]);

  useEffect(() => {
    // setIsLoading(true);
    getCategorizedDestinationsData();
    // setIsLoading(false);
  }, [getCategorizedDestinationsData]);

  useEffect(() => {
    if (searchResults.length > 0) {
      const categorizedDataTitles = categorizedData.map(
        (destination) => destination.title
      );

      const newDestinations = searchResults.filter((destination) =>
        categorizedDataTitles.includes(destination.title)
      );
      setFilteredDestinations(() => newDestinations);
    } else {
      setFilteredDestinations(() => searchResults);
    }
  }, [categorizedData, searchResults]);

  return (
    <>
      {isClicked ? (
        <div>로딩 중..</div>
      ) : (
        <>
          <div className={styles.categoryContainer}>
            <button
              onClick={handleAllClick}
              className={
                isSelectedAll
                  ? styles.activeSelectedAllButton
                  : styles.selectedAllButton
              }
            >
              전체
            </button>
            {CATEGORIES_ID_LIST.map((categoryId, index) => (
              <button
                key={index}
                value={categoryId}
                onClick={handleCategoryClick}
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
          <Destinations
            filteredDestinations={filteredDestinations}
            // isLoading={isLoading}
            // setIsLoading={setIsLoading}
          />{' '}
        </>
      )}
    </>
  );
}

export default Category;
