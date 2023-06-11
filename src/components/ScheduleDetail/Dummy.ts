import { ScheduleFetchedType } from '../../types/ScheduleDetailTypes';

export const defaultSchedule: ScheduleFetchedType = {
  userId: '',
  nickname: '',
  title: '',
  summary: '',
  likesCount: 0,
  duration: 0,
  startDate: new Date(),
  endDate: new Date(),
  image: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  destinations: [[]]
};
