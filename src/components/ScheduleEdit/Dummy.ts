type Schedule = {
  createdBy: string;
  title: string;
  summary: string;
  duration: string;
  startDate: Date;
  endDate: Date;
  isPublic: boolean;
  image: string;
  createdAt: string;
};
export const schedule: Schedule = {
  createdBy: '제주123',
  title: '혼자 떠나는 우도 여행',
  summary: '혼자 떠나는 우도 여행 일정입니다.',
  duration: '3',
  startDate: new Date(2023, 5, 15),
  endDate: new Date(2023, 5, 17),
  isPublic: true,
  image:
    'https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80',
  createdAt: '2023.04.01.'
};
export const destinations = [
  ['제주국제공항', '협재포구', '북촌 돌하르방공원'],
  ['두문포항', '우도', '지미봉'],
  ['월정리 해수욕장', '김녕항', '세화해변', '제주국제공항'],
  ['제주국제공항', '제주국제공항', '제주국제공항']
];
