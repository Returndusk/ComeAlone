import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../components/ScheduleEdit/ScheduleEdit.module.scss';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {
  ImageScheduleEdit,
  DateScheduleEdit,
  InfoScheduleEdit,
  DestinationList
} from '../components/ScheduleEdit';
import { schedule, destinations } from '../components/ScheduleEdit/Dummy';

function ScheduleEdit() {
  const [startDate, setStartDate] = useState(schedule.startDate);
  const [endDate, setEndDate] = useState(schedule.endDate);
  const [duration, setDuration] = useState(schedule.duration);
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
    startDate: Date,
    endDate: Date,
    duration: string,
    isPublic: boolean
  ) => {
    console.log({ title, description, startDate, endDate, duration, isPublic });
  };

  return (
    <div className={styles.container}>
      <ImageScheduleEdit image={schedule.image} />
      <DateScheduleEdit
        duration={duration}
        startDate={startDate}
        endDate={endDate}
        handleStartDate={setStartDate}
        handleEndDate={setEndDate}
        handleDuration={setDuration}
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
          onClick={() =>
            onSubmit(title, description, startDate, endDate, duration, isPublic)
          }
        >
          수정완료
        </button>
      </div>
    </div>
  );
}

export default ScheduleEdit;
