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
import { MdEventNote } from 'react-icons/md';
import { CiCircleAlert } from 'react-icons/ci';
import { createPortal } from 'react-dom';
import AlertModal from '../../common/Alert/AlertModal';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

async function getMyScheduleLists() {
  const response = await tokenInstance.get<MyScheduleListType>(
    `${baseUrl}/users/me/schedules`
  );
  const data = response.data;
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
  const [consoleAlert, setConsoleAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  const [scheduleDetailsDomRoot, setScheduleDetailsDomRoot] =
    useState<HTMLElement | null>(null);

  function MoveToMySchedule() {
    navigate('/myschedule/list');
  }

  useEffect(() => {
    setScheduleDetailsDomRoot(() =>
      document.getElementById('scheduleContainer')
    );
  }, []);

  useEffect(() => {
    async function getScheduleLists() {
      try {
        const data = await getMyScheduleLists();
        setScheduleLists(
          data.map((schedule, index) => ({
            schedule,
            index,
            isSelected: selectedCardIdx === index,
            onShowDestinations: handleShowDestinations,
            scheduleId: schedule.schedule_id
          }))
        );
      } catch (err) {
        // console.error('Error: ', err);
        setConsoleAlert(true);
        return;
      }
    }

    getScheduleLists();
  }, [selectedCardIdx]);

  useEffect(() => {
    sortSchedule(scheduleSort);
  }, [scheduleSort, scheduleLists]);

  function handleSort(e: React.MouseEvent<HTMLButtonElement>) {
    const sortOption = (e.target as HTMLButtonElement).value;
    setScheduleSort(sortOption);
    setSelectedCardIdx(null);
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
          <ButtonGroup
            variant='text'
            aria-label='text button group'
            sx={{
              '.MuiButtonGroup-grouped:not(:last-of-type)': {
                borderColor: `var(--main-color)`
              }
            }}
          >
            <Button
              className={`${styles.sortButton} ${
                scheduleSort === 'upcoming' ? styles.selected : ''
              }`}
              onClick={(e) => {
                handleSort(e);
              }}
              value='upcoming'
              sx={{
                color:
                  scheduleSort === 'upcoming' ? '#ffffff' : `var(--main-color)`,
                backgroundColor:
                  scheduleSort === 'upcoming' ? `var(--main-color)` : undefined,
                fontWeight: '600',
                fontSize: 'medium',
                '&:hover': {
                  color: '#ffffff',
                  backgroundColor: `var(--main-color)`
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
                color:
                  scheduleSort === 'past' ? '#ffffff' : `var(--main-color)`,
                backgroundColor:
                  scheduleSort === 'past' ? `var(--main-color)` : undefined,
                fontWeight: '600',
                fontSize: 'medium',
                '&:hover': {
                  color: '#ffffff',
                  backgroundColor: `var(--main-color)`
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
                backgroundColor: `var(--main-color)`,
                border: 1,
                borderColor: `var(--main-color)`,
                '&:hover': {
                  color: '#ffffff',
                  backgroundColor: `var(--main-color)`
                }
              }}
            >
              새로운 일정 만들기
            </Button>
          </Stack>
        </Box>
      </div>
      <div className={styles.scheduleCardContainer}>
        {showScheduleList.length === 0 ? (
          <div className={styles.alertContainerLeft}>
            <CiCircleAlert className={styles.alertIcon} />
            <p className={styles.pTag}>일정이 없습니다.</p>
          </div>
        ) : (
          showScheduleList.map((scheduleList, index) => (
            <ModalScheduleCard
              key={scheduleList.schedule_id}
              schedule={scheduleList}
              index={index}
              isSelected={selectedCardIdx === index}
              onShowDestinations={handleShowDestinations}
              scheduleId={scheduleList.schedule_id}
            />
          ))
        )}
      </div>
      {selectedCardIdx === null &&
        scheduleDetailsDomRoot !== null &&
        createPortal(
          <div className={styles.alertContainerRight}>
            <MdEventNote className={styles.alertIcon} />
            <p className={styles.pTag}>일정을 선택해 주세요!</p>
          </div>,
          scheduleDetailsDomRoot
        )}
      {consoleAlert && (
        <div className={styles.alertModal}>
          <AlertModal
            message='오류가 발생했습니다.'
            onConfirm={() => setConsoleAlert(false)}
            showCancelButton={false}
          />
        </div>
      )}
    </div>
  );
}
