interface Schedule {
  title: string;
  summary: string;
  nickname: string;
  start_date: string;
  end_date: string;
  duration: number;
  createdAt: string;
  destinations: string[];
  image: string;
  status: string;
}

export type ScheduleCardType = Pick<
  Schedule,
  | 'title'
  | 'summary'
  | 'nickname'
  | 'duration'
  | 'createdAt'
  | 'destinations'
  | 'image'
>;

export type MyScheduleCardType = Pick<
  Schedule,
  | 'title'
  | 'summary'
  | 'start_date'
  | 'end_date'
  | 'duration'
  | 'createdAt'
  | 'destinations'
  | 'image'
>;

export type ScheduleListType = ScheduleCardType[];
export type MyScheduleListType = MyScheduleCardType[];

export type ScheduleCardProps = { schedule: ScheduleCardType; link: string };
export type MyScheduleCardProps = {
  schedule: MyScheduleCardType;
  link: string;
};
