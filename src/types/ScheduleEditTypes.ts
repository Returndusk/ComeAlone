import { Dispatch, SetStateAction } from 'react';
import { IScheduleDetail } from './ScheduleDetailTypes';
import { MapWithWaypointsPropsType } from './DestinationListTypes';

export type DateInfoType = Pick<
  IScheduleDetail,
  'startDate' | 'endDate' | 'duration'
>;

export type DateSelectionType = {
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  key?: string | undefined;
};

export type ScheduleEditFetchedType = Pick<
  IScheduleDetail,
  | 'title'
  | 'summary'
  | 'nickname'
  | 'startDate'
  | 'endDate'
  | 'duration'
  | 'createdAt'
  | 'destinations'
  | 'image'
  | 'status'
>;

export type ScheduleEditPublicStatusPropsType = {
  updatedStatus: string;
  onStatusUpdate: Dispatch<SetStateAction<string>>;
};

export type ScheduleEditInfoType = Pick<IScheduleDetail, 'createdAt'> & {
  updatedTitle: string;
  updatedSummary: string;
  onTitleUpdate: (title: string) => void;
  onSummaryUpdate: (title: string) => void;
};

export type ScheduleEditDestinationListType = {
  updatedDestinationList: MapWithWaypointsPropsType[][];
  checkedDayIndex: number;
  onDestinationListUpdate: Dispatch<
    SetStateAction<MapWithWaypointsPropsType[][]>
  >;
  onCheckedDayIndexUpdate: Dispatch<SetStateAction<number>>;
};
