import { useRef, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getScheduleDetailById } from '../apis/ScheduleDetailAPI';
import { ScheduleFetchedType } from '../types/ScheduleDetailTypes';
import { AxiosError } from 'axios';

function useScheduleDetailFetch(id: string) {
  const [fetchedScheduleDetail, setFetchedScheduleDetail] =
    useState<ScheduleFetchedType>();
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(true);
  const scheduleId = useRef<string>(id);
  const navigate = useNavigate();

  const getScheduleDetail = useCallback(async (scheduleId: string) => {
    try {
      const response = await getScheduleDetailById(scheduleId);

      const data: ScheduleFetchedType = {
        scheduleId: response?.data.schedule_id,
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
        destinationCount: response?.data.destination_count,
        destinations: response?.data.destinationMaps,
        status: response?.data.status
      };

      setFetchedScheduleDetail(data);
      setIsDetailLoading(false);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          console.log(err.response.data.message);

          navigate('*');
        }
      } else {
        console.log(err);
      }
    }
  }, []);

  useEffect(() => {
    getScheduleDetail(scheduleId.current);
  }, [getScheduleDetail, scheduleId.current]);

  return [isDetailLoading, fetchedScheduleDetail] as [
    boolean,
    ScheduleFetchedType
  ];
}

export default useScheduleDetailFetch;
