import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const getAllDestinationsList = async () => {
  try {
    const response = await axios.get(`${baseUrl}/destinations`);
    return response;
  } catch (error) {
    console.error(error, '전체 목적지 리스트 정보를 받아오는데 실패했습니다.');
  }
};

export const getDestinationsListByCategoryId = async (
  selectedCategory: number[]
) => {
  const categryIdLists = selectedCategory.join();
  const response = await axios.get(
    `${baseUrl}/categories/destinations?categoryIds=${categryIdLists}`
  );
  return response;
};

export const getDestinationDetailsByDestinationId = async (
  destinationId: number
) => {
  const response = await axios.get(`${baseUrl}/destinations/${destinationId}`);
  return response;
};
