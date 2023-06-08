import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function getScheduleDetailById(id: number) {
  try {
    const response = await axios.get(`${baseUrl}/schedules/${id}`);

    return response;
  } catch (err) {
    console.log(err);
  }
}
