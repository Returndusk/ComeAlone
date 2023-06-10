import axios from 'axios';
import tokenInstance from './tokenInstance';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function getScheduleDetailById(id: string | undefined) {
  try {
    const response = await axios.get(`${baseUrl}/schedules/${id}`);

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getDoesUserLikeById(id: string | undefined) {
  try {
    const response = await tokenInstance.get(
      `${baseUrl}/schedules/${id}/likes`
    );

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function toggleUserLikeById(id: string | undefined) {
  try {
    const response = await tokenInstance.post(
      `${baseUrl}/schedules/${id}/likes`
    );

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getScheduleReviewsById(id: string | undefined) {
  try {
    const response = await axios.get(`${baseUrl}/schedules/${id}/comments`);

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function addScheduleReviewById(
  id: string | undefined,
  review: string
) {
  try {
    const response = await tokenInstance.post(
      `${baseUrl}/schedules/${id}/comments`,
      { comment: review }
    );

    return response;
  } catch (err) {
    console.log(err);
  }
}
