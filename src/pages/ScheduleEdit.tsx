import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../components/ScheduleEdit/ScheduleEdit.module.scss';
import ImageScheduleEdit from '../components/ScheduleEdit/ImageScheduleEdit';
import DateScheduleEdit from '../components/ScheduleEdit/DateScheduleEdit';
import PublicStatusScheduleEdit from '../components/ScheduleEdit/PublicStatusScheduleEdit';
import InfoScheduleEdit from '../components/ScheduleEdit/InfoScheduleEdit';
import EditDestinationList from '../components/ScheduleEdit/EditDestinationList';
import DestinationsMap from '../components/ScheduleEdit/DestinationsMap';
import ButtonsScheduleEdit from '../components/ScheduleEdit/ButtonsScheduleEdit';
import DateModalScheduleEdit from '../components/ScheduleEdit/DateModalScheduleEdit';
import { updateSchedule } from '../apis/ScheduleEditAPI';
import AlertModal from '../components/common/Alert/AlertModal';
import ROUTER from '../constants/Router';
import { useAuthState } from '../contexts/AuthContext';
import useScheduleDetailFetch from '../hooks/useScheduleDetailFetch';
import useScheduleEditForm from '../hooks/useScheduleEditForm';
import ScheduleDetailLoading from '../components/common/Loading/ScheduleDetailLoading';

function ScheduleEdit() {
  const scheduleId: string = useParams().scheduleId as string;
  const { authState } = useAuthState();
  const navigate = useNavigate();
  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const [showTitleEmptyAlert, setShowTitleEmptyAlert] =
    useState<boolean>(false);
  const [showSummaryEmptyAlert, setShowSummaryEmptyAlert] =
    useState<boolean>(false);
  const [checkedDayIndex, setCheckedDayIndex] = useState<number>(-1);
  const createdAt = useRef<Date>();
  const updatedAt = useRef<Date>();

  const [isDetailLoading, fetchedScheduleDetail] =
    useScheduleDetailFetch(scheduleId);
  const [
    isInitDataLoading,
    updatedTitle,
    updatedSummary,
    updatedImagePath,
    updatedDateInfo,
    updatedDestinationList,
    updatedStatus,
    setInitScheduleEditForm,
    setUpdatedTitle,
    setUpdatedSummary,
    setUpdatedImagePath,
    setUpdatedDateInfo,
    setUpdatedDestinationList,
    setUpdatedStatus,
    getUpdatedScheduleSubmitForm
  ] = useScheduleEditForm();

  useEffect(() => {
    const fetchInitScheduleForm = () => {
      if (isDetailLoading) {
        return;
      } else {
        if (authState.user?.id !== fetchedScheduleDetail.userId) {
          navigate(ROUTER.MAIN);

          return;
        }
        setInitScheduleEditForm(fetchedScheduleDetail);
        (createdAt.current = fetchedScheduleDetail.createdAt),
          (updatedAt.current = fetchedScheduleDetail.updatedAt);
      }
    };

    if (authState.isLoggedIn === true) {
      fetchInitScheduleForm();
    }
  }, [isDetailLoading, fetchedScheduleDetail, authState.isLoggedIn]);

  useEffect(() => {
    if (isInitDataLoading) {
      return;
    }

    const prevDuration = updatedDestinationList.length;
    const updatedDuration = updatedDateInfo.duration;

    if (prevDuration < updatedDuration) {
      const newUpdatedDestinationList = [...updatedDestinationList];

      for (let i = 0; i < updatedDuration - prevDuration; i++) {
        newUpdatedDestinationList.push([]);
      }

      setUpdatedDestinationList(newUpdatedDestinationList);
    } else if (prevDuration > updatedDuration) {
      setUpdatedDestinationList(
        updatedDestinationList.slice(0, updatedDuration)
      );
    }
  }, [updatedDestinationList, updatedDateInfo.duration]);

  const markersLocations = useMemo(() => {
    if (isInitDataLoading) {
      return;
    }

    if (checkedDayIndex === -1) {
      return updatedDestinationList.flat();
    } else {
      return JSON.parse(JSON.stringify(updatedDestinationList))[
        checkedDayIndex
      ];
    }
  }, [checkedDayIndex, updatedDestinationList, updatedDateInfo]);

  const handleSubmit = () => {
    if (!updatedTitle) {
      setShowTitleEmptyAlert(true);
    } else if (!updatedSummary) {
      setShowSummaryEmptyAlert(true);
    } else {
      handleSubmitConfirm();
    }
  };

  const handleSubmitConfirm = async () => {
    await updateSchedule(getUpdatedScheduleSubmitForm());

    navigate(`${ROUTER.SCHEDULE_DETAIL}/${scheduleId}`);
  };

  if (isInitDataLoading) {
    return <ScheduleDetailLoading />;
  }

  return (
    <div className={styles.container}>
      <ImageScheduleEdit
        imagePath={updatedImagePath}
        onImageUpdate={setUpdatedImagePath}
      />
      <DateScheduleEdit
        dateInfo={updatedDateInfo}
        onOpenModal={() => setShowDateModal(true)}
      />
      <PublicStatusScheduleEdit
        updatedStatus={updatedStatus}
        onStatusUpdate={setUpdatedStatus}
      />
      <InfoScheduleEdit
        updatedTitle={updatedTitle}
        updatedSummary={updatedSummary}
        createdAt={createdAt.current as Date}
        updatedAt={updatedAt.current as Date}
        onTitleUpdate={setUpdatedTitle}
        onSummaryUpdate={setUpdatedSummary}
      />
      <EditDestinationList
        updatedDestinationList={updatedDestinationList}
        checkedDayIndex={checkedDayIndex}
        onDestinationListUpdate={setUpdatedDestinationList}
        onCheckedDayIndexUpdate={setCheckedDayIndex}
      />
      <DestinationsMap markersLocations={markersLocations} />
      <ButtonsScheduleEdit scheduleId={scheduleId} onSubmit={handleSubmit} />
      <DateModalScheduleEdit
        openModal={showDateModal}
        dateInfo={updatedDateInfo}
        onDateInfoUpdate={setUpdatedDateInfo}
        onModalClose={() => setShowDateModal(false)}
      />
      {showTitleEmptyAlert && (
        <AlertModal
          message='수정하실 제목을 입력해주세요.'
          onConfirm={() => setShowTitleEmptyAlert(false)}
        />
      )}
      {showSummaryEmptyAlert && (
        <AlertModal
          message='수정하실 일정 소개를 입력해주세요.'
          onConfirm={() => setShowSummaryEmptyAlert(false)}
        />
      )}
    </div>
  );
}

export default ScheduleEdit;
