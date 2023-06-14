import axios from 'axios';
import tokenInstance from './tokenInstance';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function getScheduleDetailById(id: string) {
  const response = await axios.get(`${baseUrl}/schedules/${id}`);

  return response;
}

export async function getDoesUserLikeById(id: string) {
  try {
    const response = await tokenInstance.get(
      `${baseUrl}/schedules/${id}/likes`
    );

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function toggleUserLikeById(id: string) {
  try {
    const response = await tokenInstance.post(
      `${baseUrl}/schedules/${id}/likes`
    );

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getScheduleReviewsById(id: string) {
  try {
    const response = await axios.get(`${baseUrl}/schedules/${id}/comments`);

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function addScheduleReviewById(id: string, review: string) {
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

export async function updateScheduleReviewById(id: number, review: string) {
  try {
    const response = await tokenInstance.put(
      `${baseUrl}/schedules/comments/${id}`,
      { comment: review }
    );

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteScheduleReviewById(id: number) {
  try {
    const response = await tokenInstance.delete(
      `${baseUrl}/schedules/comments/${id}`
    );

    return response;
  } catch (err) {
    console.log(err);
  }
}
