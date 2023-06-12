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
import {
  IScheduleReview,
  ScheduleFetchedType
} from '../types/ScheduleDetailTypes';
import { MapWithWaypointsPropsType } from '../types/DestinationListTypes';

function ScheduleDetail() {
  const scheduleId: string = useParams().scheduleId as string;
  const isLoggedIn: boolean = useAuthState().authState.isLoggedIn as boolean;
  const loggedInUserId: string = useAuthState().authState.user?.id as string;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [checkedDestinations, setCheckedDestinations] = useState<
    MapWithWaypointsPropsType[]
  >([]);
  const [doesUserLike, setDoesUserLike] = useState<boolean>(false);
  const [scheduleReviews, setScheduleReviews] = useState<IScheduleReview[]>([]);
  const scheduleFetched = useRef<ScheduleFetchedType>();
  const userLikesCount = useRef<number>(0);

  const getScheduleDetail = useCallback(async (scheduleId: string) => {
    const response = await getScheduleDetailById(scheduleId);

    const data = {
      userId: response?.data.user.id,
      nickname: response?.data.user.nickname,
      profileImage: response?.data.user.profile_image,
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

  const getDoesUserLike = useCallback(async (scheduleId: string) => {
    const response = await getDoesUserLikeById(scheduleId);

    return response?.data.is_liked;
  }, []);

  const toggleUserLike = useCallback(async (scheduleId: string) => {
    const response = await toggleUserLikeById(scheduleId);
    const isLiked: boolean = response?.data.is_liked;
    const likesCount: number = response?.data.likes_count_of_schedule;

    userLikesCount.current = likesCount;

    setDoesUserLike(isLiked);
  }, []);

  const getScheduleReviews = useCallback(async (scheduleId: string) => {
    const response = await getScheduleReviewsById(scheduleId);

    return response?.data;
  }, []);

  const addScheduleReview = useCallback(
    async (scheduleId: string, newReview: string) => {
      await addScheduleReviewById(scheduleId, newReview);
      setScheduleReviews(await getScheduleReviews(scheduleId));
    },
    []
  );

  const updateScheduleReview = useCallback(
    async (reviewId: number, updateReview: string) => {
      await updateScheduleReviewById(reviewId, updateReview);
      setScheduleReviews(await getScheduleReviews(scheduleId));
    },
    []
  );

  const deleteScheduleReview = useCallback(async (reviewId: number) => {
    await deleteScheduleReviewById(reviewId);
    setScheduleReviews(await getScheduleReviews(scheduleId));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDetail: ScheduleFetchedType = await getScheduleDetail(
        scheduleId
      );
      const fetchedReviews: IScheduleReview[] = await getScheduleReviews(
        scheduleId
      );

      scheduleFetched.current = fetchedDetail;
      userLikesCount.current = fetchedDetail.likesCount;
      setScheduleReviews(fetchedReviews);
      setCheckedDestinations(fetchedDetail.destinations.flat());
      setIsLoading(false);

      if (isLoggedIn) {
        const doesUserLike = await getDoesUserLike(scheduleId);

        setDoesUserLike(doesUserLike);
      }
    };

    fetchData();
  }, []);

  const handleReviewSubmit = (input: string) => {
    addScheduleReview(scheduleId, input);
  };

  const handleUserLike = () => {
    toggleUserLike(scheduleId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const {
    userId,
    nickname,
    profileImage,
    title,
    summary,
    duration,
    startDate,
    endDate,
    image,
    createdAt,
    updatedAt,
    destinations
  } = scheduleFetched.current as ScheduleFetchedType;

  return (
    <div className={styles.container}>
      <button className={styles.backButton}>
        <Link to={ROUTER.SCHEDULE_LIST}>
          <FaArrowLeft className={styles.backIcon} />
          돌아가기
        </Link>
      </button>
      <ImageScheduleDetail image={image} />
      <InfoScheduleDetail
        nickname={nickname}
        profileImage={profileImage}
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
        loggedInUserId={loggedInUserId}
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
