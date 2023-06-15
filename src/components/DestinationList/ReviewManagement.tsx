import React, { useCallback, useEffect, useState } from 'react';
import styles from './ReviewManagement.module.scss';
import { commentType } from '../../types/DestinationListTypes';
import { useAuthState } from '../../contexts/AuthContext';
import AlertModal from '../common/Alert/AlertModal';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  deleteReviewByDestinationId,
  modifyReviewByCommentId
} from '../../apis/destinationListAPI';
import { TextField } from '@mui/material';

const ALERT_PROPS = {
  message: '로그인이 필요한 기능입니다.',
  showTitle: false
};

const REVIEW_MANAGEMENT_ALERT_PROPS = {
  comfirmModfyingMessage: '작성한 내용으로 수정하시겠습니까?',
  failedModifyingMessage: '리뷰 수정에 실패했습니다. 다시 시도해주세요',
  comfirmDeleteMessage: '리뷰를 삭제하시겠습니까?',
  failedDeleteMessage: '리뷰 삭제에 실패했습니다. 다시 시도해주세요',
  showTitle: false
};

const RESPONSE_STATUS = {
  MODIFY_SUCCESS: 200,
  DELETE_SUCCESS: 200
};

const REVIEW_HANDLER = {
  MAXIMUM_WORDS: 300
};

type ReviewManagementPropsType = {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  getReviewList: () => void;
  targetComment: number | null;
  setTargetComment: React.Dispatch<React.SetStateAction<number | null>>;
  commentid: number;
  isConfirmDelete: boolean;
  setIsConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  prevComment: string;
};

function ReviewManagement({
  isEditing,
  setIsEditing,
  getReviewList,
  targetComment,
  setTargetComment,
  commentid,
  isConfirmDelete,
  setIsConfirmDelete,
  prevComment
}: ReviewManagementPropsType) {
  const [modifiedReview, setModifiedReview] = useState<commentType>({
    comment: null
  });
  const { authState } = useAuthState();
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  const [isConfirmModifying, setIsConfirmModifying] = useState<boolean>(false);
  const [tryModify, setTryModify] = useState<boolean>(false);
  const [tryDelete, setTryDelete] = useState<boolean>(false);
  const navigate = useNavigate();
  const url = useLocation().pathname;

  //리뷰 수정 요청 메서드
  const modifyReview = useCallback(
    async (commentid: number, content: commentType) => {
      const res = await modifyReviewByCommentId(commentid, content);
      const status = res?.status;
      if (status === RESPONSE_STATUS.MODIFY_SUCCESS) {
        setModifiedReview(() => ({ comment: null }));
        getReviewList();
        return;
      }
      return;
    },
    [modifiedReview, modifyReviewByCommentId, setModifiedReview]
  );

  //리뷰 삭제 요청 메서드
  const deleteReview = useCallback(
    async (commentid: number) => {
      const res = await deleteReviewByDestinationId(commentid);
      const status = res?.status;
      if (status === RESPONSE_STATUS.DELETE_SUCCESS) {
        getReviewList();
        return;
      }
      return;
    },
    [getReviewList, deleteReviewByDestinationId]
  );

  useEffect(() => {
    setIsEditing(false);
  }, [setIsEditing]);

  const isNullishReviewInput = (input: string) => {
    return input === '';
  };

  //수정할 내용을 제출했을때 실행할 로직
  const handleModifiedReviewSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!authState.isLoggedIn) {
      setIsShowAlert(true);
      return;
    }

    const submittedModifiedReview = e.target.modifiedReview.value;
    if (isNullishReviewInput(submittedModifiedReview)) {
      alert(`수정할 내용을 입력해주세요.`);
      return;
    }
    setIsConfirmModifying(true);

    setModifiedReview(() => {
      return { comment: submittedModifiedReview };
    });
    return;
  };

  useEffect(() => {
    if (targetComment && tryModify) {
      modifyReview(targetComment, modifiedReview);
      setTargetComment(() => null);
      setIsEditing(() => false);
      setTryModify(false);
      return;
    }
  }, [
    modifiedReview,
    targetComment,
    setTargetComment,
    setIsEditing,
    setTryModify,
    tryModify,
    modifyReview
  ]);

  // 취소 버튼 => 수정 취소
  const cancelModifying = () => {
    setIsEditing(() => false);
  };

  useEffect(() => {
    if (tryDelete) {
      deleteReview(commentid);
    }
  }, [tryDelete, deleteReview]);

  const handleOnLoginConfirm = () => {
    setIsShowAlert(false);
    navigate('/login', { state: { prevUrl: url } });
  };

  const handleOnModifyConfirm = () => {
    setTryModify(true);
    setIsConfirmModifying(false);
    return;
  };
  const handleOnModifyCancel = () => {
    setTryModify(false);
    setIsConfirmModifying(false);
    setModifiedReview(() => ({ comment: null }));
    return;
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
    <>
      {isEditing && targetComment === commentid && (
        <div className={styles.modifyReviewContainer}>
          <form
            className={styles.reviewInputForm}
            onSubmit={handleModifiedReviewSubmit}
          >
            <TextField
              className={styles.reviewInputBar}
              type='text'
              name='modifiedReview'
              size='small'
              label='수정할 내용을 입력해주세요.'
              defaultValue={prevComment}
              inputProps={{ maxLength: REVIEW_HANDLER.MAXIMUM_WORDS }}
              multiline
              rows={5}
              sx={{
                '& label.Mui-focused': { color: '#ef6d00' },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#fe9036',
                    borderWidth: '1px'
                  }
                }
              }}
            />
            <div className={styles.reviewButtonContainer}>
              <button
                className={styles.reviewCancelButton}
                onClick={cancelModifying}
              >
                취소
              </button>
              <button className={styles.reviewSubmitButton} type='submit'>
                등록
              </button>
            </div>
          </form>
        </div>
      )}
      {isShowAlert && (
        <AlertModal
          message={ALERT_PROPS.message}
          onConfirm={handleOnLoginConfirm}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
      {isConfirmModifying && (
        <AlertModal
          message={REVIEW_MANAGEMENT_ALERT_PROPS.comfirmModfyingMessage}
          onConfirm={handleOnModifyConfirm}
          onCancel={handleOnModifyCancel}
          showCancelButton={true}
          showTitle={REVIEW_MANAGEMENT_ALERT_PROPS.showTitle}
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
    </>
  );
}

export default ReviewManagement;
