import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../components/ScheduleDetail/ScheduleDetail.module.scss';
import {
  ImageScheduleDetail,
  InfoScheduleDetail,
  IconsScheduleDetail,
  DestinationList,
  ReviewsSchedule,
  InputReviewSchedule
} from '../components/ScheduleDetail';
import MapWithWaypoints from '../components/common/Map/MapWithWaypoints';
import {
  destinations,
  schedule,
  likesAmount,
  reviewsAmount,
  reviews
} from '../components/ScheduleDetail/Dummy';
import { DestinationsType } from '../components/DestinationList/Types';

function ScheduleDetail() {
  const [reviewInput, setReviewInput] = useState('');
  const [checkedDestinations, setCheckedDestinations] = useState(
    destinations.flat()
  );

  const onDestinationsChecked = (destinations: DestinationsType[]) => {
    setCheckedDestinations(destinations);
  };

  const onReviewSubmit = (input: string) => {
    setReviewInput(input);
  };

  return (
    <div className={styles.container}>
      <ImageScheduleDetail image={schedule.image} />
      <InfoScheduleDetail schedule={schedule} />
      <div className={styles.editButtonContainer}>
        <Link to='/schedule/edit' className={styles.editButton}>
          수정하기
        </Link>
      </div>
      <IconsScheduleDetail
        likesAmount={likesAmount}
        reviewsAmount={reviewsAmount}
      />
      <DestinationList
        destinations={destinations}
        onChecked={onDestinationsChecked}
      />
      <div className={styles.mapContainer}>
        <MapWithWaypoints markersLocations={checkedDestinations} />
      </div>
      <ReviewsSchedule reviews={reviews} />
      <InputReviewSchedule onSubmit={onReviewSubmit} />
      {reviewInput}
    </div>
  );
}

export default ScheduleDetail;
