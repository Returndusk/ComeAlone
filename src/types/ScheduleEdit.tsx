import { Dispatch, SetStateAction } from 'react';

export type DateInfoType = {
  startDate: Date;
  endDate: Date;
  duration: string;
};

export type DateSelectionType = {
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  key?: string | undefined;
};

export type InfoScheduleEditType = {
  title: string;
  writer: string;
  date: string;
  description: string;
  handleTitle: Dispatch<SetStateAction<string>>;
  handleDescription: Dispatch<SetStateAction<string>>;
};

export type ScheduleEditSubmitType = {
  title: string;
  description: string;
  dateInfo: DateInfoType;
  isPublic: boolean;
};
