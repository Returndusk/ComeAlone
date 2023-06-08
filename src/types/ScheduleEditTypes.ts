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

export type ScheduleEditInfoType = Pick<
  IScheduleDetail,
  'nickname' | 'createdAt'
> & {
  updatedTitle: string;
  updatedSummary: string;
  onTitleUpdate: Dispatch<SetStateAction<string>>;
  onSummaryUpdate: Dispatch<SetStateAction<string>>;
};

export type ScheduleEditDestinationListType = {
  updatedDestinationList: MapWithWaypointsPropsType[][];
  checkedDayIndex: number;
  onDestinationListUpdate: Dispatch<
    SetStateAction<MapWithWaypointsPropsType[][]>
  >;
  onCheckedDayIndexUpdate: Dispatch<SetStateAction<number>>;
};

export type ScheduleEditSubmitType = {
  updatedTitle: string;
  updatedSummary: string;
  updatedDateInfo: DateInfoType;
  updatedDestinationList: MapWithWaypointsPropsType[][];
  updatedStatus: string;
};
