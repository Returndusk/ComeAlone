import React, { useState, useRef, useCallback, ChangeEvent } from 'react';
import styles from './ImageScheduleEdit.module.scss';
import { updateScheduleImageById } from '../../apis/ScheduleEditAPI';
import AlertModal from '../common/Alert/AlertModal';
import { FaTrashAlt } from 'react-icons/fa';

const MAXIMUM_IMAGE_SIZE = 5242880;

function ImageScheduleEdit({
  scheduleId,
  imagePath,
  onImageUpdate
}: {
  scheduleId: string;
  imagePath: string;
  onImageUpdate: (imagePath: string) => void;
}) {
  const [showUpdateAlert, setShowUpdateAlert] = useState<boolean>(false);
  const [showImageSizeAlert, setShowImageSizeAlert] = useState<boolean>(false);
  const updatedImageFile = useRef<Blob>();
  const updatedImagePath = useRef<string>(imagePath);

  const updateScheduleImage = useCallback(async () => {
    const formData = new FormData();

    formData.append('file', updatedImageFile.current as Blob);

    const response = await updateScheduleImageById(scheduleId, formData);

    updatedImagePath.current = response?.data.imagePath;
    onImageUpdate(response?.data.imagePath);
    setShowUpdateAlert(false);
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedImage = (event.target.files as FileList)[0];

    if (!uploadedImage) {
      return;
    }

    if (uploadedImage.size >= MAXIMUM_IMAGE_SIZE) {
      setShowImageSizeAlert(true);
    } else {
      updatedImageFile.current = uploadedImage;
      setShowUpdateAlert(true);
    }
  };

  return (
    <div className={styles.imageContainer}>
      <label htmlFor='fileInput'>
        <img src={updatedImagePath.current} alt='representative image' />
        <div className={styles.updateMessage}>대표 이미지 수정하기</div>
        <div className={styles.updateSizeMessage}>
          (5MB 미만의 이미지 파일만 가능)
        </div>
        <div className={styles.deleteButton}>
          <FaTrashAlt />
        </div>
      </label>
      <input
        type='file'
        id='fileInput'
        accept='image/*'
        onChange={handleInputChange}
      />
      {showUpdateAlert && (
        <AlertModal
          message='업로드하신 이미지로 대표 이미지를 변경하시겠습니까?'
          showCancelButton={true}
          onConfirm={() => updateScheduleImage()}
          onCancel={() => setShowUpdateAlert(false)}
        />
      )}
      {showImageSizeAlert && (
        <AlertModal
          message='업로드하신 이미지가 5MB를 초과합니다.'
          onConfirm={() => setShowImageSizeAlert(false)}
        />
      )}
    </div>
  );
}

export default ImageScheduleEdit;
