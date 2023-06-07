import React, { useMemo, useState } from 'react';
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
  const [dateInfo, setDateInfo] = useState({
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
    dateInfo,
    isPublic
  }: ScheduleEditSubmitType) => {
    console.log({ ...dateInfo, updatedTitle, updatedSummary, isPublic });
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

  return (
    <div className={styles.container}>
      <Link to='/schedule/detail' className={styles.backButton}>
        <FaArrowLeft />
        돌아가기
      </Link>
      <ImageScheduleEdit image={image} />
      <DateScheduleEdit dateInfo={dateInfo} handleDateInfo={setDateInfo} />
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
      <Link to='/destination/list'>새로운 목적지 추가하기</Link>
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
            handleSubmit({ updatedTitle, updatedSummary, dateInfo, isPublic })
          }
        >
          수정완료
        </button>
      </div>
    </div>
  );
}

export default ScheduleEdit;
