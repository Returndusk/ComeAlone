import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../components/ScheduleEdit/ScheduleEdit.module.scss';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ImageScheduleEdit from '../components/ScheduleEdit/ImageScheduleEdit';
import DateScheduleEdit from '../components/ScheduleEdit/DateScheduleEdit';
import InfoScheduleEdit from '../components/ScheduleEdit/InfoScheduleEdit';
import DestinationList from '../components/ScheduleEdit/DestinationList';
import { schedule, destinations } from '../components/ScheduleEdit/Dummy';

function ScheduleEdit() {
  const [dateInfo, setDateInfo] = useState({
    startDate: schedule.startDate,
    endDate: schedule.endDate,
    duration: schedule.duration
  });
  const [isPublic, setIsPublic] = useState(schedule.isPublic);
  const [title, setTitle] = useState(schedule.title);
  const [description, setDescription] = useState(schedule.summary);
  const [checkedDestinations, setCheckedDestinations] = useState(
    destinations.flat()
  );

  const onDestinationsChecked = (destinations: string[]) => {
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

  return (
    <div className={styles.container}>
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
      <DestinationList
        destinations={destinations}
        onChecked={onDestinationsChecked}
      />
      <div className={styles.map}>
        {checkedDestinations.map((dest, index) => (
          <div key={index}>{dest}</div>
        ))}
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
