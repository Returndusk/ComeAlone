import { MyScheduleCardType } from './ScheduleTypes';

export type ModalScheduleCardType = {
  schedule: MyScheduleCardType;
  index: number;
  isSelected: boolean;
  onShowDestinations: (index: number) => void;
  // onCloseDestinations: () => void;
};

export type AddToScheduleModalType = {
  destinations: string[];
  // onDestinationUpdate: (updatedDestination: string[]) => void;
};
