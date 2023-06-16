import { useRef, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { ScheduleFetchedType } from '../types/ScheduleDetailTypes';
import {
  DateInfoType,
  ScheduleEditSubmitType
} from '../types/ScheduleEditTypes';
import { MapWithWaypointsPropsType } from '../types/DestinationListTypes';

function mapDestinationId(destinationList: MapWithWaypointsPropsType[][]) {
  return destinationList.map((destOfDay: MapWithWaypointsPropsType[]) =>
    destOfDay.map((dest: MapWithWaypointsPropsType) => dest.id)
  );
}

function stringifyDate(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function useScheduleEditForm() {
  const [isInitDataLoading, setIsInitDataLoading] = useState<boolean>(true);
  const [initScheduleEditForm, setInitScheduleEditForm] =
    useState<ScheduleFetchedType>();
  const [updatedTitle, setUpdatedTitle] = useState<string>(
    initScheduleEditForm?.title as string
  );
  const [updatedSummary, setUpdatedSummary] = useState<string>(
    initScheduleEditForm?.summary as string
  );
  const [updatedImagePath, setUpdatedImagePath] = useState<string>(
    initScheduleEditForm?.image as string
  );
  const [updatedDateInfo, setUpdatedDateInfo] = useState<DateInfoType>({
    startDate: initScheduleEditForm?.startDate as Date,
    endDate: initScheduleEditForm?.endDate as Date,
    duration: initScheduleEditForm?.duration as number
  });
  const [updatedStatus, setUpdatedStatus] = useState<string>(
    initScheduleEditForm?.status as string
  );
  const [updatedDestinationList, setUpdatedDestinationList] = useState<
    MapWithWaypointsPropsType[][]
  >(initScheduleEditForm?.destinations as MapWithWaypointsPropsType[][]);
  const scheduleId = useRef<number>(initScheduleEditForm?.scheduleId as number);

  const getUpdatedScheduleSubmitForm = () => {
    return {
      schedule_id: scheduleId.current,
      title: updatedTitle,
      summary: updatedSummary,
      duration: updatedDateInfo?.duration,
      start_date: stringifyDate(updatedDateInfo?.startDate as Date),
      end_date: stringifyDate(updatedDateInfo?.endDate as Date),
      status: updatedStatus,
      image: updatedImagePath,
      destinations: mapDestinationId(updatedDestinationList)
    };
  };

  useEffect(() => {
    if (!initScheduleEditForm) {
      return;
    }

    scheduleId.current = initScheduleEditForm.scheduleId;
    setUpdatedTitle(initScheduleEditForm?.title as string);
    setUpdatedSummary(initScheduleEditForm?.summary as string);
    setUpdatedImagePath(initScheduleEditForm?.image as string);
    setUpdatedDateInfo({
      startDate: initScheduleEditForm?.startDate as Date,
      endDate: initScheduleEditForm?.endDate as Date,
      duration: initScheduleEditForm?.duration as number
    });
    setUpdatedDestinationList(
      initScheduleEditForm?.destinations as MapWithWaypointsPropsType[][]
    );
    setUpdatedStatus(initScheduleEditForm?.status as string);
    setIsInitDataLoading(false);
  }, [initScheduleEditForm]);

  return [
    isInitDataLoading,
    updatedTitle,
    updatedSummary,
    updatedImagePath,
    updatedDateInfo,
    updatedDestinationList,
    updatedStatus,
    setInitScheduleEditForm,
    setUpdatedTitle,
    setUpdatedSummary,
    setUpdatedImagePath,
    setUpdatedDateInfo,
    setUpdatedDestinationList,
    setUpdatedStatus,
    getUpdatedScheduleSubmitForm
  ] as [
    boolean,
    string,
    string,
    string,
    DateInfoType,
    MapWithWaypointsPropsType[][],
    string,
    Dispatch<SetStateAction<ScheduleFetchedType>>,
    Dispatch<SetStateAction<string>>,
    Dispatch<SetStateAction<string>>,
    Dispatch<SetStateAction<string>>,
    Dispatch<SetStateAction<DateInfoType>>,
    Dispatch<SetStateAction<MapWithWaypointsPropsType[][]>>,
    Dispatch<SetStateAction<string>>,
    () => ScheduleEditSubmitType
  ];
}

export default useScheduleEditForm;
