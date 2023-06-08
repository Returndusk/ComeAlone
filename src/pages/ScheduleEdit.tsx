import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../components/ScheduleEdit/ScheduleEdit.module.scss';
import ImageScheduleEdit from '../components/ScheduleEdit/ImageScheduleEdit';
import DateScheduleEdit from '../components/ScheduleEdit/DateScheduleEdit';
import PublicStatusScheduleEdit from '../components/ScheduleEdit/PublicStatusScheduleEdit';
import InfoScheduleEdit from '../components/ScheduleEdit/InfoScheduleEdit';
import EditDestinationList from '../components/ScheduleEdit/EditDestinationList';
import MapWithWaypoints from '../components/common/Map/MapWithWaypoints';
import { schedule } from '../components/ScheduleEdit/Dummy';
import { FaArrowLeft } from 'react-icons/fa';
import {
  ScheduleEditFetchedType,
  ScheduleEditSubmitType
} from '../types/ScheduleEditTypes';
import { getScheduleDetailById } from '../apis/ScheduleDetailAPI';

import ROUTER from '../constants/Router';

function ScheduleEdit() {
  const { scheduleId } = useParams();
  const [scheduleFetched, setScheduleFetched] =
    useState<ScheduleEditFetchedType>(schedule);
  const [updatedDateInfo, setUpdatedDateInfo] = useState({
    startDate: schedule.startDate,
    endDate: schedule.endDate,
    duration: schedule.duration
  });
  const [updatedTitle, setUpdatedTitle] = useState(schedule.title);
  const [updatedSummary, setUpdatedSummary] = useState(schedule.summary);
  const [updatedStatus, setUpdatedStatus] = useState(schedule.status);
  const [updatedDestinationList, setUpdatedDestinationList] = useState(
    schedule.destinations
  );
  const [checkedDayIndex, setCheckedDayIndex] = useState(-1);

  const getScheduleEdit = useCallback(async (id: string | undefined) => {
    const response = await getScheduleDetailById(id);

    const data = {
      nickname: response?.data.user.nickname,
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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getScheduleEdit(scheduleId);

      setScheduleFetched(data);
      setUpdatedDateInfo({
        startDate: data.startDate,
        endDate: data.endDate,
        duration: data.duration
      });
      setUpdatedTitle(data.title);
      setUpdatedSummary(data.summary);
      setUpdatedStatus(data.status);
      setUpdatedDestinationList(data.destinations);

      console.log(data);
    };

    fetchData();
  }, []);

  const handleSubmit = ({
    updatedTitle,
    updatedSummary,
    updatedDateInfo,
    updatedDestinationList,
    updatedStatus
  }: ScheduleEditSubmitType) => {
    console.log({
      ...updatedDateInfo,
      updatedTitle,
      updatedSummary,
      updatedDestinationList,
      updatedStatus
    });
  };

  const markersLocations = useMemo(() => {
    if (checkedDayIndex === -1) {
      return updatedDestinationList.flat();
    } else {
      return JSON.parse(JSON.stringify(updatedDestinationList))[
        checkedDayIndex
      ];
    }
  }, [checkedDayIndex, updatedDestinationList]);

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
  }, [updatedDateInfo.duration]);

  return (
    <div className={styles.container}>
      <Link to={ROUTER.SCHEDULE_DETAIL} className={styles.backButton}>
        <FaArrowLeft />
        돌아가기
      </Link>
      <ImageScheduleEdit image={scheduleFetched.image} />
      <DateScheduleEdit
        dateInfo={updatedDateInfo}
        onDateInfoUpdate={setUpdatedDateInfo}
      />
      <PublicStatusScheduleEdit
        updatedStatus={updatedStatus}
        onStatusUpdate={setUpdatedStatus}
      />
      <InfoScheduleEdit
        updatedTitle={updatedTitle}
        nickname={scheduleFetched.nickname}
        createdAt={scheduleFetched.createdAt}
        updatedSummary={updatedSummary}
        onTitleUpdate={setUpdatedTitle}
        onSummaryUpdate={setUpdatedSummary}
      />
      <EditDestinationList
        updatedDestinationList={updatedDestinationList}
        checkedDayIndex={checkedDayIndex}
        onDestinationListUpdate={setUpdatedDestinationList}
        onCheckedDayIndexUpdate={setCheckedDayIndex}
      />
      <div className={styles.mapContainer}>
        <MapWithWaypoints markersLocations={markersLocations} />
      </div>
      <div className={styles.confirmButtonWrapper}>
        <button
          onClick={() =>
            handleSubmit({
              updatedTitle,
              updatedSummary,
              updatedDateInfo,
              updatedDestinationList,
              updatedStatus
            })
          }
        >
          수정완료
        </button>
      </div>
    </div>
  );
}

export default ScheduleEdit;
