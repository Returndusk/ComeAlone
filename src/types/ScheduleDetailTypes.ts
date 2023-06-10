import { MapWithWaypointsPropsType } from './DestinationListTypes';
export interface IScheduleDetail {
  scheduleId: number;
  title: string;
  summary: string;
  userId: string;
  nickname: string;
  likesCount: number;
  startDate: Date;
  endDate: Date;
  duration: number;
  createdAt: Date;
  destinations: MapWithWaypointsPropsType[][];
  image: string;
  status: string;
}

export type ScheduleFetchedType = Pick<
  IScheduleDetail,
  | 'userId'
  | 'title'
  | 'summary'
  | 'nickname'
  | 'likesCount'
  | 'startDate'
  | 'endDate'
  | 'duration'
  | 'createdAt'
  | 'destinations'
  | 'image'
>;

export type ScheduleDetailInfoType = Pick<
  IScheduleDetail,
  | 'title'
  | 'summary'
  | 'nickname'
  | 'startDate'
  | 'endDate'
  | 'duration'
  | 'createdAt'
>;

export type IconsScheduleDetailType = {
  doesUserLike: boolean;
  likesCount: number;
  reviewsAmount: number;
  onUserLike: () => void;
};

interface ScheduleReviewType {
  commentId: number;
  scheduleId: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    nickname: string;
    profileImage: string;
  };
}

export type ScheduleReviewPropsType = Pick<
  ScheduleReviewType,
  'user' | 'comment' | 'createdAt'
>;
