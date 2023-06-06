import React, { Dispatch, SetStateAction } from 'react';
import styles from './EditDestinationList.module.scss';
import { DestinationsType } from '../DestinationList/Types';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FaGripVertical } from 'react-icons/fa';

function EditDestinationList({
  destinations,
  checkedDayIndex,
  handleDestinationList,
  handleCheckedDayIndex
}: {
  destinations: DestinationsType[][];
  checkedDayIndex: number;
  handleDestinationList: Dispatch<SetStateAction<DestinationsType[][]>>;
  handleCheckedDayIndex: Dispatch<SetStateAction<number>>;
}) {
  const handleDragEnd = (result: any) => {
    console.log(result);
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
          {destinations.map((destOfDay, dayIndex) => {
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
                                destinations[dayIndex].splice(destIndex, 1);
                                const newDestinations = [...destinations];
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
