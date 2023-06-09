import tokenInstance from './tokenInstance';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function updateSchedule(updatedSchedule: any) {
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

export async function deleteScheduleById(id: string | undefined) {
  try {
    await tokenInstance.delete(`${baseUrl}/schedules/${id}`);
  } catch (err) {
    console.log(err);
  }
}
