export type ModalMyScheduleType = {
  schedule_id: number;
  title: string;
  summary: string;
  start_date: string;
  end_date: string;
  created_at: string;
  destinations: string[][];
  destinationIds: number[][];
  image: string;
};

export type MyScheduleListType = ModalMyScheduleType[];

export type ModalScheduleCardType = {
  schedule: ModalMyScheduleType;
  index: number;
  isSelected: boolean;
  onShowDestinations: (index: number) => void;
  // onCloseDestinations: () => void;
  scheduleId: number;
};

export type AddToScheduleModalType = {
  // schedule: ModalMyScheduleType;
  selectedDay: number;
  scheduleId: number;
  destinations: string[][];
  destinationIds: number[][];

  // onDestinationUpdate: (updatedDestination: string[]) => void;
  // updatedDestinations: string[][];
};
