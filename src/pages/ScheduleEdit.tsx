import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../components/ScheduleEdit/ScheduleEdit.module.scss';
import ImageScheduleEdit from '../components/ScheduleEdit/ImageScheduleEdit';
import DateScheduleEdit from '../components/ScheduleEdit/DateScheduleEdit';
import PublicStatusScheduleEdit from '../components/ScheduleEdit/PublicStatusScheduleEdit';
import InfoScheduleEdit from '../components/ScheduleEdit/InfoScheduleEdit';
import EditDestinationList from '../components/ScheduleEdit/EditDestinationList';
import DestinationsMap from '../components/ScheduleEdit/DestinationsMap';
import ButtonsScheduleEdit from '../components/ScheduleEdit/ButtonsScheduleEdit';
import DateModalScheduleEdit from '../components/ScheduleEdit/DateModalScheduleEdit';
import { MapWithWaypointsPropsType } from '../types/DestinationListTypes';
import {
  ScheduleEditFetchedType,
  DateInfoType
} from '../types/ScheduleEditTypes';
import { getScheduleDetailById } from '../apis/ScheduleDetailAPI';
import { updateSchedule } from '../apis/ScheduleEditAPI';
import AlertModal from '../components/common/Alert/AlertModal';
import ROUTER from '../constants/Router';

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

function ScheduleEdit() {
  const scheduleId: string = useParams().scheduleId as string;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const [showTitleEmptyAlert, setShowTitleEmptyAlert] =
    useState<boolean>(false);
  const [showSummaryEmptyAlert, setShowSummaryEmptyAlert] =
    useState<boolean>(false);
  const [updatedDateInfo, setUpdatedDateInfo] = useState<DateInfoType>({
    startDate: new Date(),
    endDate: new Date(),
    duration: 0
  });
  const [updatedStatus, setUpdatedStatus] = useState<string>('');
  const [updatedDestinationList, setUpdatedDestinationList] = useState<
    MapWithWaypointsPropsType[][]
  >([]);
  const [checkedDayIndex, setCheckedDayIndex] = useState<number>(-1);
  const updatedImagePath = useRef<string>('');
  const updatedTitle = useRef<string>('');
  const updatedSummary = useRef<string>('');
  const createdAt = useRef<Date>(new Date());

  const getScheduleDetail = useCallback(
    async (scheduleId: string) => {
      const response = await getScheduleDetailById(scheduleId);

      const data: ScheduleEditFetchedType = {
        title: response?.data.title,
        summary: response?.data.summary,
        duration: response?.data.duration,
        startDate: new Date(response?.data.start_date),
        endDate: new Date(response?.data.end_date),
        image: response?.data.image,
        createdAt: new Date(response?.data.created_at.split('T')[0]),
        status: response?.data.status,
        destinations: response?.data.destinationMaps
      };

      return data;
    },
    [scheduleId]
  );

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getScheduleDetail(scheduleId);

      setUpdatedDateInfo({
        startDate: fetchedData.startDate,
        endDate: fetchedData.endDate,
        duration: fetchedData.duration
      });
      updatedImagePath.current = fetchedData.image;
      updatedTitle.current = fetchedData.title;
      updatedSummary.current = fetchedData.summary;
      createdAt.current = fetchedData.createdAt;
      setUpdatedStatus(fetchedData.status);
      setUpdatedDestinationList(fetchedData.destinations);
      setIsLoading(false);
    };

    fetchData();
  }, [getScheduleDetail]);

  useEffect(() => {
    const prevDuration = updatedDestinationList.length;
    const updatedDuration = updatedDateInfo.duration;

    if (prevDuration < updatedDuration) {
      const newUpdatedDestinationList = [...updatedDestinationList];

      for (let i = 0; i < updatedDuration - prevDuration; i++) {
        newUpdatedDestinationList.push([]);
      }

      setUpdatedDestinationList(newUpdatedDestinationList);
    } else if (prevDuration > updatedDuration) {
      setUpdatedDestinationList(
        updatedDestinationList.slice(0, updatedDuration)
      );
    }
  }, [updatedDestinationList, updatedDateInfo.duration]);

  const markersLocations = useMemo(() => {
    if (checkedDayIndex === -1) {
      return updatedDestinationList.flat();
    } else {
      return JSON.parse(JSON.stringify(updatedDestinationList))[
        checkedDayIndex
      ];
    }
  }, [checkedDayIndex, updatedDestinationList]);

  const handleImageUpdate = (imagePath: string) => {
    updatedImagePath.current = imagePath;
  };

  const handleTitleUpdate = (title: string) => {
    updatedTitle.current = title;
  };

  const handleSummaryUpdate = (summary: string) => {
    updatedSummary.current = summary;
  };

  const handleSubmit = () => {
    if (!updatedTitle.current) {
      setShowTitleEmptyAlert(true);
    } else if (!updatedSummary.current) {
      setShowSummaryEmptyAlert(true);
    } else {
      handleSubmitConfirm();
    }
  };

  const handleSubmitConfirm = async () => {
    await updateSchedule({
      schedule_id: Number(scheduleId),
      title: updatedTitle.current,
      summary: updatedSummary.current,
      duration: updatedDateInfo.duration,
      start_date: stringifyDate(updatedDateInfo.startDate),
      end_date: stringifyDate(updatedDateInfo.endDate),
      status: updatedStatus,
      image: updatedImagePath.current,
      destinations: mapDestinationId(updatedDestinationList)
    });

    navigate(`${ROUTER.SCHEDULE_DETAIL}/${scheduleId}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <ImageScheduleEdit
        imagePath={updatedImagePath.current}
        onImageUpdate={handleImageUpdate}
      />
      <DateScheduleEdit
        dateInfo={updatedDateInfo}
        onOpenModal={() => setShowDateModal(true)}
      />
      <PublicStatusScheduleEdit
        updatedStatus={updatedStatus}
        onStatusUpdate={setUpdatedStatus}
      />
      <InfoScheduleEdit
        updatedTitle={updatedTitle.current}
        updatedSummary={updatedSummary.current}
        createdAt={createdAt.current}
        onTitleUpdate={handleTitleUpdate}
        onSummaryUpdate={handleSummaryUpdate}
      />
      <EditDestinationList
        updatedDestinationList={updatedDestinationList}
        checkedDayIndex={checkedDayIndex}
        onDestinationListUpdate={setUpdatedDestinationList}
        onCheckedDayIndexUpdate={setCheckedDayIndex}
      />
      <DestinationsMap markersLocations={markersLocations} />
      <ButtonsScheduleEdit scheduleId={scheduleId} onSubmit={handleSubmit} />
      <DateModalScheduleEdit
        openModal={showDateModal}
        dateInfo={updatedDateInfo}
        onDateInfoUpdate={setUpdatedDateInfo}
        onModalClose={() => setShowDateModal(false)}
      />
      {showTitleEmptyAlert && (
        <AlertModal
          message='수정하실 제목을 입력해주세요.'
          onConfirm={() => setShowTitleEmptyAlert(false)}
        />
      )}
      {showSummaryEmptyAlert && (
        <AlertModal
          message='수정하실 일정 소개를 입력해주세요.'
          onConfirm={() => setShowSummaryEmptyAlert(false)}
        />
      )}
    </div>
  );
}

export default ScheduleEdit;
