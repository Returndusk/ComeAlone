import React, { useCallback, useEffect, useState } from 'react';
import styles from './UsersReview.module.scss';
import { DestinationsReviewType } from '../../types/DestinationListTypes';
import { useAuthState } from '../../contexts/AuthContext';
import AlertModal from '../common/Alert/AlertModal';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  deleteReviewByDestinationId,
  getUsersReview
} from '../../apis/destinationListAPI';
import { FaTrashAlt } from 'react-icons/fa';
import { CiCircleAlert } from 'react-icons/ci';

const ALERT_PROPS = {
  message: '로그인이 필요한 기능입니다.',
  showTitle: false
};

const REVIEW_MANAGEMENT_ALERT_PROPS = {
  comfirmDeleteMessage: '리뷰를 삭제하시겠습니까?',
  failedDeleteMessage: '리뷰 삭제에 실패했습니다. 다시 시도해주세요',
  showTitle: false
};

const RESPONSE_STATUS = {
  DELETE_SUCCESS: 200
};

function UsersReview() {
  const [usersReview, setUsersReview] = useState<
    DestinationsReviewType[] | null
  >(null);
  const [isConfirmDelete, setIsConfirmDelete] = useState<boolean>(false);
  const [tryDelete, setTryDelete] = useState<boolean>(false);
  const [targetComment, setTargetComment] = useState<number | null>(null);
  const { authState } = useAuthState();
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  const navigate = useNavigate();
  const url = useLocation().pathname;

  //유저의 리뷰 조회
  const getUserReviewList = useCallback(async () => {
    const res = await getUsersReview();
    const usersReviewList = res?.data;
    setUsersReview(() => usersReviewList);
  }, [setUsersReview]);

  useEffect(() => {
    getUserReviewList();
  }, [getUserReviewList]);

  //리뷰 삭제 요청 메서드
  const deleteReview = useCallback(
    async (commentid: number) => {
      const res = await deleteReviewByDestinationId(commentid);
      const status = res?.status;
      if (status === RESPONSE_STATUS.DELETE_SUCCESS) {
        getUserReviewList();
        return;
      }
      return;
    },
    [getUserReviewList, deleteReviewByDestinationId]
  );

  const handleDeleteOnClick = async (commentid: number) => {
    if (!authState.isLoggedIn) {
      setIsShowAlert(true);
      return;
    }
    setTargetComment(() => commentid);
    setIsConfirmDelete(() => true);
  };

  useEffect(() => {
    if (tryDelete && targetComment) {
      deleteReview(targetComment);
    }
    return;
  }, [tryDelete, deleteReview, targetComment]);

  //리뷰 등록일자 가공 매서드
  const changeCreatedAtIntoDate = (date: string) => {
    const reviewDate = new Date(date);
    const year = reviewDate.getFullYear();
    const month = reviewDate.getMonth() + 1;
    const day = reviewDate.getDate();
    const hour = reviewDate.getHours().toString().padStart(2, '0');
    const minute = reviewDate.getMinutes().toString().padStart(2, '0');
    return `${year}.${month}.${day} ${hour}:${minute}`;
  };

  const handleOnLoginConfirm = () => {
    setIsShowAlert(false);
    navigate('/login', { state: { prevUrl: url } });
  };

  const handleOnDeleteConfirm = () => {
    setTryDelete(true);
    setIsConfirmDelete(false);
    return;
  };

  const handleOnDeleteCancel = () => {
    setTryDelete(false);
    setIsConfirmDelete(false);
    return;
  };

  return (
    <div>
      <div className={styles.usersReviewContainer}>
        {usersReview && (
          <span
            className={styles.usersReviewCounter}
          >{`전체ㆍ${usersReview?.length}`}</span>
        )}
        {Array.isArray(usersReview) && usersReview?.length > 0 && (
          <>
            {usersReview?.map((review, index) => {
              return (
                <div key={index} className={styles.usersReviewBox}>
                  <div className={styles.destinationInfo}>
                    {review?.destination.image2 && (
                      <img
                        id={styles.reviewImage}
                        src={review?.destination.image2}
                        alt={review.destination.title}
                      />
                    )}
                    <div className={styles.reviewHandleContainer}>
                      <NavLink
                        to={`/destination/list/${review.destination.id}`}
                        className={styles.usersReviewTitle}
                      >
                        {review.destination.title}
                      </NavLink>

                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteOnClick(review.comment_id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>

                  <p className={styles.usersReviewCreatedDate}>
                    {changeCreatedAtIntoDate(review.created_at)}
                  </p>

                  <p className={styles.usersReviewComment}>{review.comment}</p>
                </div>
              );
            })}
          </>
        )}
        {Array.isArray(usersReview) && usersReview?.length === 0 && (
          <div className={styles.alertContainer}>
            <CiCircleAlert className={styles.alertIcon} />
            <p>작성하신 리뷰가 없습니다.</p>
          </div>
        )}
      </div>
      {isShowAlert && (
        <AlertModal
          message={ALERT_PROPS.message}
          onConfirm={handleOnLoginConfirm}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
      {isConfirmDelete && (
        <AlertModal
          message={REVIEW_MANAGEMENT_ALERT_PROPS.comfirmDeleteMessage}
          onConfirm={handleOnDeleteConfirm}
          onCancel={handleOnDeleteCancel}
          showCancelButton={true}
          showTitle={REVIEW_MANAGEMENT_ALERT_PROPS.showTitle}
        />
      )}
    </div>
  );
}

export default UsersReview;
