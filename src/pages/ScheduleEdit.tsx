import React, { useEffect, useState } from 'react';
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
import { schedule, destinations } from '../components/ScheduleEdit/Dummy';
import { DestinationsType } from '../types/DestinationListTypes';
import { FaArrowLeft } from 'react-icons/fa';

function ScheduleEdit() {
  const [dateInfo, setDateInfo] = useState({
    startDate: schedule.startDate,
    endDate: schedule.endDate,
    duration: schedule.duration
  });
  const [isPublic, setIsPublic] = useState(schedule.isPublic);
  const [title, setTitle] = useState(schedule.title);
  const [description, setDescription] = useState(schedule.summary);
  const [destinationList, setDestinationList] = useState(destinations);
  const [checkedDestinations, setCheckedDestinations] = useState(
    destinations.flat()
  );

  const onDestinationsChecked = (destinations: DestinationsType[]) => {
    setCheckedDestinations(destinations);
  };

  const onSubmit = (
    title: string,
    description: string,
    dateInfo: {
      startDate: Date;
      endDate: Date;
      duration: string;
    },
    isPublic: boolean
  ) => {
    console.log({ ...dateInfo, title, description, isPublic });
  };

  console.log(destinationList);

  return (
    <div className={styles.container}>
      <Link to='/schedule/detail' className={styles.backButton}>
        <FaArrowLeft />
        돌아가기
      </Link>
      <ImageScheduleEdit image={schedule.image} />
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
        title={title}
        writer={schedule.createdBy}
        date={schedule.createdAt}
        description={description}
        handleTitle={setTitle}
        handleDescription={setDescription}
      />
      <Link to='/destination/list'>새로운 목적지 추가하기</Link>
      <EditDestinationList
        destinations={destinationList}
        onChecked={onDestinationsChecked}
        handleDestinationList={setDestinationList}
      />
      <div className={styles.mapContainer}>
        <MapWithWaypoints markersLocations={checkedDestinations} />
      </div>
      <div className={styles.confirmButtonWrapper}>
        <button
          onClick={() => onSubmit(title, description, dateInfo, isPublic)}
        >
          수정완료
        </button>
      </div>
    </div>
  );
}

export default ScheduleEdit;
