import React, { useState, useRef, Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import styles from './EditDestinationList.module.scss';
import { MapWithWaypointsPropsType } from '../../types/DestinationListTypes';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from '@hello-pangea/dnd';
import { FaMapMarkerAlt, FaGripLines, FaTrashAlt } from 'react-icons/fa';
import AlertModal from '../common/Alert/AlertModal';
import ROUTER from '../../constants/Router';

function EditDestinationList({
  updatedDestinationList,
  checkedDayIndex,
  onDestinationListUpdate,
  onCheckedDayIndexUpdate
}: {
  updatedDestinationList: MapWithWaypointsPropsType[][];
  checkedDayIndex: number;
  onDestinationListUpdate: Dispatch<
    SetStateAction<MapWithWaypointsPropsType[][]>
  >;
  onCheckedDayIndexUpdate: Dispatch<SetStateAction<number>>;
}) {
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const targetDeleteDayIndex = useRef<number>(-1);
  const targetDeleteDestIndex = useRef<number>(-1);

  const handleDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const dayIndex = Number(source.droppableId.split(' ')[1]);
      const prevDestIndex: number = source.index;
      const curDestIndex: number = destination.index;
      const [removed]: MapWithWaypointsPropsType[] = updatedDestinationList[
        dayIndex
      ].splice(prevDestIndex, 1);

      updatedDestinationList[dayIndex].splice(curDestIndex, 0, removed);

      const newDestinationList: MapWithWaypointsPropsType[][] = [
        ...updatedDestinationList
      ];

      onDestinationListUpdate(newDestinationList);
    } else {
      const prevDayIndex = Number(source.droppableId.split(' ')[1]);
      const prevDestIndex: number = source.index;
      const curDayIndex = Number(destination.droppableId.split(' ')[1]);
      const curDestIndex: number = destination.index;
      const [removed]: MapWithWaypointsPropsType[] = updatedDestinationList[
        prevDayIndex
      ].splice(prevDestIndex, 1);

      updatedDestinationList[curDayIndex].splice(curDestIndex, 0, removed);

      const newDestinationList: MapWithWaypointsPropsType[][] = [
        ...updatedDestinationList
      ];

      onDestinationListUpdate(newDestinationList);
    }
  };

  const handleDestinationDelete = () => {
    updatedDestinationList[targetDeleteDayIndex.current].splice(
      targetDeleteDestIndex.current,
      1
    );

    const newDestinations: MapWithWaypointsPropsType[][] = [
      ...updatedDestinationList
    ];

    onDestinationListUpdate(newDestinations);
    setShowDeleteAlert(false);
  };

  return (
    <>
      <div className={styles.destinationsTitle}>
        <FaMapMarkerAlt className={styles.destinationsIcon} />
        목적지
      </div>
      <div className={styles.addDestinationButton}>
        <Link to={ROUTER.DESTINATION_LIST}>+ 새로운 목적지 추가하기</Link>
      </div>
      <div className={styles.destinationsContainer}>
        <label>
          <input
            type='radio'
            checked={checkedDayIndex === -1}
            onChange={() => {
              onCheckedDayIndexUpdate(-1);
            }}
          />
          <span className={styles.allDestinations}>전체 목적지 보기</span>
        </label>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className={styles.destinationsList}>
            {updatedDestinationList.map((destOfDay, dayIndex) => {
              return (
                <Droppable
                  droppableId={`day ${dayIndex}`}
                  key={`day ${dayIndex}`}
                >
                  {(droppableProvided) => (
                    <div
                      className={styles.destinationsDay}
                      ref={droppableProvided.innerRef}
                      {...droppableProvided.droppableProps}
                    >
                      <label>
                        <input
                          type='radio'
                          checked={checkedDayIndex === dayIndex}
                          onChange={() => {
                            if (checkedDayIndex === dayIndex) {
                              onCheckedDayIndexUpdate(-1);
                            } else {
                              onCheckedDayIndexUpdate(dayIndex);
                            }
                          }}
                        />{' '}
                        <span>{dayIndex + 1}일차</span>
                        {destOfDay.length > 0 ? null : (
                          <p>(목적지가 존재하지 않습니다.)</p>
                        )}
                      </label>
                      {destOfDay.map((dest, destIndex) => (
                        <Draggable
                          key={`${dayIndex} ${destIndex}`}
                          draggableId={`${dayIndex} ${destIndex}`}
                          index={destIndex}
                        >
                          {(draggableProvided) => (
                            <div
                              className={styles.destination}
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                            >
                              <FaGripLines className={styles.gripIcon} />
                              {dest.title}
                              <button
                                className={styles.deleteButton}
                                onClick={() => {
                                  targetDeleteDayIndex.current = dayIndex;
                                  targetDeleteDestIndex.current = destIndex;
                                  setShowDeleteAlert(true);
                                }}
                              >
                                <FaTrashAlt />
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {droppableProvided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </DragDropContext>
        {showDeleteAlert && (
          <AlertModal
            message='해당 목적지를 삭제하시겠습니까?'
            showCancelButton={true}
            onConfirm={handleDestinationDelete}
            onCancel={() => setShowDeleteAlert(false)}
          />
        )}
      </div>
    </>
  );
}

export default EditDestinationList;
