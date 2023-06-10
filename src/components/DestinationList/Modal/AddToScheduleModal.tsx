import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './CommonModalDesign.module.scss';
import { AddToScheduleModalType } from '../../../types/ModalScheduleTypes';
import axios from 'axios';
import tokenInstance from '../../../apis/tokenInstance';

function AddToScheduleModal({
  destinations,
  selectedDay,
  scheduleId
}: AddToScheduleModalType) {
  const location = useLocation();
  const contentid = Number(location.pathname.split('/').pop());
  const [updatedDestinations, setUpdatedDestinations] = useState([
    ...destinations
  ]);
  const [updatedContentIds, setUpdatedContentIds] = useState<number[][]>([]);

  useEffect(() => {
    setUpdatedDestinations([...destinations]);
  }, [destinations]);

  async function getDestinationTitle(id: number) {
    try {
      const response = await axios.get(
        `https://vvhooping.com/api/destinations/${contentid}`
      );
      const data = response.data;
      // console.log(data);

      if (data && data.id === id) {
        const title = data.title;
        // console.log('title', title);
        return title;
      }
    } catch (err) {
      console.error('Error: ', err);
      alert('목적지를 선택해 주세요.');
    }
  }

  async function getContentId(title: string) {
    try {
      const response = await axios.get(
        `https://vvhooping.com/api/destinations/${contentid}`
      );
      const data = response.data;

      if (data && data.title === title) {
        const contentid = data.id;

        return contentid;
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }

  /**
   * 해당 내용은 작성한 이슈 내용에 더해, 서버로부터 받는 응답 형식 자체를 바꿔야 되나 하는 생각에 작성했던 내용입니다.
   * 현재 id를 보내고 이름을 받는 방식에 문제는 없다고 생각되지만 이 부분도 한 번 봐주시면 감사드리겠습니다!
   *
   * 1. 지금처럼 내가 id를 보내고 title을 받는 경우
   * POST 시 1884191(가마오름 contentid)를 보내지만 다른 목적지를 추가할 때 ["가마오름", 1487243] 이런 식으로 updatedDestinations가 변경된 상태
   * 그렇게 보내지지 않으니까 이전에 추가됐었던 "가마오름"을 또 contentid로 변환해서 보내야 함
   * 즉 내가 보내는 건 id인데 오는건 title이라서 매 요청마다 변환작업이 필요
   * 변환 자체는 되지만 이 과정에서 undefined 오류, 똑같은 contentid로 합쳐지는 오류 등등이 발생
   *
   * 2. 그냥 id를 보내고 id를 받음
   * 받은 id를 title로 변환시키는 것을 프론트단에서 처리
   * 이 경우 요청 - 응답의 type이 같아 POST 요청이 수월해짐
   * [1893455] => [1893455, 2353424] 이런 식으로
   * 하지만 id를 보내고 id를 받는다? => DB에 저장하는 것 자체가 중요하니 형식은 상관없을지도
   * 이 경우 모든 contentid를 title로 변환하는 작업을 할 때 여전히 비동기 호출에 따른 undefined 우려가 있음
   */

  async function addToSelectedDay() {
    const title = await getDestinationTitle(contentid);

    if (contentid && !updatedDestinations[selectedDay].includes(title)) {
      const copiedDestinations = [...updatedDestinations];
      // 기존에 목적지가 있거나 없는 경우
      copiedDestinations[selectedDay] = copiedDestinations[selectedDay] || [];
      copiedDestinations[selectedDay].push(title);
      setUpdatedDestinations(copiedDestinations);
      // onDestinationUpdate(updatedDestination);

      console.log('updatedDestinations', updatedDestinations);

      // 미리 id를 만들어서 해당 배열을 POST 요청하려고 한 2번 방법입니다.
      const copiedContentIds = [...updatedContentIds];
      copiedContentIds[selectedDay] = copiedContentIds[selectedDay] || [];
      copiedContentIds[selectedDay].push(contentid);
      setUpdatedContentIds(copiedContentIds);

      console.log('copiedContentIds', copiedContentIds);

      // const updatedDestinationsCopy = [...copiedDestinations];

      // 목적지들을 순회하면서 이름을 id로 바꾸어서 POST 요청을 보내려 한 1번 방법입니다.
      const titleToContentId = await Promise.all(
        updatedDestinations.map(
          async (days) =>
            await Promise.all(
              days.map(async (destinationTitle) => {
                const contentid = await getContentId(destinationTitle);
                return contentid;
              })
            )
        )
      );

      console.log('titleToContentId', titleToContentId);

      try {
        await tokenInstance.post(
          `https://vvhooping.com/api/schedules/${scheduleId}`,
          {
            destinations: titleToContentId
            // destinations: copiedContentIds
          }
        );
      } catch (err) {
        console.error('Error: ', err);
      }
    }
  }

  return (
    <div className={styles.scheduleDestination}>
      <div className={styles.destinationList}>
        {updatedDestinations[selectedDay].map((destination, idx) => (
          <div key={idx}>{destination}</div>
        ))}
        <button onClick={addToSelectedDay}>목적지 추가하기</button>
      </div>
    </div>
  );
}

export default AddToScheduleModal;
