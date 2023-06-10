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
  userId: string;
  doesUserLike: boolean;
  likesCount: number;
  reviewsCount: number;
  onUserLike: () => void;
};

interface IScheduleReviewType {
  comment_id: number;
  scheduleId: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    nickname: string;
    profileImage: string;
  };
}

export type ScheduleReviewPropsType = {
  scheduleReviews: IScheduleReviewType[];
  onReviewDelete: (id: number) => void;
};
