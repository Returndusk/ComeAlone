import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAuthState } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import styles from '../components/ScheduleDetail/ScheduleDetail.module.scss';
import ImageScheduleDetail from '../components/ScheduleDetail/ImageScheduleDetail';
import InfoScheduleDetail from '../components/ScheduleDetail/InfoScheduleDetail';
import ButtonsScheduleDetail from '../components/ScheduleDetail/ButtonsScheduleDetail';
import IconsScheduleDetail from '../components/ScheduleDetail/IconsScheduleDetail';
import DestinationList from '../components/ScheduleDetail/DestinationList';
import DestinationsMap from '../components/ScheduleDetail/DestinationsMap';
import ReviewsSchedule from '../components/ScheduleDetail/ReviewsSchedule';
import InputReviewSchedule from '../components/ScheduleDetail/InputReviewSchedule';
import {
  getDoesUserLikeById,
  toggleUserLikeById,
  addScheduleReviewById,
  updateScheduleReviewById,
  deleteScheduleReviewById
} from '../apis/ScheduleDetailAPI';
import {
  ScheduleReviewType,
  ScheduleFetchedType
} from '../types/ScheduleDetailTypes';
import { MapWithWaypointsPropsType } from '../types/DestinationListTypes';
import useScheduleDetailFetch from '../hooks/useScheduleDetailFetch';
import useScheduleReviewsFetch from '../hooks/useScheduleReviewsFetch';

function ScheduleDetail() {
  const scheduleId: string = useParams().scheduleId as string;
  const isLoggedIn: boolean = useAuthState().authState.isLoggedIn as boolean;
  const loggedInUserId: string = useAuthState().authState.user?.id as string;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [checkedDestinations, setCheckedDestinations] = useState<
    MapWithWaypointsPropsType[]
  >([]);
  const [doesUserLike, setDoesUserLike] = useState<boolean>(false);
  const [scheduleReviews, setScheduleReviews] = useState<ScheduleReviewType[]>(
    []
  );
  const scheduleFetched = useRef<ScheduleFetchedType>();
  const userLikesCount = useRef<number>(0);

  const [fetchedScheduleDetail] = useScheduleDetailFetch(scheduleId);
  const [fetchedScheduleReviews] = useScheduleReviewsFetch(scheduleId);

  useEffect(() => {
    const fetchData = async () => {
      if (!fetchedScheduleDetail) {
        return;
      }

      if (!fetchedScheduleReviews) {
        return;
      }

      scheduleFetched.current = fetchedScheduleDetail as ScheduleFetchedType;
      userLikesCount.current = fetchedScheduleDetail?.likesCount as number;
      setScheduleReviews(fetchedScheduleReviews);
      setCheckedDestinations(
        fetchedScheduleDetail?.destinations.flat() as MapWithWaypointsPropsType[]
      );

      if (isLoggedIn) {
        const doesUserLike = await getDoesUserLike(scheduleId);

        setDoesUserLike(doesUserLike);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [fetchedScheduleDetail, fetchedScheduleReviews]);

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

  const addScheduleReview = useCallback(
    async (scheduleId: string, newReview: string) => {
      await addScheduleReviewById(scheduleId, newReview);

      const [fetchedReviews] = useScheduleReviewsFetch(scheduleId);

      setScheduleReviews(fetchedReviews);
    },
    []
  );

  const updateScheduleReview = useCallback(
    async (reviewId: number, updateReview: string) => {
      await updateScheduleReviewById(reviewId, updateReview);
      const [fetchedReviews] = useScheduleReviewsFetch(scheduleId);

      setScheduleReviews(fetchedReviews);
    },
    []
  );

  const deleteScheduleReview = useCallback(async (reviewId: number) => {
    await deleteScheduleReviewById(reviewId);
    const [fetchedReviews] = useScheduleReviewsFetch(scheduleId);

    setScheduleReviews(fetchedReviews);
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
    destinationCount,
    destinations
  } = fetchedScheduleDetail as ScheduleFetchedType;

  return (
    <div className={styles.container}>
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
        onUserLike={handleUserLike}
      />
      <DestinationList
        destinations={destinations}
        destinationCount={destinationCount}
        onDestinationsChecked={setCheckedDestinations}
      />
      <DestinationsMap checkedDestinations={checkedDestinations} />
      <ReviewsSchedule
        scheduleReviews={scheduleReviews}
        reviewsCount={scheduleReviews.length}
        onReviewUpdate={updateScheduleReview}
        onReviewDelete={deleteScheduleReview}
      />
      <InputReviewSchedule onReviewSubmit={handleReviewSubmit} />
    </div>
  );
}

export default ScheduleDetail;
