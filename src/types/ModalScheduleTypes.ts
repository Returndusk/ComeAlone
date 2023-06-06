import { MyScheduleCardType } from './ScheduleTypes';

export type ModalScheduleCardType = {
  schedule: MyScheduleCardType;
  index: number;
  isSelected: boolean;
  onShowDestinations: (index: number) => void;
  onCloseDestinations: () => void;
};
