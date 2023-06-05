import React, { useMemo, useState } from 'react';
import styles from './DestinationDetails.module.scss';
import { RiThumbUpFill } from 'react-icons/ri';
import { RiThumbUpLine } from 'react-icons/ri';
import Review from './Review';
import { useParams } from 'react-router-dom';

const DEFAULT_DESTINATIONS = [
  {
    title: '제주도 시청',
    mapy: 33.48907969999994,
    mapx: 126.49932809999973,
    tel: '064-772-3366',
    overview: '개요 설명입니다.',
    contenttypeid: '32',
    contentid: '0'
  },
  {
    title: '한라산',
    mapy: 33.37915262371278,
    mapx: 126.54626368383182,
    tel: '064-772-3366',
    overview: '개요 설명입니다.',
    contenttypeid: '12',
    contentid: '1'
  },
  {
    title: '서귀포 해양 도립공원',
    mapy: 33.241570451808215,
    mapx: 126.55770550692283,
    tel: '064-772-3366',
    overview: '개요 설명입니다.',
    contenttypeid: '25',
    contentid: '2'
  },
  {
    title: '금오름',
    mapy: 33.35452764241429,
    mapx: 126.30590904987518,
    tel: '064-772-3366',
    overview: '개요 설명입니다.',
    contenttypeid: '12',
    contentid: '3'
  }
];

function DestinationDetails() {
  const [likes, setLikes] = useState<boolean>(false);
  const { contentid } = useParams();

  const destination = useMemo(() => {
    return DEFAULT_DESTINATIONS.find((des) => des.contentid === contentid);
  }, [contentid]);

  const handleLikesClick = () => {
    /*좋아요 요청(백엔드 요청)*/
    setLikes(() => !likes);
  };

  return (
    <>
      {destination !== null && (
        <div className={styles.destinationDetailsContainer}>
          <section className={styles.destinationDetails}>
            <h2>{destination?.title}</h2>
            <p>전화번호:{destination?.tel}</p>
            <div>{destination?.overview}</div>

            <button
              className={styles.detailsLikesButton}
              onClick={handleLikesClick}
            >
              {likes ? (
                <RiThumbUpFill className={styles.detailsLikesUpButton} />
              ) : (
                <RiThumbUpLine className={styles.detailsLikesCancelButton} />
              )}
            </button>
            <div>{/*<button>내 일정에 추가</button>*/}</div>
          </section>
          <section className={styles.detailsReviewsContainer}>
            <Review clickedDestination={destination ?? null} />
          </section>
        </div>
      )}
    </>
  );
}

export default DestinationDetails;
