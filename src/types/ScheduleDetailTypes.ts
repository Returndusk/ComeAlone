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
  destinations: MapWithWaypointsPropsType[][];
  image: string;
  status: string;
}

export type ScheduleFetchedType = Pick<
  IScheduleDetail,
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
  | 'destinations'
  | 'image'
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
  reviewsCount: number;
};

export interface IScheduleReview {
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
}

export type ScheduleReviewPropsType = {
  scheduleReviews: IScheduleReview[];
  onReviewUpdate: (id: number, updateReview: string) => void;
  onReviewDelete: (id: number) => void;
};
