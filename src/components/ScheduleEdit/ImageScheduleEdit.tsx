import React, { useState, useRef, useCallback, ChangeEvent } from 'react';
import styles from './ImageScheduleEdit.module.scss';
import { updateScheduleImageById } from '../../apis/ScheduleEditAPI';
import AlertModal from '../common/Alert/AlertModal';

function ImageScheduleEdit({
  scheduleId,
  imagePath
}: {
  scheduleId: string | undefined;
  imagePath: string;
}) {
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const updatedImagePath = useRef<string>(imagePath);
  const updatedImageFile = useRef<Blob>();

  const updateScheduleImage = useCallback(async () => {
    const formData = new FormData();

    formData.append('file', updatedImageFile.current as Blob);

    const response = await updateScheduleImageById(scheduleId, formData);

    updatedImagePath.current = response?.data.imagePath;
    setShowUpdateAlert(false);
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    updatedImageFile.current = (event.target.files as FileList)[0];
    setShowUpdateAlert(true);
  };

  return (
    <div className={styles.imageContainer}>
      <label htmlFor='fileInput'>
        <img
          className={styles.image}
          src={updatedImagePath.current}
          alt='representative-image'
        />
        <p>대표 이미지 수정하기</p>
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
    </div>
  );
}

export default ImageScheduleEdit;
