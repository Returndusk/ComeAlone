import React, { useEffect, useState } from 'react';
import styles from './ModalScheduleLists.module.scss';
import ModalScheduleCard from './ModalScheduleCard';
import {
  ModalMyScheduleType,
  ModalScheduleCardType,
  MyScheduleListType
} from '../../../types/ModalScheduleTypes';
import tokenInstance from '../../../apis/tokenInstance';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

async function getMyScheduleLists() {
  const response = await tokenInstance.get<MyScheduleListType>(
    `${baseUrl}/users/me/schedules`
  );
  const data = response.data;
  // console.log(data);
  return data;
}

export default function ModalScheduleLists() {
  const [scheduleLists, setScheduleLists] = useState<ModalScheduleCardType[]>(
    []
  );
  const [showScheduleList, setShowScheduleList] = useState<
    ModalMyScheduleType[]
  >([]);
  const [scheduleSort, setScheduleSort] = useState<string>('upcoming');
  const [selectedCardIdx, setSelectedCardIdx] = useState<number | null>(null);
  const navigate = useNavigate();

  function MoveToMySchedule() {
    navigate('/myschedule/list');
  }

  // console.log('scheduleLists', scheduleLists);
  // console.log('showScheduleList', showScheduleList);

  useEffect(() => {
    async function getScheduleLists() {
      try {
        const data = await getMyScheduleLists();
        console.log(data);
        setScheduleLists(
          data.map((schedule, index) => ({
            schedule,
            index,
            isSelected: selectedCardIdx === index,
            onShowDestinations: handleShowDestinations,
            // onShowDestinations: onShowDestinations,
            scheduleId: schedule.schedule_id
          }))
        );
      } catch (err) {
        console.error('Error: ', err);
      }
    }

    getScheduleLists();
  }, [selectedCardIdx]);

  useEffect(() => {
    sortSchedule(scheduleSort);
  }, [scheduleSort, scheduleLists]);

  // console.log(scheduleLists);

  function handleSort(e: React.MouseEvent<HTMLButtonElement>) {
    const sortOption = (e.target as HTMLButtonElement).value;
    setScheduleSort(sortOption);
  }

  function sortUpcoming(scheduleData: ModalMyScheduleType[]) {
    return scheduleData
      .filter((schedule: ModalMyScheduleType) => {
        const today = new Date();
        const end_date = new Date(schedule.end_date);
        end_date.setDate(end_date.getDate() + 1);
        end_date.setHours(0);
        return today < end_date;
      })
      .sort(
        (a, b) =>
          new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
      );
  }

  function sortPast(scheduleData: ModalMyScheduleType[]) {
    return scheduleData
      .filter((schedule: ModalMyScheduleType) => {
        const today = new Date();
        const end_date = new Date(schedule.end_date);
        end_date.setDate(end_date.getDate() + 1);
        end_date.setHours(0);
        return today > end_date;
      })
      .sort(
        (a, b) =>
          new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
      );
  }

  function sortSchedule(sortOption: string) {
    // const scheduleData = [...scheduleLists];
    const scheduleData = scheduleLists.map((item) => item.schedule);
    if (sortOption === 'upcoming') {
      setShowScheduleList(sortUpcoming(scheduleData));
    } else {
      setShowScheduleList(sortPast(scheduleData));
    }
  }

  function handleShowDestinations(day: number) {
    if (selectedCardIdx === day) {
      setSelectedCardIdx(null);
    } else {
      setSelectedCardIdx(day);
    }
  }
  // console.log(selectedCardIdx);

  return (
    <div className={styles.scheduleContainer}>
      <div className={styles.scheduleFilter}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            '& > *': {
              m: 1
            }
          }}
        >
          <ButtonGroup variant='outlined' aria-label='outlined button group'>
            <Button
              className={`${styles.sortButton} ${
                scheduleSort === 'upcoming' ? styles.selected : ''
              }`}
              onClick={(e) => {
                handleSort(e);
              }}
              value='upcoming'
              sx={{
                color: '#ef6d00',
                fontWeight: '600',
                border: 1,
                borderColor: '#ef6d00',
                '&:hover': {
                  color: '#ffffff',
                  backgroundColor: '#ef6d00',
                  border: 1,
                  borderColor: '#ef6d00'
                }
              }}
            >
              다가오는 일정
            </Button>
            <Button
              className={`${styles.sortButton} ${
                scheduleSort === 'past' ? styles.selected : ''
              }`}
              onClick={(e) => {
                handleSort(e);
              }}
              value='past'
              sx={{
                color: '#ef6d00',
                fontWeight: '600',
                border: 1,
                borderColor: '#ef6d00',
                '&:hover': {
                  color: '#ffffff',
                  backgroundColor: '#ef6d00',
                  border: 1,
                  borderColor: '#ef6d00'
                }
              }}
            >
              지난 일정
            </Button>
          </ButtonGroup>
          <Stack spacing={2} direction='row'>
            <Button
              variant='contained'
              className={styles.addScheduleBtn}
              onClick={MoveToMySchedule}
              sx={{
                color: '#ffffff',
                fontWeight: '600',
                backgroundColor: '#ef6d00',
                border: 1,
                borderColor: '#ef6d00',
                '&:hover': {
                  color: '#ffffff',
                  backgroundColor: '#ef6d00'
                }
              }}
            >
              새로운 일정 만들기
            </Button>
          </Stack>
        </Box>
        {/* 필터 div */}
      </div>
      <div className={styles.scheduleCardContainer}>
        {showScheduleList.map((scheduleList, index) => (
          <ModalScheduleCard
            key={scheduleList.schedule_id}
            schedule={scheduleList}
            index={index}
            isSelected={selectedCardIdx === index}
            onShowDestinations={handleShowDestinations}
            // onCloseDestinations={handleCloseDestinations}
            scheduleId={scheduleList.schedule_id}
          />
        ))}
      </div>
    </div>
  );
}
