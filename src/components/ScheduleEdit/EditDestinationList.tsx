import React, { Dispatch, SetStateAction } from 'react';
import styles from './EditDestinationList.module.scss';
import { DestinationsType } from '../DestinationList/Types';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FaGripVertical } from 'react-icons/fa';

function EditDestinationList({
  destinationList,
  checkedDayIndex,
  handleDestinationList,
  handleCheckedDayIndex
}: {
  destinationList: DestinationsType[][];
  checkedDayIndex: number;
  handleDestinationList: Dispatch<SetStateAction<DestinationsType[][]>>;
  handleCheckedDayIndex: Dispatch<SetStateAction<number>>;
}) {
  const handleDragEnd = ({
    source,
    destination
  }: {
    source: any;
    destination: any;
  }) => {
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const dayIndex = source.droppableId.split(' ')[1];
      const prevDestIndex = source.index;
      const curDestIndex = destination.index;
      const [removed] = destinationList[dayIndex].splice(prevDestIndex, 1);

      destinationList[dayIndex].splice(curDestIndex, 0, removed);

      const newDestinationList = [...destinationList];

      handleDestinationList(newDestinationList);
    } else {
      const prevDayIndex = source.droppableId.split(' ')[1];
      const prevDestIndex = source.index;
      const curDayIndex = destination.droppableId.split(' ')[1];
      const curDestIndex = destination.index;
      const [removed] = destinationList[prevDayIndex].splice(prevDestIndex, 1);

      destinationList[curDayIndex].splice(curDestIndex, 0, removed);

      const newDestinationList = [...destinationList];

      handleDestinationList(newDestinationList);
    }
  };

  return (
    <div className={styles.destinationsContainer}>
      <div className={styles.destinationsTitle}>목적지 리스트</div>
      <label>
        <input
          type='checkbox'
          checked={checkedDayIndex === -1}
          onChange={() => {
            handleCheckedDayIndex(-1);
          }}
        />
        전체 목적지 보기
      </label>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={styles.destinationsList}>
          {destinationList.map((destOfDay, dayIndex) => {
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
                      <input
                        type='checkbox'
                        checked={checkedDayIndex === dayIndex}
                        onChange={() => {
                          if (checkedDayIndex === dayIndex) {
                            handleCheckedDayIndex(-1);
                          } else {
                            handleCheckedDayIndex(dayIndex);
                          }
                        }}
                      />{' '}
                      Day {dayIndex + 1}
                    </label>
                    {destOfDay.map((dest, destIndex) => (
                      <Draggable
                        key={`${dayIndex} ${destIndex}`}
                        draggableId={`${dayIndex} ${destIndex}`}
                        index={destIndex}
                      >
                        {(draggableProvided) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                          >
                            <FaGripVertical className={styles.gripIcon} />
                            {dest.title}
                            <button
                              onClick={() => {
                                destinationList[dayIndex].splice(destIndex, 1);
                                const newDestinations = [...destinationList];
                                handleDestinationList(newDestinations);
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
