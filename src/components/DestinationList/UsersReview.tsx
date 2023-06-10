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
  modifyReviewByDestinationId
} from '../../apis/destinationList';

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
  DELETE_SUCCESS: 201
};

const REVIEW_STANDARDS = {
  MIN_LENGTH: 5
};

function UsersReview() {
  const [usersReview, setUsersReview] = useState<
    DestinationsReviewType[] | null
  >(null);
  const [modifiedReview, setModifiedReview] = useState<commentType>({
    comment: null
  });
  const [isEditing, setIsEditing] = useState<boolean[] | null>(null);
  const { authState, updateAuthState } = useAuthState();
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  const [isShowSuccessAlert, setIsShowSuccessAlert] = useState<boolean | null>(
    null
  );
  const navigate = useNavigate();

  //유저의 리뷰 조회
  const getUserReviewList = useCallback(async () => {
    const res = await getUsersReview();
    const usersReviewList = res?.data;
    setUsersReview(() => usersReviewList);
  }, []);

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
    console.log('editingArray 배열 생성');
    return;
  }, [usersReview]);

  //리뷰 수정 요청 메서드
  const modifyReview = useCallback(
    async (commentid: number) => {
      const res = await modifyReviewByDestinationId(commentid, modifiedReview);
      const status = res?.status;
      if (status === RESPONSE_STATUS.MODIFY_SUCCESS) {
        setIsShowSuccessAlert(true);
        return;
      }
      setIsShowSuccessAlert(false);
    },
    [modifiedReview]
  );

  //리뷰 삭제 요청 메서드
  const deleteReview = async (commentid: number) => {
    const res = await deleteReviewByDestinationId(commentid);
    const status = res?.status;
    if (status === RESPONSE_STATUS.DELETE_SUCCESS) {
      setIsShowSuccessAlert(true);
      return;
    }
    setIsShowSuccessAlert(false);
    return;
  };

  useEffect(() => console.log(modifiedReview), [modifiedReview]);

  const isNullishReviewInput = (input: string) => {
    return input === '' || input.length <= REVIEW_STANDARDS.MIN_LENGTH;
  };

  //수정할 내용을 제출했을때 실행할 로직
  const handleModifiedReviewSubmit = (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!authState.isLoggedIn) {
      setIsShowAlert(true);
      return;
    }
    const submittedModifiedReview = e.target.userReview.value;
    if (isNullishReviewInput(submittedModifiedReview)) {
      alert(
        `수정할 내용을 ${REVIEW_STANDARDS.MIN_LENGTH}자 이상 입력해주세요.`
      );
    }
    setModifiedReview(() => {
      return { comment: submittedModifiedReview };
    });
    //목록으로 돌려보내기
    return;
  };

  // 수정 버튼 클릭 이벤트 (수정 시작)
  const handleModifiedButtonOnClick = (index: number) => {
    if (!authState.isLoggedIn) {
      setIsShowAlert(true);
      return;
    }
    if (isEditing && isEditing.length > 0) {
      const newIsEditing = [...isEditing];
      newIsEditing[index] = true;
      setIsEditing(newIsEditing);
      return;
    }
  };

  //수정 submit 이벤트 (수정 완료)
  const handleModifiedDone = async (index: number, commentid: number) => {
    if (modifiedReview.comment !== null) {
      await modifyReview(commentid);
    }
    if (isEditing && isEditing.length > 0) {
      const newIsEditing = [...isEditing];
      newIsEditing[index] = false;
      setIsEditing(newIsEditing);
      return;
    }
    return;
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

  const handleOnLoginConfirm = () => {
    setIsShowAlert(false);
    navigate('/login');
  };

  const handleOnReviewConfirm = () => {
    setIsShowSuccessAlert(null);
  };

  /*
   * 리뷰 객체
  id: number;
  commenter_id: string;
  comment: string;
  created_at: string; */

  return (
    <div>
      <div className={styles.usersReviewContainer}>
        <div>{`[내 리뷰 목록]`}</div>

        {usersReview?.map((review, index) => {
          return isEditing !== null && !isEditing[index] ? (
            <div key={index} className={styles.usersReviewBox}>
              <p>{review.comment_id}</p>
              <p>{review.comment}</p>
              <p>{review.created_at}</p>
              <p>{review.updated_at}</p>
              <button onClick={() => handleModifiedButtonOnClick(index)}>
                수정
              </button>
              <button
                onClick={() => handleDeleteOnClick(index, review.comment_id)}
              >
                삭제
              </button>
            </div>
          ) : (
            <div
              key={index}
              className={styles.usersReviewBox}
              id={styles.modifyReviewBox}
            >
              <form
                className={styles.reviewBar}
                onSubmit={handleModifiedReviewSubmit}
              >
                <input
                  id={styles.usersReviewBar}
                  type='text'
                  name='userReview'
                  defaultValue={review.comment}
                />
                <button
                  id={styles.reviewSubmmitButton}
                  type='submit'
                  onClick={() => handleModifiedDone(index, review.comment_id)}
                >
                  완료
                </button>
              </form>
            </div>
          );
        })}
      </div>
      {isShowAlert && (
        <AlertModal
          message={ALERT_PROPS.message}
          onConfirm={handleOnLoginConfirm}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
      {isShowSuccessAlert && (
        <AlertModal
          message={SUCCESS_ALERT_PROPS.successModifyingMessage}
          onConfirm={handleOnReviewConfirm}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
      {isShowSuccessAlert === false && (
        <AlertModal
          message={SUCCESS_ALERT_PROPS.failedModifyingMessage}
          onConfirm={handleOnReviewConfirm}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
    </div>
  );
}

export default UsersReview;
