import React, { useCallback, useEffect, useState } from 'react';
import styles from './UsersReview.module.scss';
import {
  DestinationsReviewType,
  commentType
} from '../../types/DestinationListTypes';
import { useAuthState } from '../../contexts/AuthContext';
import AlertModal from '../common/Alert/AlertModal';
import { useNavigate } from 'react-router-dom';
import {
  deleteReviewByDestinationId,
  getUsersReview,
  modifyReviewByCommentId
} from '../../apis/destinationList';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { CiCircleAlert } from 'react-icons/ci';

const ALERT_PROPS = {
  message: '로그인이 필요한 기능입니다.',
  showTitle: false
};

const SUCCESS_ALERT_PROPS = {
  successModifyingMessage: '리뷰 수정에 성공했습니다.',
  failedModifyingMessage: '리뷰 수정에 실패했습니다. 다시 시도해주세요',
  successDeleteMessage: '리뷰 삭제에 성공했습니다.',
  failedDeleteMessage: '리뷰 삭제에 실패했습니다. 다시 시도해주세요',
  showTitle: false
};

const RESPONSE_STATUS = {
  MODIFY_SUCCESS: 200,
  DELETE_SUCCESS: 200
};

function UsersReview() {
  const [usersReview, setUsersReview] = useState<
    DestinationsReviewType[] | null
  >(null);
  const [modifiedReview, setModifiedReview] = useState<commentType>({
    comment: null
  });
  const [isEditing, setIsEditing] = useState<boolean[] | null>(null);
  const [targetComment, setTargetComment] = useState<number | null>(null);
  const { authState } = useAuthState();
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  const [isShowModifySuccess, setIsShowModifySuccess] =
    useState<boolean>(false);
  const [isShowDeleteSuccess, setIsShowDeleteSuccess] =
    useState<boolean>(false);
  const [isShowModifyFailed, setIsShowModifyFailed] = useState<boolean>(false);
  const [isShowDeleteFailed, setIsShowDeleteFailed] = useState<boolean>(false);
  const navigate = useNavigate();

  //유저의 리뷰 조회
  const getUserReviewList = useCallback(async () => {
    const res = await getUsersReview();
    const usersReviewList = res?.data;
    setUsersReview(() => usersReviewList);
  }, [setUsersReview]);

  useEffect(() => {
    getUserReviewList();
  }, [getUserReviewList]);

  //유저 리뷰목록을 상태관리할 배열 생성
  useEffect(() => {
    const userReviewCount = usersReview?.length ?? 0;
    if (userReviewCount > 0) {
      const editingArray = Array.from({ length: userReviewCount }, () => false);
      setIsEditing(editingArray);
    }
    return;
  }, [usersReview, setIsEditing]);

  //리뷰 수정 요청 메서드
  const modifyReview = useCallback(
    async (commentid: number, content: commentType) => {
      const res = await modifyReviewByCommentId(commentid, content);
      const status = res?.status;
      if (status === RESPONSE_STATUS.MODIFY_SUCCESS) {
        setModifiedReview(() => ({ comment: null }));
        return;
      }
      setIsShowModifyFailed(true);
      return;
    },
    [
      modifiedReview,
      setIsShowModifyFailed,
      modifyReviewByCommentId,
      setModifiedReview
    ]
  );

  //리뷰 삭제 요청 메서드
  const deleteReview = useCallback(
    async (commentid: number) => {
      const res = await deleteReviewByDestinationId(commentid);
      const status = res?.status;
      if (status === RESPONSE_STATUS.DELETE_SUCCESS) {
        setIsShowDeleteSuccess(true);
        await getUserReviewList();
        return;
      }
      setIsShowDeleteFailed(true);
      return;
    },
    [
      setIsShowDeleteSuccess,
      getUserReviewList,
      setIsShowDeleteFailed,
      deleteReviewByDestinationId
    ]
  );

  const isNullishReviewInput = (input: string) => {
    return input === '';
  };

  //수정할 내용을 제출했을때 실행할 로직
  const handleModifiedReviewSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    commentid: number
  ) => {
    e.preventDefault();
    if (!authState.isLoggedIn) {
      setIsShowAlert(true);
      return;
    }
    const eventTarget = e.target as HTMLFormElement;
    const submittedModifiedReview = eventTarget.userReview.value;
    if (isNullishReviewInput(submittedModifiedReview)) {
      alert(`수정할 내용을 입력해주세요.`);
      return;
    }
    setTargetComment(() => commentid);
    setModifiedReview(() => {
      return { comment: submittedModifiedReview };
    });
    return;
  };

  useEffect(() => {
    if (targetComment) {
      modifyReview(targetComment, modifiedReview);
      setTargetComment(null);
      setIsShowModifySuccess(true);
      getUserReviewList();
    }
  }, [modifiedReview, targetComment, setTargetComment]);

  // 수정 버튼 클릭 이벤트 (수정 시작)
  const handleModifiedButtonOnClick = (index: number) => {
    if (!authState.isLoggedIn) {
      setIsShowAlert(true);
      return;
    }
    if (isEditing && isEditing.length > 0) {
      const newIsEditing = [...isEditing];
      newIsEditing[index] = true;
      setIsEditing(() => newIsEditing);
      return;
    }
  };

  const handleDeleteOnClick = async (index: number, commentid: number) => {
    if (!authState.isLoggedIn) {
      setIsShowAlert(true);
      return;
    }
    await deleteReview(commentid);
    if (isEditing && isEditing.length > 0) {
      const newIsEditing = [...isEditing];
      newIsEditing.splice(index, 1);
      setIsEditing(newIsEditing);
      return;
    }
  };

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
    navigate('/login');
  };

  const handleModifySuccessConfirm = () => {
    setIsShowModifySuccess(false);
    return;
  };

  const handleModifyFailedConfirm = () => {
    setIsShowModifyFailed(false);
    return;
  };

  const handleDeleteSuccessConfirm = () => {
    setIsShowDeleteSuccess(false);
    return;
  };

  const handleDeleteFailedConfirm = () => {
    setIsShowDeleteFailed(false);
    return;
  };

  /*
   * 리뷰 객체
  id: number;
  commenter_id: string;
  comment: string;
  created_at: string; 
  */

  return (
    <div>
      <div className={styles.usersReviewContainer}>
        <span
          className={styles.usersReviewCounter}
        >{`전체ㆍ${usersReview?.length}`}</span>
        {Array.isArray(usersReview) && usersReview?.length > 0 && (
          <>
            {usersReview?.map((review, index) => {
              return isEditing !== null && !isEditing[index] ? (
                <div key={index} className={styles.usersReviewBox}>
                  <div className={styles.destinationInfo}>
                    {review?.destination.image2 ? (
                      <img
                        id={styles.reviewImage}
                        src={review?.destination.image2}
                        alt={review.destination.title}
                      />
                    ) : (
                      <span></span>
                    )}

                    <p className={styles.usersReviewTitle}>
                      {review.destination.title}
                    </p>
                    {!isEditing.includes(true) && (
                      <div className={styles.reviewHandleButtonContainer}>
                        {/* <button
                          className={styles.modifyButton}
                          onClick={() => handleModifiedButtonOnClick(index)}
                        >
                          <FaPen />
                        </button> */}
                        <button
                          className={styles.deleteButton}
                          onClick={() =>
                            handleDeleteOnClick(index, review.comment_id)
                          }
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    )}
                  </div>

                  <p className={styles.usersReviewCreatedDate}>
                    {changeCreatedAtIntoDate(review.created_at)}
                  </p>

                  <p className={styles.usersReviewComment}>{review.comment}</p>
                </div>
              ) : (
                <div
                  key={index}
                  className={styles.usersReviewBox}
                  id={styles.modifyReviewBox}
                >
                  <form
                    className={styles.reviewBar}
                    onSubmit={async (e) =>
                      await handleModifiedReviewSubmit(e, review.comment_id)
                    }
                  >
                    <input
                      id={styles.usersReviewBar}
                      type='text'
                      name='userReview'
                      defaultValue={review.comment}
                    />
                    <button id={styles.reviewSubmmitButton} type='submit'>
                      완료
                    </button>
                  </form>
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
      {isShowModifySuccess && (
        <AlertModal
          message={SUCCESS_ALERT_PROPS.successModifyingMessage}
          onConfirm={handleModifySuccessConfirm}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
      {isShowModifyFailed && (
        <AlertModal
          message={SUCCESS_ALERT_PROPS.failedModifyingMessage}
          onConfirm={handleModifyFailedConfirm}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
      {isShowDeleteSuccess && (
        <AlertModal
          message={SUCCESS_ALERT_PROPS.successDeleteMessage}
          onConfirm={handleDeleteSuccessConfirm}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
      {isShowDeleteFailed && (
        <AlertModal
          message={SUCCESS_ALERT_PROPS.failedDeleteMessage}
          onConfirm={handleDeleteFailedConfirm}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
    </div>
  );
}

export default UsersReview;
