import tokenInstance from './tokenInstance';
import { ScheduleEditSubmitType } from '../types/ScheduleEditTypes';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function updateSchedule(updatedSchedule: ScheduleEditSubmitType) {
  try {
    const response = await tokenInstance.put(
      `${baseUrl}/schedules`,
      updatedSchedule
    );

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function updateScheduleImageById(formData: FormData) {
  try {
    const response = await tokenInstance.post(
      `${baseUrl}/upload/schedules/image`,
      formData
    );

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteScheduleById(id: string) {
  try {
    await tokenInstance.delete(`${baseUrl}/schedules/${id}`);
  } catch (err) {
    console.log(err);
  }
}
