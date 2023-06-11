import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAuthState } from '../contexts/AuthContext';
import { Link, useParams } from 'react-router-dom';
import styles from '../components/ScheduleDetail/ScheduleDetail.module.scss';
import ImageScheduleDetail from '../components/ScheduleDetail/ImageScheduleDetail';
import InfoScheduleDetail from '../components/ScheduleDetail/InfoScheduleDetail';
import ButtonsScheduleDetail from '../components/ScheduleDetail/ButtonsScheduleDetail';
import IconsScheduleDetail from '../components/ScheduleDetail/IconsScheduleDetail';
import DestinationList from '../components/ScheduleDetail/DestinationList';
import ReviewsSchedule from '../components/ScheduleDetail/ReviewsSchedule';
import InputReviewSchedule from '../components/ScheduleDetail/InputReviewSchedule';
import MapWithWaypoints from '../components/common/Map/MapWithWaypoints';
import { defaultSchedule } from '../components/ScheduleDetail/Dummy';
import { FaArrowLeft } from 'react-icons/fa';
import {
  getScheduleDetailById,
  getDoesUserLikeById,
  toggleUserLikeById,
  getScheduleReviewsById,
  addScheduleReviewById,
  updateScheduleReviewById,
  deleteScheduleReviewById
} from '../apis/ScheduleDetailAPI';
import ROUTER from '../constants/Router';

function ScheduleDetail() {
  const { scheduleId } = useParams();
  const { authState } = useAuthState();
  const [isLoading, setIsLoading] = useState(true);
  const [checkedDestinations, setCheckedDestinations] = useState(
    defaultSchedule.destinations.flat()
  );
  const [doesUserLike, setDoesUserLike] = useState(false);
  const [scheduleReviews, setScheduleReviews] = useState([]);
  const scheduleFetched = useRef(defaultSchedule);
  const userLikesCount = useRef(defaultSchedule.likesCount);

  const getScheduleDetail = useCallback(async (id: string | undefined) => {
    const response = await getScheduleDetailById(id);

    const data = {
      userId: response?.data.user.id,
      nickname: response?.data.user.nickname,
      title: response?.data.title,
      summary: response?.data.summary,
      likesCount: response?.data.likes_count,
      duration: response?.data.duration,
      startDate: new Date(response?.data.start_date),
      endDate: new Date(response?.data.end_date),
      image: response?.data.image,
      createdAt: new Date(response?.data.created_at.split('T')[0]),
      updatedAt: new Date(response?.data.updated_at.split('T')[0]),
      destinations: response?.data.destinationMaps
    };

    return data;
  }, []);

  const getDoesUserLike = useCallback(async (id: string | undefined) => {
    const response = await getDoesUserLikeById(id);

    return response?.data.is_liked;
  }, []);

  const toggleUserLike = useCallback(async (id: string | undefined) => {
    const response = await toggleUserLikeById(id);
    const isLiked = response?.data.is_liked;
    const likesCount = response?.data.likes_count_of_schedule;

    userLikesCount.current = likesCount;

    setDoesUserLike(isLiked);
  }, []);

  const getScheduleReviews = useCallback(async (id: string | undefined) => {
    const response = await getScheduleReviewsById(id);

    return response?.data;
  }, []);

  const addScheduleReview = useCallback(
    async (id: string | undefined, newReview: string) => {
      await addScheduleReviewById(id, newReview);
      setScheduleReviews(await getScheduleReviews(scheduleId));
    },
    []
  );

  const updateScheduleReview = useCallback(
    async (id: number | undefined, updateReview: string) => {
      await updateScheduleReviewById(id, updateReview);
      setScheduleReviews(await getScheduleReviews(scheduleId));
    },
    []
  );

  const deleteScheduleReview = useCallback(async (id: number) => {
    await deleteScheduleReviewById(id);
    setScheduleReviews(await getScheduleReviews(scheduleId));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDetail = await getScheduleDetail(scheduleId);
      const fetchedReviews = await getScheduleReviews(scheduleId);

      scheduleFetched.current = fetchedDetail;
      userLikesCount.current = fetchedDetail.likesCount;
      setScheduleReviews(fetchedReviews);
      setCheckedDestinations(fetchedDetail.destinations.flat());
      setIsLoading(false);

      if (authState.isLoggedIn) {
        const doesUserLike = await getDoesUserLike(scheduleId);

        setDoesUserLike(doesUserLike);
      }
    };

    fetchData();
  }, []);

  const {
    userId,
    nickname,
    title,
    summary,
    duration,
    startDate,
    endDate,
    image,
    createdAt,
    updatedAt,
    destinations
  } = scheduleFetched.current;

  const handleReviewSubmit = (input: string) => {
    addScheduleReview(scheduleId, input);
  };

  const handleUserLike = () => {
    toggleUserLike(scheduleId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        updatedAt={updatedAt}
      />
      <ButtonsScheduleDetail
        userId={userId}
        loggedInUserId={authState.user?.id}
        scheduleId={scheduleId}
      />
      <IconsScheduleDetail
        userId={userId}
        doesUserLike={doesUserLike}
        likesCount={userLikesCount.current}
        reviewsCount={scheduleReviews.length}
        onUserLike={handleUserLike}
      />
      <DestinationList
        destinations={destinations}
        onDestinationsChecked={setCheckedDestinations}
      />
      <div className={styles.mapContainer}>
        <MapWithWaypoints markersLocations={checkedDestinations} />
      </div>
      <ReviewsSchedule
        scheduleReviews={scheduleReviews}
        onReviewUpdate={updateScheduleReview}
        onReviewDelete={deleteScheduleReview}
      />
      <InputReviewSchedule onReviewSubmit={handleReviewSubmit} />
    </div>
  );
}

export default ScheduleDetail;
