import axios from 'axios';
import tokenInstance from './tokenInstance';

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
  try {
    const categryIdLists = selectedCategory.join();
    const response = await axios.get(
      `${baseUrl}/categories/destinations?categoryIds=${categryIdLists}`
    );
    return response;
  } catch (error) {
    console.error(
      error,
      '카테고리별 목적지 리스트 정보를 받아오는데 실패했습니다.'
    );
  }
};

export const getDestinationDetailsByDestinationId = async (
  destinationId: number
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/destinations-with-reviews/${destinationId}`
    );
    return response;
  } catch (error) {
    console.error(error, '목적지별 상세정보를 받아오는데 실패했습니다.');
  }
};

export const getRankedDestinationsByRankingNumber = async (
  rankingNumber: number
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/ranking/destinations?count=${rankingNumber}`
    );
    return response;
  } catch (error) {
    console.error(
      error,
      '좋아요가 높은 목적지 리스트를 받아오는데 실패했습니다.'
    );
  }
};

export const postPreferredDestinationsByDestinationId = async (
  destinationId: number
) => {
  try {
    const response = await tokenInstance.post(
      `${baseUrl}/destinations/${destinationId}/likes`,
      destinationId
    );
    return response;
  } catch (error) {
    console.error(error, '목적지 좋아요 설정/해제를 실패했습니다.');
  }
};
