import { MapWithWaypointsPropsType } from './DestinationListTypes';
export interface IScheduleDetail {
  userId: string;
  nickname: string;
  profileImage: string;
  scheduleId: number;
  title: string;
  summary: string;
  likesCount: number;
  startDate: Date;
  endDate: Date;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
  destinationCount: number;
  destinations: MapWithWaypointsPropsType[][];
  image: string;
  status: string;
}

export type ScheduleFetchedType = Pick<
  IScheduleDetail,
  | 'scheduleId'
  | 'userId'
  | 'nickname'
  | 'profileImage'
  | 'title'
  | 'summary'
  | 'likesCount'
  | 'startDate'
  | 'endDate'
  | 'duration'
  | 'createdAt'
  | 'updatedAt'
  | 'destinationCount'
  | 'destinations'
  | 'image'
  | 'status'
>;

export type ScheduleDetailInfoType = Pick<
  IScheduleDetail,
  | 'nickname'
  | 'profileImage'
  | 'title'
  | 'summary'
  | 'startDate'
  | 'endDate'
  | 'duration'
  | 'createdAt'
  | 'updatedAt'
>;

export type ScheduleDetailIconsType = {
  userId: string;
  doesUserLike: boolean;
  likesCount: number;
};

export type ScheduleReviewType = {
  comment_id: number;
  scheduleId: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    nickname: string;
    profile_image: string;
  };
};

export type ScheduleReviewPropsType = {
  scheduleReviews: ScheduleReviewType[];
  reviewsCount: number;
  onReviewUpdate: (id: number, updateReview: string) => void;
  onReviewDelete: (id: number) => void;
};
