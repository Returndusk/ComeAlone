import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './AddToScheduleModal.module.scss';
import { AddToScheduleModalType } from '../../../types/ModalScheduleTypes';
// import axios from 'axios';
import tokenInstance from '../../../apis/tokenInstance';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AlertModal from '../../common/Alert/AlertModal';
import { FaTrashAlt } from 'react-icons/fa';
import { BsFillFlagFill } from 'react-icons/bs';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function AddToScheduleModal({
  destinations,
  destinationIds,
  selectedDay,
  scheduleId
}: AddToScheduleModalType) {
  const { contentid } = useParams();
  const [updatedDestinations, setUpdatedDestinations] = useState([
    ...destinations
  ]);
  const [updatedContentIds, setUpdatedContentIds] = useState([
    ...destinationIds
  ]);
  const [alreadyAddedAlert, setAlreadyAddedAlert] = useState<boolean>(false);
  const [errorAlert, setErrorAlert] = useState<boolean>(false);
  const [limitAlert, setLimitAlert] = useState<boolean>(false);
  const [consoleAlert, setConsoleAlert] = useState<boolean>(false);

  useEffect(() => {
    setUpdatedDestinations([...destinations]);
    setUpdatedContentIds([...destinationIds]);
  }, [destinations, destinationIds]);

  // async function getDestinationTitle(id: number) {
  //   try {
  //     const response = await axios.get(`${baseUrl}/destinations/${contentid}`);
  //     const data = response.data;
  //     // console.log(data);

  //     if (data && data.id === id) {
  //       const title = data.title;
  //       // console.log('title', title);
  //       return title;
  //     }
  //   } catch (err) {
  //     // console.error('Error: ', err);
  //     setErrorAlert(true);
  //   }
  // }

  async function addToSelectedDay() {
    // const title = await getDestinationTitle(Number(contentid));

    if (updatedDestinations[selectedDay].length > 100) {
      setLimitAlert(true);
      return;
    }

    // if (
    //   Number(contentid) &&
    //   !updatedDestinations[selectedDay].includes(title)
    // ) {
    // console.log('updatedDestinations', updatedDestinations);

    const copiedContentIds = [...updatedContentIds];
    copiedContentIds[selectedDay] = copiedContentIds[selectedDay] || [];
    copiedContentIds[selectedDay].push(Number(contentid));

    // console.log('updatedContentIds', updatedContentIds);

    try {
      const response = await tokenInstance.post(
        `${baseUrl}/schedules/${scheduleId}`,
        {
          destinations: copiedContentIds
        }
      );

      // console.log(response);
      // alert('일정이 추가되었습니다!');

      setUpdatedDestinations(response.data.destinationTitles);
      setUpdatedContentIds(response.data.destinationIds);
    } catch (err) {
      // console.error('Error: ', err);
      setConsoleAlert(true);
      return;
    }
    // } else {
    //   setAlreadyAddedAlert(true);
    //   return;
    // }
  }

  async function handleRemoveDestination(
    dayIndex: number,
    destinationIndex: number
  ) {
    try {
      const copiedContentIds = [...updatedContentIds];
      copiedContentIds[dayIndex].splice(destinationIndex, 1);

      const response = await tokenInstance.post(
        `${baseUrl}/schedules/${scheduleId}`,
        {
          destinations: copiedContentIds
        }
      );

      setUpdatedDestinations(response.data.destinationTitles);
      setUpdatedContentIds(response.data.destinationIds);
    } catch (err) {
      // console.error('Error: ', err);
      setConsoleAlert(true);
      return;
    }
  }

  return (
    <>
      <Stack spacing={2} direction='row' className={styles.addDestinationBtn}>
        <Button
          variant='contained'
          onClick={addToSelectedDay}
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
          목적지 추가하기
        </Button>
      </Stack>
      <div className={styles.destinationList}>
        {updatedDestinations[selectedDay].length === 0 ? (
          <div className={styles.alertContainer}>
            <BsFillFlagFill className={styles.alertIcon} />
            목적지를 추가해 주세요!
          </div>
        ) : (
          updatedDestinations[selectedDay].map((destination, idx) => (
            <div key={idx} className={styles.destination}>
              {destination}
              <button
                className={styles.deleteButton}
                onClick={() => handleRemoveDestination(selectedDay, idx)}
              >
                <FaTrashAlt />
              </button>
            </div>
          ))
        )}
      </div>
      {alreadyAddedAlert && (
        <div className={styles.alertModal}>
          <AlertModal
            message='이미 추가된 일정입니다.'
            onConfirm={() => setAlreadyAddedAlert(false)}
            showCancelButton={false}
          />
        </div>
      )}
      {errorAlert && (
        <div className={styles.alertModal}>
          <AlertModal
            message='목적지를 선택해 주세요.'
            onConfirm={() => setErrorAlert(false)}
            showCancelButton={false}
          />
        </div>
      )}
      {limitAlert && (
        <div className={styles.alertModal}>
          <AlertModal
            message='목적지는 100개까지만 추가할 수 있습니다.'
            onConfirm={() => setLimitAlert(false)}
            showCancelButton={false}
          />
        </div>
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
    </>
  );
}

export default AddToScheduleModal;
