import { useRef, useState, useCallback, useEffect } from 'react';
import { getScheduleReviewsById } from '../apis/ScheduleDetailAPI';
import { ScheduleReviewType } from '../types/ScheduleDetailTypes';

function useScheduleReviewsFetch(id: string) {
  const [fetchedScheduleReviews, setFetchedScheduleReviews] = useState<
    ScheduleReviewType[]
  >([]);
  const scheduleId = useRef<string>(id);

  const getScheduleReviews = useCallback(async (scheduleId: string) => {
    const response = await getScheduleReviewsById(scheduleId);

    setFetchedScheduleReviews(response?.data as ScheduleReviewType[]);
  }, []);

  useEffect(() => {
    getScheduleReviews(scheduleId.current);
  }, [getScheduleReviews, scheduleId]);

  return [fetchedScheduleReviews];
}

export default useScheduleReviewsFetch;
