import { ScheduleEditFetchedType } from '../../types/ScheduleEdit';

export const scheduleFetched: ScheduleEditFetchedType = {
  nickname: '제주123',
  title: '혼자 떠나는 우도 여행',
  summary: '혼자 떠나는 우도 여행 일정입니다.',
  duration: 3,
  startDate: new Date(2023, 5, 15),
  endDate: new Date(2023, 5, 17),
  image:
    'https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80',
  createdAt: new Date(2023, 5, 15),
  status: 'PUBLIC',
  destinations: [
    [
      {
        title: '제주국제공항',
        mapx: 126.49277597695098,
        mapy: 33.50699063059678
      },
      {
        title: '협재포구',
        mapx: 126.24279134974394,
        mapy: 33.398902486798974
      },
      {
        title: '북촌 돌하르방공원',
        mapx: 126.6885436683114,
        mapy: 33.53865685495171
      }
    ],
    [
      {
        title: '성산포항',
        mapx: 126.9332900500702,
        mapy: 33.47345694951883
      },
      {
        title: '우도',
        mapx: 126.95549288567852,
        mapy: 33.50450920164046
      },
      {
        title: '지미봉',
        mapx: 126.90243033013158,
        mapy: 33.49926750882532
      }
    ],
    [
      {
        title: '월정리 해수욕장',
        mapx: 126.79581050369586,
        mapy: 33.55644325681169
      },
      {
        title: '김녕항',
        mapx: 126.73730001998011,
        mapy: 33.559749963967796
      },
      {
        title: '세화해변',
        mapx: 126.86023043387144,
        mapy: 33.52509404256762
      },
      {
        title: '제주국제공항',
        mapx: 126.49277597695098,
        mapy: 33.50699063059678
      }
    ]
  ]
};
