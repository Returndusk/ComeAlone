import { useRef, useState, useCallback, useEffect } from 'react';
import { getScheduleReviewsById } from '../apis/ScheduleDetailAPI';
import { ScheduleReviewType } from '../types/ScheduleDetailTypes';

function useScheduleReviewsFetch(id: string) {
  const [fetchedScheduleReviews, setFetchedScheduleReviews] = useState<
    ScheduleReviewType[]
  >([]);
  const [isReviewsLoading, setIsReviewsLoading] = useState<boolean>(true);
  const scheduleId = useRef<string>(id);

  const getScheduleReviews = useCallback(async (scheduleId: string) => {
    const response = await getScheduleReviewsById(scheduleId);

    setFetchedScheduleReviews(response?.data as ScheduleReviewType[]);
    setIsReviewsLoading(false);
  }, []);

  useEffect(() => {
    getScheduleReviews(scheduleId.current);
  }, [getScheduleReviews, scheduleId]);

  return [isReviewsLoading, fetchedScheduleReviews, getScheduleReviews] as [
    boolean,
    ScheduleReviewType[],
    (scheduleId: string) => void
  ];
}

export default useScheduleReviewsFetch;
