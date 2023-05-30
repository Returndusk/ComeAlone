import React, { useState } from 'react';

interface DestinationsType {
  name: string;
  lat: number;
  lng: number;
}

type DestinationDetailsPropsType = {
  clickedDestination: DestinationsType;
};

function DestinationDetails({
  clickedDestination
}: DestinationDetailsPropsType) {
  const destination = clickedDestination;

  return <section>{destination.name}</section>;
}

export default DestinationDetails;
