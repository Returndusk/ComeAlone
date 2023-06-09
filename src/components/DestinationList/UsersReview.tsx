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

function UsersReview() {
  const [usersReview, setUsersReview] = useState<
    DestinationsReviewType[] | null
  >(null);
  const [modifiedReview, setModifiedReview] = useState<commentType>({
    comment: null
  });
  const [isEditing, setIsEditing] = useState<boolean[] | []>([]);
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
    const userReviewCount = usersReview?.length ?? 0;
    if (userReviewCount > 0) {
      const editingArray = Array.from({ length: userReviewCount }, () => false);
      setIsEditing(editingArray);
    }
    return;
  }, [getUserReviewList, usersReview]);

  //리뷰 수정 요청 메서드
  const modifyReview = useCallback(
    async (commentid: number) => {
      const res = await modifyReviewByDestinationId(commentid, modifiedReview);
      const status = res?.status;
      if (status === 201) {
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
    if (status === 201) {
      setIsShowSuccessAlert(true);
      return;
    }
    setIsShowSuccessAlert(false);
  };

  useEffect(() => console.log(modifiedReview), [modifiedReview]);

  const isNullishReviewInput = (input: string) => {
    return input === '' || input.length <= 5;
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
    const submittedModifiedReview = e.target.value;
    if (isNullishReviewInput(submittedModifiedReview)) {
      alert('수정할 내용을 5자 이상 입력해주세요.');
    }
    setModifiedReview(() => submittedModifiedReview);
    return;
  };

  const handleModifeidDone = (index: number, commentid: number) => {
    modifyReview(commentid);
    const newIsEditing = [...isEditing];
    newIsEditing[index] = false;
    setIsEditing(newIsEditing);
  };

  const handleModifiedButtonOnClick = (index: number) => {
    if (authState.isLoggedIn) {
      const newIsEditing = [...isEditing];
      newIsEditing[index] = true;
      setIsEditing(newIsEditing);
    } else {
      setIsShowAlert(true);
    }
  };

  const handleDeleteOnClick = (commentid: number) => {
    if (authState.isLoggedIn) {
      deleteReview(commentid);
      //isEditing 관리해야하는지 확인하기
    } else {
      setIsShowAlert(true);
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
        <div>{`내 리뷰 목록`}</div>

        {usersReview?.map((review, index) => {
          return !isEditing[index] ? (
            <div key={index}>
              <p>{review.id}</p>
              <p>{review.comment}</p>
              <p>{review.created_at}</p>
              <button onClick={() => handleModifiedButtonOnClick(index)}>
                수정
              </button>
              <button onClick={() => handleDeleteOnClick(review.id)}>
                삭제
              </button>
            </div>
          ) : (
            <div key={index}>
              <form
                className={styles.reviewBar}
                onSubmit={handleModifiedReviewSubmit}
              >
                <input
                  id={styles.usersReviewBar}
                  type='text'
                  name='review'
                  defaultValue={review.comment}
                />
                <button
                  id={styles.reviewSubmmitButton}
                  type='submit'
                  onClick={() => handleModifeidDone(index, review.id)}
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
