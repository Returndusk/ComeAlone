import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DestinationsType } from '../../types/DestinationListTypes';
import Destinations from './Destinations';
import { getDestinationsListByCategoryId } from '../../apis/DestinationListAPI';
import styles from './Category.module.scss';

type CategoryPropsTypes = {
  searchResults: DestinationsType[] | [];
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

function Category({ searchResults }: CategoryPropsTypes) {
  const [selectedCategory, setSelectedCategory] = useState<number[]>([
    ...CATEGORIES_ID_LIST
  ]);

  const [filteredDestinations, setFilteredDestinations] = useState<
    DestinationsType[] | []
  >([]);

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
    const { value } = e.target as HTMLButtonElement;
    const targetCategoryId = Number(value);

    selectedCategory.includes(targetCategoryId)
      ? removeCategoryFromSelectedCategoryList(targetCategoryId)
      : addCategoryToSelectedCategoryList(targetCategoryId);
  };

  const handleAllClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    return isSelectedAll
      ? setSelectedCategory([])
      : setSelectedCategory(CATEGORIES_ID_LIST);
  };

  const getCategorizedDestinationsData = useCallback(async () => {
    const res = await getDestinationsListByCategoryId(selectedCategory);
    const categorizedDestinationsList = res.data;
    setFilteredDestinations(() => categorizedDestinationsList);
  }, [selectedCategory]);

  useEffect(() => {
    getCategorizedDestinationsData();
  }, [getCategorizedDestinationsData]);

  useEffect(() => {
    if (searchResults.length > 0) {
      const newDestinations = filteredDestinations.filter(
        (destination) => destination.title === searchResults[0].title
      );
      setFilteredDestinations(() => newDestinations);
    }
  }, [selectedCategory]);

  return (
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
      <Destinations filteredDestinations={filteredDestinations} />
    </>
  );
}

export default Category;
