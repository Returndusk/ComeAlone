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
  const [selectedCategory, setSelectedCategory] = useState<number[]>([
    ...totalCategoriesIdArray
  ]);
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(true);
  const [filteredDestinations, setFilteredDestinations] =
    useState(destinations);

  //단일 카테고리 디버깅
  useEffect(() => {
    console.log(selectedCategory, 'selectedCategory 변경');
  }, [selectedCategory]);

  //전체 카테고리 선택여부 디버깅
  useEffect(() => {
    console.log(isSelectedAll, 'isSelectedAll 변경');
  }, [isSelectedAll]);

  //필터링 목록 디버깅
  useEffect(() => {
    console.log(filteredDestinations, 'filteredDestinations 변경');
  }, [filteredDestinations]);

  useEffect(() => {
    setFilteredDestinations(() => destinations);
  }, [destinations]);

  const handleCategoryClick: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    const { value } = e.target as HTMLButtonElement;
    const valueToNumber = Number(value);
    if (selectedCategory.includes(valueToNumber)) {
      const subSelectedCategory = selectedCategory.filter(
        (categoryId) => categoryId !== valueToNumber
      );
      setSelectedCategory(subSelectedCategory);
      return;
    }
    const addCategory = [...selectedCategory, valueToNumber];
    setSelectedCategory(addCategory);
  };

  const handleAllClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsSelectedAll(!isSelectedAll);
  };

  // 단일 카테고리을 선택하여 상태가 변경된 경우
  useEffect(() => {
    if (
      isSelectedAll &&
      selectedCategory.length === totalCategoriesIdArray.length - 1
      // 1은 전체를 선택한 상태에서 단일 카테고리 하나를 클릭하여 선택을 해제한 경우를 의미함.
    ) {
      setIsSelectedAll(false);
      //단일 카테고리 하나를 해제했기 때문에 전체 선택 = false가 됨.
    }
    if (selectedCategory.length !== totalCategoriesIdArray.length) {
      setIsSelectedAll(false);
    }
  }, [selectedCategory]);

  //전체 카테고리를 선택하여 상태가 변경된 경우
  useEffect(() => {
    if (
      !isSelectedAll &&
      selectedCategory.length === totalCategoriesIdArray.length
    ) {
      setSelectedCategory([]);
      return;
    }
    if (
      !isSelectedAll &&
      selectedCategory.length !== totalCategoriesIdArray.length
    ) {
      return;
    }
    const newSelectedCategory =
      selectedCategory.length !== totalCategoriesIdArray.length
        ? totalCategoriesIdArray
        : selectedCategory;
    setSelectedCategory(newSelectedCategory);
    return;
  }, [isSelectedAll]);

  useEffect(() => {
    const filteredDestinationsList = destinations.filter((destination) =>
      selectedCategory.includes(Number(destination.contenttypeid))
    );
    setFilteredDestinations(() => filteredDestinationsList);
  }, [selectedCategory]);

  return (
    <>
      <div>
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
