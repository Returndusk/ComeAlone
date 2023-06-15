import { IScheduleDetail } from './ScheduleDetailTypes';

export type ScheduleEditFetchedType = Pick<
  IScheduleDetail,
  | 'userId'
  | 'title'
  | 'summary'
  | 'startDate'
  | 'endDate'
  | 'duration'
  | 'createdAt'
  | 'updatedAt'
  | 'destinations'
  | 'image'
  | 'status'
>;

export type DateInfoType = Pick<
  IScheduleDetail,
  'startDate' | 'endDate' | 'duration'
>;

export type DateSelectionType = {
  startDate: Date;
  endDate: Date;
  key: string;
};

export type ScheduleEditInfoType = Pick<IScheduleDetail, 'createdAt'> & {
  updatedTitle: string;
  updatedSummary: string;
  createdAt: Date;
  updatedAt: Date;
  onTitleUpdate: (title: string) => void;
  onSummaryUpdate: (title: string) => void;
};

export type ScheduleEditSubmitType = {
  schedule_id: number;
  title: string;
  summary: string;
  duration: number;
  start_date: string;
  end_date: string;
  status: string;
  image: string;
  destinations: number[][];
};
