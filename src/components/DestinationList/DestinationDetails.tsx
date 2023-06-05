import React, { useMemo, useState } from 'react';
import styles from './DestinationDetails.module.scss';
import { RiThumbUpFill } from 'react-icons/ri';
import { RiThumbUpLine } from 'react-icons/ri';
import Review from './Review';
import { useParams } from 'react-router-dom';
import { DEFAULT_DESTINATIONS } from './Dummy';

function DestinationDetails() {
  const [likes, setLikes] = useState<boolean>(false);
  const { contentid } = useParams();

  const destination = useMemo(() => {
    return DEFAULT_DESTINATIONS.find((des) => des.id === Number(contentid));
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
            <Review />
          </section>
        </div>
      )}
    </>
  );
}

export default DestinationDetails;
