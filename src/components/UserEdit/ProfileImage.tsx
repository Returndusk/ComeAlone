import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { uploadProfileImage } from '../../apis/UserAPI';
import { useAuthState } from '../../contexts/AuthContext';
import { IoMdSettings } from 'react-icons/io';
import { FaTrashAlt } from 'react-icons/fa';
import { Avatar } from '@mui/material';
import styles from './ProfileImage.module.scss';
import AlertModal from '../common/Alert/AlertModal';

const IMAGE_MAX_SIZE = 5 * 1024 * 1024;

type ConfirmOption = {
  isOpen: boolean;
  message: string;
  onConfirm: null | (() => void);
  onCancel: null | (() => void);
};

type AlertOption = {
  isOpen: boolean;
  message: string;
  onConfirm: null | (() => void);
};

type ProfileImageProps = {
  handleChange: (imagePath: string) => void;
  handleImageRemove: () => void;
  image: string;
};

function ProfileImage({
  handleChange,
  handleImageRemove,
  image
}: ProfileImageProps) {
  const { authState, updateAuthState } = useAuthState();
  const initAlert = {
    isOpen: false,
    message: '',
    onConfirm: null
  };
  const initConfirm = {
    isOpen: false,
    message: '',
    onConfirm: null,
    onCancel: null
  };
  const [alertModal, setAlertModal] = useState<AlertOption>(initAlert);
  const [confirmModal, setConfirmModal] = useState<ConfirmOption>(initConfirm);

  const confirmDeleteImage = async () => {
    setConfirmModal({
      isOpen: true,
      message: '정말 삭제하시겠습니까?',
      onConfirm: () => {
        setConfirmModal(initConfirm);
        handleImageRemove();
      },
      onCancel: () => setConfirmModal(initConfirm)
    });
  };

  const validateFile = (file: File) => {
    const allowedTypes = ['png', 'jpg', 'jpeg'];
    const fileType = file.name.split('.').pop()?.toLowerCase();

    if (!fileType || !allowedTypes.includes(fileType)) {
      return '허용되지 않은 파일 형식입니다. PNG, JPG, JPEG 파일만 업로드해주세요.';
    }

    if (file.size > IMAGE_MAX_SIZE) {
      return '파일 크기가 5MB를 초과합니다.';
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const selectedFile = e.target.files[0];
    const validationError = validateFile(selectedFile);
    if (validationError) {
      return setAlertModal({
        isOpen: true,
        message: validationError,
        onConfirm: () => setAlertModal(initAlert)
      });
    }

    try {
      const data = new FormData();
      data.append('file', selectedFile);
      const response = await uploadProfileImage(data);

      if (response.status === 201) {
        const imagePath = response.data.imagePath;
        handleChange(imagePath);
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          if (
            err.response.data.reason === 'INVALID' ||
            err.response.data.reason === 'EXPIRED'
          ) {
            return setAlertModal({
              isOpen: true,
              message: '로그인 상태가 아닙니다. 다시 로그인해주세요.',
              onConfirm: () => updateAuthState(false)
            });
          }
        }

        if (err.response?.status === 415) {
          return setAlertModal({
            isOpen: true,
            message: err.response.data.message,
            onConfirm: () => setAlertModal(initAlert)
          });
        }
      }

      setAlertModal({
        isOpen: true,
        message: '프로필 이미지 업로드에 실패하였습니다.',
        onConfirm: () => setAlertModal(initAlert)
      });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.buttonBox}>
            <label
              htmlFor='profileImage'
              className={styles.imageChangeBtn}
              title='JPG, JPEG, PNG 파일 (5MB 이하)'
            >
              <IoMdSettings />
            </label>
            <input
              type='file'
              name='profileImage'
              id='profileImage'
              accept='image/*'
              className={styles.hidden}
              onChange={handleUpload}
            />
          </div>
          <div className={styles.imageBox}>
            {image && (
              <>
                <Avatar
                  src={image}
                  className={styles.image}
                  alt='프로필 이미지'
                />
                <div
                  className={styles.deleteImage}
                  onClick={confirmDeleteImage}
                >
                  <FaTrashAlt />
                </div>
              </>
            )}
            {!image && (
              <Avatar className={styles.image} alt='프로필 이미지'>
                <span>{authState?.user?.nickname[0]}</span>
              </Avatar>
            )}
          </div>
        </div>
      </div>
      {alertModal.isOpen && alertModal.onConfirm && (
        <AlertModal
          message={alertModal.message}
          onConfirm={alertModal.onConfirm}
        />
      )}
      {confirmModal.isOpen &&
        confirmModal.onConfirm &&
        confirmModal.onCancel && (
          <AlertModal
            message={confirmModal.message}
            onConfirm={confirmModal.onConfirm}
            onCancel={confirmModal.onCancel}
            showCancelButton={true}
          />
        )}
    </>
  );
}

export default ProfileImage;
