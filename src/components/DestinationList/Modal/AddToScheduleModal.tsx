import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './AddToScheduleModal.module.scss';
import { AddToScheduleModalType } from '../../../types/ModalScheduleTypes';
import axios from 'axios';
import tokenInstance from '../../../apis/tokenInstance';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import AlertModal from '../../common/Alert/AlertModal';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

// const ALERT_PROPS = {
//   message: '이미 추가된 일정입니다.',
//   showCanCelButton: false,
//   showTitle: false
// };

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
  // const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    setUpdatedDestinations([...destinations]);
    setUpdatedContentIds([...destinationIds]);
  }, [destinations, destinationIds]);

  async function getDestinationTitle(id: number) {
    try {
      const response = await axios.get(`${baseUrl}/destinations/${contentid}`);
      const data = response.data;
      // console.log(data);

      if (data && data.id === id) {
        const title = data.title;
        // console.log('title', title);
        return title;
      }
    } catch (err) {
      console.error('Error: ', err);
      alert('목적지를 선택해 주세요.');
    }
  }

  async function addToSelectedDay() {
    const title = await getDestinationTitle(Number(contentid));

    if (
      Number(contentid) &&
      !updatedDestinations[selectedDay].includes(title)
    ) {
      // console.log('updatedDestinations', updatedDestinations);

      const copiedContentIds = [...updatedContentIds];
      copiedContentIds[selectedDay] = copiedContentIds[selectedDay] || [];
      copiedContentIds[selectedDay].push(Number(contentid));

      // console.log('updatedContentIds', updatedContentIds);

      try {
        const response = await tokenInstance.post(
          `${baseUrl}/schedules/${scheduleId}`,
          {
            destinations: updatedContentIds
          }
        );

        // console.log(response);
        // alert('일정이 추가되었습니다!');

        setUpdatedDestinations(response.data.destinationTitles);
        setUpdatedContentIds(response.data.destinationIds);
      } catch (err) {
        console.error('Error: ', err);
      }
    } else {
      alert('이미 추가된 일정입니다.');
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
            backgroundColor: '#ef6d00',
            border: 1,
            borderColor: '#ef6d00',
            '&:hover': {
              color: '#ffffff',
              backgroundColor: '#ef6d00'
            }
          }}
        >
          목적지 추가하기
        </Button>
      </Stack>
      <div className={styles.destinationList}>
        {updatedDestinations[selectedDay].map((destination, idx) => (
          <div key={idx} className={styles.destination}>
            {destination}
          </div>
        ))}
      </div>
    </>
  );
}

export default AddToScheduleModal;
