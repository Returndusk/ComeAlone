import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../components/ScheduleDetail/ScheduleDetail.module.scss';
import ImageScheduleDetail from '../components/ScheduleDetail/ImageScheduleDetail';
import InfoScheduleDetail from '../components/ScheduleDetail/InfoScheduleDetail';
import IconsScheduleDetail from '../components/ScheduleDetail/IconsScheduleDetail';
import DestinationList from '../components/ScheduleDetail/DestinationList';
import ReviewsSchedule from '../components/ScheduleDetail/ReviewsSchedule';
import InputReviewSchedule from '../components/ScheduleDetail/InputReviewSchedule';
import MapWithWaypoints from '../components/common/Map/MapWithWaypoints';
import {
  schedule,
  likesAmount,
  reviewsAmount,
  reviews
} from '../components/ScheduleDetail/Dummy';
import { MapWithWaypointsPropsType } from '../types/DestinationListTypes';
import { ScheduleFetchedType } from '../types/ScheduleDetailTypes';
import { FaArrowLeft } from 'react-icons/fa';
import { getScheduleDetailById } from '../apis/ScheduleDetailAPI';
import ROUTER from '../constants/Router';

function ScheduleDetail() {
  const { scheduleId } = useParams();
  const [scheduleFetched, setScheduleFetched] =
    useState<ScheduleFetchedType>(schedule);
  const [reviewInput, setReviewInput] = useState('');
  const [checkedDestinations, setCheckedDestinations] = useState(
    schedule.destinations.flat()
  );

  const getScheduleDetail = useCallback(async (id: string | undefined) => {
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
      destinations: response?.data.destinationMaps
    };

    return data;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getScheduleDetail(scheduleId);

      setScheduleFetched(data);
      setCheckedDestinations(data.destinations.flat());
    };

    fetchData();
  }, []);

  const {
    nickname,
    title,
    summary,
    duration,
    startDate,
    endDate,
    image,
    createdAt,
    destinations
  } = scheduleFetched;

  const handleReviewSubmit = (input: string) => {
    setReviewInput(input);
    console.log(reviewInput);
  };

  return (
    <div className={styles.container}>
      <Link to={ROUTER.SCHEDULE_LIST} className={styles.backButton}>
        <FaArrowLeft />
        돌아가기
      </Link>
      <ImageScheduleDetail image={image} />
      <InfoScheduleDetail
        nickname={nickname}
        title={title}
        summary={summary}
        duration={duration}
        startDate={startDate}
        endDate={endDate}
        createdAt={createdAt}
      />
      <div className={styles.editButtonContainer}>
        <Link to={ROUTER.SCHEDULE_EDIT} className={styles.editButton}>
          수정하기
        </Link>
      </div>
      <IconsScheduleDetail
        likesAmount={likesAmount}
        reviewsAmount={reviewsAmount}
      />
      <DestinationList
        destinations={destinations}
        onDestinationsChecked={setCheckedDestinations}
      />
      <div className={styles.mapContainer}>
        <MapWithWaypoints markersLocations={checkedDestinations} />
      </div>
      <ReviewsSchedule reviews={reviews} />
      <InputReviewSchedule onReviewSubmit={handleReviewSubmit} />
    </div>
  );
}

export default ScheduleDetail;
