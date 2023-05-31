import React, { useEffect, useState } from 'react';
import { DestinationsType } from './Types';

type DestinationDetailsPropsType = {
  clickedDestination: DestinationsType | null;
  setClickedDestination: React.Dispatch<
    React.SetStateAction<DestinationsType | null>
  >;
};

function DestinationDetails({
  clickedDestination,
  setClickedDestination
}: DestinationDetailsPropsType) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const destination = clickedDestination;

  const toggleDetailPage = () => {
    setIsOpen(() => false);
    setClickedDestination(() => null);
  };

  useEffect(() => {
    if (clickedDestination !== null) {
      setIsOpen(() => true);
    }
  }, [clickedDestination]);

  return (
    <>
      {isOpen && clickedDestination !== null && (
        <section>{clickedDestination.title}</section>
      )}
      {isOpen && <button onClick={toggleDetailPage}>상세 페이지 닫기</button>}
    </>
  );
}

export default DestinationDetails;
