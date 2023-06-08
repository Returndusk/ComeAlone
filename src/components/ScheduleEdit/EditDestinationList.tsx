import React from 'react';
import { Link } from 'react-router-dom';
import styles from './EditDestinationList.module.scss';
import { ScheduleEditDestinationListType } from '../../types/ScheduleEditTypes';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from '@hello-pangea/dnd';
import { FaGripVertical } from 'react-icons/fa';
import ROUTER from '../../constants/Router';

function EditDestinationList({
  updatedDestinationList,
  checkedDayIndex,
  onDestinationListUpdate,
  onCheckedDayIndexUpdate
}: ScheduleEditDestinationListType) {
  const handleDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const dayIndex = Number(source.droppableId.split(' ')[1]);
      const prevDestIndex = source.index;
      const curDestIndex = destination.index;
      const [removed] = updatedDestinationList[dayIndex].splice(
        prevDestIndex,
        1
      );

      updatedDestinationList[dayIndex].splice(curDestIndex, 0, removed);

      const newDestinationList = [...updatedDestinationList];

      onDestinationListUpdate(newDestinationList);
    } else {
      const prevDayIndex = Number(source.droppableId.split(' ')[1]);
      const prevDestIndex = source.index;
      const curDayIndex = Number(destination.droppableId.split(' ')[1]);
      const curDestIndex = destination.index;
      const [removed] = updatedDestinationList[prevDayIndex].splice(
        prevDestIndex,
        1
      );

      updatedDestinationList[curDayIndex].splice(curDestIndex, 0, removed);

      const newDestinationList = [...updatedDestinationList];

      onDestinationListUpdate(newDestinationList);
    }
  };

  return (
    <div className={styles.destinationsContainer}>
      <div className={styles.destinationsTitle}>목적지 리스트</div>
      <Link to={ROUTER.DESTINATION_LIST}>
        <div className={styles.addDestinationButton}>
          + 새로운 목적지 추가하기
        </div>
      </Link>
      <label>
        <input
          type='checkbox'
          checked={checkedDayIndex === -1}
          onChange={() => {
            onCheckedDayIndexUpdate(-1);
          }}
        />
        전체 목적지 보기
      </label>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={styles.destinationsList}>
          {updatedDestinationList.map((destOfDay, dayIndex) => {
            return (
              <Droppable
                droppableId={`destinationList ${dayIndex}`}
                key={`destinationList ${dayIndex}`}
              >
                {(droppableProvided) => (
                  <div
                    className={styles.destinationsDay}
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}
                  >
                    <label>
                      <div className={styles.destinationDayTitle}>
                        <input
                          type='checkbox'
                          checked={checkedDayIndex === dayIndex}
                          onChange={() => {
                            if (checkedDayIndex === dayIndex) {
                              onCheckedDayIndexUpdate(-1);
                            } else {
                              onCheckedDayIndexUpdate(dayIndex);
                            }
                          }}
                        />{' '}
                        Day {dayIndex + 1}
                      </div>
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
                            <FaGripVertical className={styles.gripIcon} />
                            {dest.title}
                            <button
                              onClick={() => {
                                updatedDestinationList[dayIndex].splice(
                                  destIndex,
                                  1
                                );
                                const newDestinations = [
                                  ...updatedDestinationList
                                ];
                                onDestinationListUpdate(newDestinations);
                              }}
                            >
                              삭제
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
    </div>
  );
}

export default EditDestinationList;
