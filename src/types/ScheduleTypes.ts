interface Schedule {
  id: string;
  title: string;
  summary: string;
  nickname: string;
  start_date: string;
  end_date: string;
  duration: number;
  created_at: string;
  destinations: string[][];
  image: string;
  status: string;
}

export type ScheduleCardType = Pick<
  Schedule,
  | 'id'
  | 'title'
  | 'summary'
  | 'nickname'
  | 'duration'
  | 'created_at'
  | 'destinations'
  | 'image'
>;

export type MyScheduleCardType = Pick<
  Schedule,
  | 'id'
  | 'title'
  | 'summary'
  | 'start_date'
  | 'end_date'
  | 'duration'
  | 'created_at'
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
