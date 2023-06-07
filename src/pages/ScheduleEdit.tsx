import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../components/ScheduleEdit/ScheduleEdit.module.scss';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ImageScheduleEdit from '../components/ScheduleEdit/ImageScheduleEdit';
import DateScheduleEdit from '../components/ScheduleEdit/DateScheduleEdit';
import InfoScheduleEdit from '../components/ScheduleEdit/InfoScheduleEdit';
import EditDestinationList from '../components/ScheduleEdit/EditDestinationList';
import MapWithWaypoints from '../components/common/Map/MapWithWaypoints';
import { scheduleFetched } from '../components/ScheduleEdit/Dummy';
import { FaArrowLeft } from 'react-icons/fa';
import { ScheduleEditSubmitType } from '../types/ScheduleEdit';
import ROUTER from '../constants/Router';

function ScheduleEdit() {
  const {
    nickname,
    title,
    summary,
    duration,
    startDate,
    endDate,
    image,
    createdAt,
    status,
    destinations
  } = scheduleFetched;
  const [updatedDateInfo, setUpdatedDateInfo] = useState({
    startDate,
    endDate,
    duration
  });
  const [isPublic, setIsPublic] = useState(status);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedSummary, setUpdatedSummary] = useState(summary);
  const [updatedDestinationList, setUpdatedDestinationList] =
    useState(destinations);
  const [checkedDayIndex, setCheckedDayIndex] = useState(-1);

  const handleSubmit = ({
    updatedTitle,
    updatedSummary,
    updatedDateInfo,
    updatedDestinationList,
    isPublic
  }: ScheduleEditSubmitType) => {
    console.log({
      ...updatedDateInfo,
      updatedTitle,
      updatedSummary,
      updatedDestinationList,
      isPublic
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
    const updatedDuration = Number(updatedDateInfo.duration);

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
      <ImageScheduleEdit image={image} />
      <DateScheduleEdit
        dateInfo={updatedDateInfo}
        onDateInfoUpdate={setUpdatedDateInfo}
      />
      <div className={styles.publicStatus}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={isPublic}
                onClick={() => setIsPublic((prev) => !prev)}
              />
            }
            label={isPublic ? '공개' : '비공개'}
          />
        </FormGroup>
      </div>
      <InfoScheduleEdit
        updatedTitle={updatedTitle}
        nickname={nickname}
        createdAt={createdAt}
        updatedSummary={updatedSummary}
        onTitleUpdate={setUpdatedTitle}
        onSummaryUpdate={setUpdatedSummary}
      />
      <Link to={ROUTER.DESTINATION_LIST}>새로운 목적지 추가하기</Link>
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
              isPublic
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
