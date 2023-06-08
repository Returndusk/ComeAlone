import axios from 'axios';
import tokenInstance from './tokenInstance';
import { commentType } from '../types/DestinationListTypes';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const getAllDestinationsList = async () => {
  try {
    const response = await axios.get(`${baseUrl}/destinations`);
    return response;
  } catch (error) {
    console.error(error, '전체 여행지 리스트 정보를 받아오는데 실패했습니다.');
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
      '카테고리별 여행지 리스트 정보를 받아오는데 실패했습니다.'
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
    console.error(error, '여행지별 상세정보를 받아오는데 실패했습니다.');
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
      '좋아요가 높은 여행지 리스트를 받아오는데 실패했습니다.'
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
    console.error(error, '여행지 좋아요 설정 및 해제에 실패했습니다.');
  }
};

export const getReviewByDestinationId = async (destinationId: number) => {
  try {
    const response = await axios.get(
      `${baseUrl}/destinations/${destinationId}/comments`
    );
    return response;
  } catch (error) {
    console.error(error, '여행지 리뷰 목록을 불러오는데 실패했습니다.');
  }
};

export const postReviewByDestinationId = async (
  destinationId: number,
  comment: commentType
) => {
  try {
    const response = await tokenInstance.post(
      `${baseUrl}/destinations/${destinationId}/comments`,
      comment
    );
    return response;
  } catch (error) {
    console.error(error, '여행지 리뷰 등록에 실패했습니다.');
  }
};

export const modifyReviewByDestinationId = async (
  commentId: number,
  comment: commentType
) => {
  try {
    const response = await tokenInstance.put(
      `${baseUrl}/destinations/comments/${commentId}`,
      comment
    );
    return response;
  } catch (error) {
    console.error(error, '여행지 리뷰 수정에 실패했습니다.');
  }
};

export const deleteReviewByDestinationId = async (commentId: number) => {
  try {
    const response = await tokenInstance.delete(
      `${baseUrl}/destinations/comments/${commentId}`
    );
    return response;
  } catch (error) {
    console.error(error, '여행지 리뷰 삭제에 실패했습니다.');
  }
};

export const getUsersReview = async () => {
  try {
    const response = await axios.get(`${baseUrl}/destinations/comments/me`);
    return response;
  } catch (error) {
    console.error(error, '유저의 여행지 리뷰 목록을 불러오는데 실패했습니다.');
  }
};
