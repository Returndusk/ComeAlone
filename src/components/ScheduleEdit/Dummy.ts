import { ScheduleEditFetchedType } from '../../types/ScheduleEditTypes';

export const defaultSchedule: ScheduleEditFetchedType = {
  nickname: '',
  title: '',
  summary: '',
  duration: 0,
  startDate: new Date(),
  endDate: new Date(),
  image: '',
  createdAt: new Date(),
  status: 'PUBLIC',
  destinations: [[]]
};
