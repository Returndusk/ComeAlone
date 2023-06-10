import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from '../components/ScheduleEdit/ScheduleEdit.module.scss';
import ImageScheduleEdit from '../components/ScheduleEdit/ImageScheduleEdit';
import DateScheduleEdit from '../components/ScheduleEdit/DateScheduleEdit';
import PublicStatusScheduleEdit from '../components/ScheduleEdit/PublicStatusScheduleEdit';
import InfoScheduleEdit from '../components/ScheduleEdit/InfoScheduleEdit';
import EditDestinationList from '../components/ScheduleEdit/EditDestinationList';
import MapWithWaypoints from '../components/common/Map/MapWithWaypoints';
import ButttonsScheduleEdit from '../components/ScheduleEdit/ButtonsScheduleEdit';
import DateModalScheduleEdit from '../components/ScheduleEdit/DateModalScheduleEdit';
import { defaultSchedule } from '../components/ScheduleEdit/Dummy';
import { FaArrowLeft } from 'react-icons/fa';
import { MapWithWaypointsPropsType } from '../types/DestinationListTypes';
import { getScheduleDetailById } from '../apis/ScheduleDetailAPI';
import { updateSchedule, deleteScheduleById } from '../apis/ScheduleEditAPI';
import ROUTER from '../constants/Router';

function mapDestinationId(destinationList: MapWithWaypointsPropsType[][]) {
  return destinationList.map((destOfDay: MapWithWaypointsPropsType[]) =>
    destOfDay.map((dest: MapWithWaypointsPropsType) => dest.id)
  );
}

function stringifyDate(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function ScheduleEdit() {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [updatedDateInfo, setUpdatedDateInfo] = useState({
    startDate: defaultSchedule.startDate,
    endDate: defaultSchedule.endDate,
    duration: defaultSchedule.duration
  });
  const [updatedStatus, setUpdatedStatus] = useState(defaultSchedule.status);
  const [updatedDestinationList, setUpdatedDestinationList] = useState(
    defaultSchedule.destinations
  );
  const [checkedDayIndex, setCheckedDayIndex] = useState(-1);
  const updatedTitle = useRef(defaultSchedule.title);
  const updatedSummary = useRef(defaultSchedule.summary);
  const createdAt = useRef(defaultSchedule.createdAt);

  const getScheduleEdit = useCallback(async (id: string | undefined) => {
    const response = await getScheduleDetailById(id);

    const data = {
      title: response?.data.title,
      summary: response?.data.summary,
      duration: response?.data.duration,
      startDate: new Date(response?.data.start_date),
      endDate: new Date(response?.data.end_date),
      image: response?.data.image,
      createdAt: new Date(response?.data.created_at.split('T')[0]),
      status: response?.data.status,
      destinations: response?.data.destinationMaps
    };

    return data;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getScheduleEdit(scheduleId);

      setUpdatedDateInfo({
        startDate: data.startDate,
        endDate: data.endDate,
        duration: data.duration
      });
      updatedTitle.current = data.title;
      updatedSummary.current = data.summary;
      createdAt.current = data.createdAt;
      setUpdatedStatus(data.status);
      setUpdatedDestinationList(data.destinations);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
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
  }, [updatedDateInfo.duration]);

  const markersLocations = useMemo(() => {
    if (checkedDayIndex === -1) {
      return updatedDestinationList.flat();
    } else {
      return JSON.parse(JSON.stringify(updatedDestinationList))[
        checkedDayIndex
      ];
    }
  }, [checkedDayIndex, updatedDestinationList]);

  const handleModelOpen = () => setOpenModal(true);

  const handleModalClose = () => setOpenModal(false);

  const handleTitleUpdate = (title: string) => {
    updatedTitle.current = title;
  };

  const handleSummaryUpdate = (summary: string) => {
    updatedSummary.current = summary;
  };

  const handleSubmit = async () => {
    const schedule_id = Number(scheduleId);
    const title = updatedTitle.current;
    const summary = updatedSummary.current;
    const duration = updatedDateInfo.duration;
    const start_date = stringifyDate(updatedDateInfo.startDate);
    const end_date = stringifyDate(updatedDateInfo.endDate);
    const status = updatedStatus;
    const image = '';
    const destinations = mapDestinationId(updatedDestinationList);

    await updateSchedule({
      schedule_id,
      title,
      summary,
      duration,
      start_date,
      end_date,
      status,
      image,
      destinations
    });

    navigate(`/schedule/detail/${scheduleId}`);
  };

  const handleDelete = async () => {
    await deleteScheduleById(scheduleId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Link
        to={`${ROUTER.SCHEDULE_DETAIL}/${scheduleId}`}
        className={styles.backButton}
      >
        <FaArrowLeft />
        돌아가기
      </Link>
      <ImageScheduleEdit image={defaultSchedule.image} />
      <DateScheduleEdit
        dateInfo={updatedDateInfo}
        onOpenModal={handleModelOpen}
      />
      <PublicStatusScheduleEdit
        updatedStatus={updatedStatus}
        onStatusUpdate={setUpdatedStatus}
      />
      <InfoScheduleEdit
        updatedTitle={updatedTitle.current}
        updatedSummary={updatedSummary.current}
        createdAt={createdAt.current}
        onTitleUpdate={handleTitleUpdate}
        onSummaryUpdate={handleSummaryUpdate}
      />
      <EditDestinationList
        updatedDestinationList={updatedDestinationList}
        checkedDayIndex={checkedDayIndex}
        onDestinationListUpdate={setUpdatedDestinationList}
        onCheckedDayIndexUpdate={setCheckedDayIndex}
      />
      <div className={styles.mapContainer}>
        <MapWithWaypoints markersLocations={markersLocations} />
      </div>
      <ButttonsScheduleEdit onSubmit={handleSubmit} onDelete={handleDelete} />
      <DateModalScheduleEdit
        openModal={openModal}
        dateInfo={updatedDateInfo}
        onDateInfoUpdate={setUpdatedDateInfo}
        onModalClose={handleModalClose}
      />
    </div>
  );
}

export default ScheduleEdit;
