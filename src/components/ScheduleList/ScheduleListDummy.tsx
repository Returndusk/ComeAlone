export default [
  {
    id: '1',
    title: '제주 올레길 걸어요',
    nickname: 'Test1',
    summary: '제주 올레길을 다같이 걸어보아요',
    createdBy: '사용자1',
    created_at: '2023-05-29 (월) 11:12',
    start_date: '2023-06-01',
    end_date: '2023-06-05',
    duration: 3,
    status: 'PRIVATE',
    destinations: [
      ['제주국제공항', '협재포구', '북촌 돌하르방공원'],
      ['두문포항', '우도', '지미봉'],
      ['월정리 해수욕장', '김녕항', '세화해변', '제주국제공항']
    ],
    likes: 150,
    image:
      'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg'
  },
  {
    id: '2',
    title: '한라산 등반해요',
    nickname: 'Test2',
    summary: '한라산을 다같이 올라보아요',
    createdBy: '사용자2',
    created_at: '2023-05-30 (화) 11:12',
    start_date: '2023-06-06',
    end_date: '2023-06-07',
    duration: 3,
    status: 'PRIVATE',
    destinations: [
      ['첫째날1', '첫째날2', '첫째날3'],
      ['둘째날1', '둘째날2']
      // ['마지막날1', '마지막날2', '마지막날3', '마지막날4']
    ],
    likes: 200,
    image:
      'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg'
  }

  // {
  //   id: '3',
  //   title: '마라도 가요',
  //   description: '마라도 여행가요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-06-02 (금) 11:12',
  //   start_date: '2023-06-11',
  //   end_date: '2023-06-11',
  //   status: 'PRIVATE',
  //   destinations: [
  //     ['제주국제공항', '협재포구', '북촌 돌하르방공원'],
  //     ['두문포항', '우도', '지미봉'],
  //     ['월정리 해수욕장', '김녕항', '세화해변', '제주국제공항']
  //   ],
  //   likes: 10
  // },
  // {
  //   id: '4',
  //   title: '일출보러가요',
  //   description: '성산일출봉에 일출보러가요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-06-10 (토) 11:12',
  //   start_date: '2023-06-15',
  //   end_date: '2023-06-17',
  //   status: 'PRIVATE',
  //   destinations: [
  //     ['제주국제공항', '협재포구', '북촌 돌하르방공원'],
  //     ['두문포항', '우도', '지미봉'],
  //     ['월정리 해수욕장', '김녕항', '세화해변', '제주국제공항']
  //   ],
  //   likes: 30
  // },
  // {
  //   id: '5',
  //   title: '제주 올레길 걸어요',
  //   description: '제주 올레길을 다같이 걸어보아요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-05-29 (월) 11:12',
  //   start_date: '2023-06-01',
  //   end_date: '2023-06-05',
  //   status: 'PRIVATE',
  //   destinations: [
  //     ['제주국제공항', '협재포구', '북촌 돌하르방공원'],
  //     ['두문포항', '우도', '지미봉'],
  //     ['월정리 해수욕장', '김녕항', '세화해변', '제주국제공항']
  //   ],
  //   likes: 70
  // }
  // {
  //   id: '6',
  //   title: '한라산 등반해요',
  //   description: '한라산을 다같이 올라보아요',
  //   createdBy: '사용자2',
  //   createdAt: '2023-05 30 (화) 11:12',
  //   start_date: '2023-06-03',
  //   end_date: '2023-06-07',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 3
  // },
  // {
  //   id: '7',
  //   title: '마라도 가요',
  //   description: '마라도 여행가요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-06-02 (금) 11:12',
  //   start_date: '2023-06-07',
  //   end_date: '2023-06-11',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 78
  // },
  // {
  //   id: '8',
  //   title: '일출보러가요',
  //   description: '성산일출봉에 일출보러가요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-06-10 (토) 11:12',
  //   start_date: '2023-06-15',
  //   end_date: '2023-06-17',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 1000
  // },
  // {
  //   id: '9',
  //   title: '제주 올레길 걸어요',
  //   description: '제주 올레길을 다같이 걸어보아요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-05-29 (월) 11:12',
  //   start_date: '2023-06-01',
  //   end_date: '2023-06-05',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 10000
  // },
  // {
  //   id: '10',
  //   title: '한라산 등반해요',
  //   description: '한라산을 다같이 올라보아요',
  //   createdBy: '사용자2',
  //   createdAt: '2023-05 30 (화) 11:12',
  //   start_date: '2023-06-03',
  //   end_date: '2023-06-07',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 541
  // },
  // {
  //   id: '11',
  //   title: '마라도 가요',
  //   description: '마라도 여행가요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-06-02 (금) 11:12',
  //   start_date: '2023-06-07',
  //   end_date: '2023-06-11',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 467
  // },
  // {
  //   id: '12',
  //   title: '일출보러가요',
  //   description: '성산일출봉에 일출보러가요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-06-10 (토) 11:12',
  //   start_date: '2023-06-15',
  //   end_date: '2023-06-17',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 30
  // },
  // {
  //   id: '13',
  //   title: '제주 올레길 걸어요',
  //   description: '제주 올레길을 다같이 걸어보아요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-05-29 (월) 11:12',
  //   start_date: '2023-06-01',
  //   end_date: '2023-06-05',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 15
  // },
  // {
  //   id: '14',
  //   title: '한라산 등반해요',
  //   description: '한라산을 다같이 올라보아요',
  //   createdBy: '사용자2',
  //   createdAt: '2023-05 30 (화) 11:12',
  //   start_date: '2023-06-03',
  //   end_date: '2023-06-07',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 20
  // },
  // {
  //   id: '15',
  //   title: '마라도 가요',
  //   description: '마라도 여행가요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-06-02 (금) 11:12',
  //   start_date: '2023-06-07',
  //   end_date: '2023-06-11',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 10
  // },
  // {
  //   id: '16',
  //   title: '일출보러가요',
  //   description: '성산일출봉에 일출보러가요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-06-10 (토) 11:12',
  //   start_date: '2023-06-15',
  //   end_date: '2023-06-17',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 30
  // },
  // {
  //   id: '16',
  //   title: '일출보러가요',
  //   description: '성산일출봉에 일출보러가요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-06-10 (토) 11:12',
  //   start_date: '2023-06-15',
  //   end_date: '2023-06-17',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 30
  // }
  // {
  //   id: '3',
  //   title: '마라도 가요',
  //   description: '마라도 여행가요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-06-02 (금) 11:12',
  //   start_date: '2023-06-11',
  //   end_date: '2023-06-11',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 10,
  //   image:
  //     'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg'
  // },
  // {
  //   id: '4',
  //   title: '일출보러가요',
  //   description: '성산일출봉에 일출보러가요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-06-10 (토) 11:12',
  //   start_date: '2023-06-15',
  //   end_date: '2023-06-17',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 30,
  //   image:
  //     'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg'
  // },
  // {
  //   id: '5',
  //   title: '제주 올레길 걸어요',
  //   description: '제주 올레길을 다같이 걸어보아요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-05-29 (월) 11:12',
  //   start_date: '2023-06-01',
  //   end_date: '2023-06-05',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 70,
  //   image:
  //     'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg'
  // },
  // {
  //   id: '6',
  //   title: '한라산 등반해요',
  //   description: '한라산을 다같이 올라보아요',
  //   createdBy: '사용자2',
  //   createdAt: '2023-05 30 (화) 11:12',
  //   start_date: '2023-06-03',
  //   end_date: '2023-06-07',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 3,
  //   image:
  //     'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg'
  // },
  // {
  //   id: '7',
  //   title: '마라도 가요',
  //   description: '마라도 여행가요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-06-02 (금) 11:12',
  //   start_date: '2023-06-07',
  //   end_date: '2023-06-11',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 78,
  //   image:
  //     'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg'
  // },
  // {
  //   id: '8',
  //   title: '일출보러가요',
  //   description: '성산일출봉에 일출보러가요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-06-10 (토) 11:12',
  //   start_date: '2023-06-15',
  //   end_date: '2023-06-17',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 1000,
  //   image:
  //     'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg'
  // },
  // {
  //   id: '9',
  //   title: '제주 올레길 걸어요',
  //   description: '제주 올레길을 다같이 걸어보아요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-05-29 (월) 11:12',
  //   start_date: '2023-06-01',
  //   end_date: '2023-06-05',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 10000,
  //   image:
  //     'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg'
  // },
  // {
  //   id: '10',
  //   title: '한라산 등반해요',
  //   description: '한라산을 다같이 올라보아요',
  //   createdBy: '사용자2',
  //   createdAt: '2023-05 30 (화) 11:12',
  //   start_date: '2023-06-03',
  //   end_date: '2023-06-07',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 541,
  //   image:
  //     'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg'
  // },
  // {
  //   id: '11',
  //   title: '마라도 가요',
  //   description: '마라도 여행가요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-06-02 (금) 11:12',
  //   start_date: '2023-06-07',
  //   end_date: '2023-06-11',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 467,
  //   image:
  //     'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg'
  // },
  // {
  //   id: '12',
  //   title: '일출보러가요',
  //   description: '성산일출봉에 일출보러가요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-06-10 (토) 11:12',
  //   start_date: '2023-06-15',
  //   end_date: '2023-06-17',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 30,
  //   image:
  //     'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg'
  // },
  // {
  //   id: '13',
  //   title: '제주 올레길 걸어요',
  //   description: '제주 올레길을 다같이 걸어보아요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-05-29 (월) 11:12',
  //   start_date: '2023-06-01',
  //   end_date: '2023-06-05',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 15,
  //   image:
  //     'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg'
  // },
  // {
  //   id: '14',
  //   title: '한라산 등반해요',
  //   description: '한라산을 다같이 올라보아요',
  //   createdBy: '사용자2',
  //   createdAt: '2023-05 30 (화) 11:12',
  //   start_date: '2023-06-03',
  //   end_date: '2023-06-07',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 20,
  //   image:
  //     'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg'
  // },
  // {
  //   id: '15',
  //   title: '마라도 가요',
  //   description: '마라도 여행가요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-06-02 (금) 11:12',
  //   start_date: '2023-06-07',
  //   end_date: '2023-06-11',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 10,
  //   image:
  //     'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg'
  // },
  // {
  //   id: '16',
  //   title: '일출보러가요',
  //   description: '성산일출봉에 일출보러가요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-06-10 (토) 11:12',
  //   start_date: '2023-06-15',
  //   end_date: '2023-06-17',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 30,
  //   image:
  //     'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg'
  // },
  // {
  //   id: '16',
  //   title: '일출보러가요',
  //   description: '성산일출봉에 일출보러가요',
  //   createdBy: '사용자1',
  //   createdAt: '2023-06-10 (토) 11:12',
  //   start_date: '2023-06-15',
  //   end_date: '2023-06-17',
  //   status: 'PRIVATE',
  //   destinations: ['출발지', '경유지1', '경유지2', '경유지3', '도착지'],
  //   likes: 30,
  //   image:
  //     'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg'
  // }
];
