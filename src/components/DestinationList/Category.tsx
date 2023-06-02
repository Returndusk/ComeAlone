import React, { useEffect, useState } from 'react';
import { DestinationsType } from './Types';
import Destinations from './Destinations';
import styles from './Category.module.scss';

type CategoryPropsType = {
  destinations: DestinationsType[] | [];
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

function Category({ destinations }: CategoryPropsType) {
  const totalCategoriesIdArray = Array.from(CATEGORIES_ID.keys());
  const [selectedCategoryId, setSelectedCategoryId] = useState<number[]>([
    ...totalCategoriesIdArray
  ]);
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(true);
  const [filteredDestinations, setFilteredDestinations] =
    useState(destinations);

  useEffect(() => {
    setFilteredDestinations(() => destinations);
  }, [destinations]);

  const handleCategoryClick: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    const { value } = e.target as HTMLButtonElement;
    const clickedCategoryId = Number(value);
    switch (selectedCategoryId.includes(clickedCategoryId)) {
      case true: {
        const subClickedCategory = selectedCategoryId.filter(
          (categoryId) => categoryId !== clickedCategoryId
        );
        setSelectedCategoryId(subClickedCategory);
        break;
      }
      case false: {
        const addClickedCategory = [...selectedCategoryId, clickedCategoryId];
        setSelectedCategoryId(addClickedCategory);
        break;
      }
    }
  };

  // 단일 카테고리을 선택하여 상태가 변경된 경우

  useEffect(() => {
    if (
      isSelectedAll &&
      selectedCategoryId.length === totalCategoriesIdArray.length - 1
      // 1은 전체를 선택한 상태에서 단일 카테고리 하나(1)를 클릭하여 선택을 해제했을 경우를 의미함.
    ) {
      setIsSelectedAll(false);
      //단일 카테고리 하나를 해제했기 때문에 전체 선택 = false가 됨.
    }
  }, [selectedCategoryId]);

  const handleAllClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsSelectedAll(!isSelectedAll);
  };

  //전체 카테고리를 선택하여 상태가 변경된 경우
  useEffect(() => {
    switch (isSelectedAll) {
      case true: {
        const newSelectedCategory =
          selectedCategoryId.length !== totalCategoriesIdArray.length
            ? totalCategoriesIdArray
            : selectedCategoryId;
        setSelectedCategoryId(newSelectedCategory);
        break;
      }
      case false: {
        if (selectedCategoryId.length === totalCategoriesIdArray.length)
          return setSelectedCategoryId([]);
        break;
      }
    }
  }, [isSelectedAll]);

  useEffect(() => {
    const filteredDestinationsList = destinations.filter((destination) =>
      selectedCategoryId.includes(Number(destination.contenttypeid))
    );
    setFilteredDestinations(() => filteredDestinationsList);
  }, [selectedCategoryId]);

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
        {totalCategoriesIdArray.map((categoryId, index) => (
          <button
            key={index}
            value={categoryId}
            onClick={handleCategoryClick}
            className={
              selectedCategoryId.includes(categoryId)
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
