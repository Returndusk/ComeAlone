import React, { useCallback, useEffect, useState } from 'react';
import styles from './ScheduleCard.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { ScheduleCardType } from '../../types/ScheduleTypes';
import { FaHeart, FaRegHeart, FaRegDotCircle } from 'react-icons/fa';
import { useAuthState } from '../../contexts/AuthContext';
import ROUTER from '../../constants/Router';
import tokenInstance from '../../apis/tokenInstance';
import AlertModal from '../common/Alert/AlertModal';

type ScheduleCardProps = { schedule: ScheduleCardType };
const baseUrl = process.env.REACT_APP_API_BASE_URL;

function ScheduleCard({ schedule }: ScheduleCardProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [showLikeAlertModal, setShowLikeAlertModal] = useState<boolean>(false);
  const [showLoginAlertModal, setShowLoginAlertModal] =
    useState<boolean>(false);
  const { authState } = useAuthState();
  const isLoggedIn = authState.isLoggedIn;
  const navigate = useNavigate();

  const fetchLike = useCallback(async () => {
    try {
      const response = await tokenInstance.get(
        `${baseUrl}/schedules/${schedule.schedule_id}/likes`
      );
      const { is_liked, likes_count_of_schedule } = response.data;
      setIsLiked(is_liked);
      setLikeCount(likes_count_of_schedule);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const postLike = useCallback(async () => {
    try {
      const response = await tokenInstance.post(
        `${baseUrl}/schedules/${schedule.schedule_id}/likes`
      );
      const { is_liked, likes_count_of_schedule } = response.data;
      setIsLiked(is_liked);
      setLikeCount(likes_count_of_schedule);
    } catch (error) {
      setShowLikeAlertModal(true);
    }
  }, []);

  useEffect(() => {
    fetchLike();
  }, [fetchLike]);

  function handleLike(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    if (isLoggedIn) {
      postLike();
    } else {
      setShowLoginAlertModal(true);
    }
  }

  function handleLikeConfirm() {
    setShowLikeAlertModal(false);
  }

  function handleLoginConfirm() {
    setShowLoginAlertModal(false);
    navigate(ROUTER.LOGIN);
  }

  function handleLoginCancel() {
    setShowLoginAlertModal(false);
  }

  return (
    <>
      <Link
        to={`${ROUTER.SCHEDULE_DETAIL}/${schedule.schedule_id}`}
        className={styles.scheduleCard}
      >
        <div className={styles.scheduleCardContent}>
          <div className={styles.scheduleContent}>
            <div className={styles.scheduleText}>
              <div className={styles.scheduleTitle}>
                {schedule.title ? schedule.title : '여행 이름'}
              </div>
              <div>{schedule.summary ? schedule.summary : '여행 소개'}</div>
              <div>
                {schedule.duration - 1}박 {schedule.duration}일
              </div>
              <div>작성자 : {schedule.user.nickname}</div>
            </div>
            <div className={styles.like}>
              <div
                className={styles.likeIcon}
                onClick={(e) => {
                  handleLike(e);
                }}
              >
                {isLiked ? <FaHeart /> : <FaRegHeart />}
              </div>
              {isLoggedIn ? likeCount : schedule.likes_count}
            </div>
          </div>
          <div className={styles.scheduleDestination}>
            <div className={styles.destinationMap}>
              <FaRegDotCircle />
              <div className={styles.mapLineContainer}>
                <div className={styles.mapLine}></div>
              </div>
              <div className={styles.destinationCount}>
                경유{' '}
                {schedule.destination_count - 2 > 0
                  ? schedule.destination_count - 2
                  : 0}
              </div>
              <FaRegDotCircle />
            </div>
            <div className={styles.destinationText}>
              <div>
                {schedule.first_destination
                  ? schedule.first_destination
                  : '출발지 없음'}
              </div>
              <div>
                {schedule.last_destination
                  ? schedule.last_destination
                  : '도착지 없음'}
              </div>
            </div>
          </div>
          <img
            src={
              schedule.image
                ? schedule.image
                : 'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg'
            }
            className={styles.image}
            alt='일정 배경 사진'
          />
        </div>
      </Link>
      {showLikeAlertModal && (
        <AlertModal
          message='자신의 일정에는 좋아요를 누를 수 없습니다.'
          onConfirm={handleLikeConfirm}
        />
      )}
      {showLoginAlertModal && (
        <AlertModal
          message='로그인이 필요합니다.'
          onConfirm={handleLoginConfirm}
          onCancel={handleLoginCancel}
          showCancelButton={true}
        />
      )}
    </>
  );
}

export default ScheduleCard;
