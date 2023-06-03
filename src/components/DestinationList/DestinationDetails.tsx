import React, { useState } from 'react';
import { DestinationsType } from './Types';
import styles from './DestinationDetails.module.scss';
import { RiThumbUpFill } from 'react-icons/ri';
import { RiThumbUpLine } from 'react-icons/ri';

type DestinationDetailsPropsType = {
  clickedDestination: DestinationsType | null;
  setClickedDestination: React.Dispatch<
    React.SetStateAction<DestinationsType | null>
  >;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DestinationDetails({
  clickedDestination,
  setClickedDestination,
  setIsOpen
}: DestinationDetailsPropsType) {
  const [likes, setLikes] = useState<boolean>(false);
  const destination = clickedDestination;

  const toggleDetailPage = () => {
    setIsOpen(() => false);
    setClickedDestination(() => null);
  };

  const handleLikesClick = () => {
    /*좋아요 요청(백엔드 요청)*/
    setLikes(() => !likes);
  };

  return (
    <>
      {destination !== null && (
        <div className={styles.destinationDetailsContainer}>
          <div className={styles.detailsButtonContainer}>
            <button
              className={styles.detailsCloseButton}
              onClick={toggleDetailPage}
            >
              X
            </button>
          </div>
          <section className={styles.destinationDetails}>
            <h2>{destination.title}</h2>
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
          <section className={styles.detailsReviewsContainer}></section>
        </div>
      )}
    </>
  );
}

export default DestinationDetails;
