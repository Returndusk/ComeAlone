import {
  ScheduleFetchedType,
  ScheduleReviewPropsType
} from '../../types/ScheduleDetailTypes';

export const defaultSchedule: ScheduleFetchedType = {
  userId: '',
  nickname: '',
  title: '',
  summary: '',
  likesCount: 0,
  duration: 0,
  startDate: new Date(),
  endDate: new Date(),
  image: '',
  createdAt: new Date(),
  destinations: [[]]
};

export const reviews: ScheduleReviewPropsType[] = [
  {
    nickname: 'A',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.',
    createdAt: '2023. 06. 01'
  },
  {
    nickname: 'A',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.',
    createdAt: '2023. 06. 01'
  },
  {
    nickname: 'A',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.',
    createdAt: '2023. 06. 01'
  },
  {
    nickname: 'A',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.',
    createdAt: '2023. 06. 01'
  },
  {
    nickname: 'A',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.',
    createdAt: '2023. 06. 01'
  },
  {
    nickname: 'A',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.',
    createdAt: '2023. 06. 01'
  },
  {
    nickname: 'A',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.',
    createdAt: '2023. 06. 01'
  },
  {
    nickname: 'A',
    comment: '저렴한 비용으로 좋은 여행지 잘 다녀왔습니다.',
    createdAt: '2023. 06. 01'
  }
];

export const likesAmount = 7;

export const reviewsAmount = 5;
