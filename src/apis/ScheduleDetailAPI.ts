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

export async function getDoesUserLikedById(id: string | undefined) {
  try {
    const response = await tokenInstance.get(
      `${baseUrl}/schedules/${id}/likes`
    );

    return response;
  } catch (err) {
    console.log(err);
  }
}
