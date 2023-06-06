import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const getAllDestinationsList = async () => {
  const response = await axios.get(`${baseUrl}/destinations`);
  return response;
};

export const getDestinationsListByCategoryId = async (categoryId: number) => {
  const response = await axios.get(
    `${baseUrl}/categories/${categoryId}/destinations`
  );
  return response;
};

export const getDestinationDetailsByDestinationId = async (
  destinationId: number
) => {
  const response = await axios.get(`${baseUrl}/destinations/${destinationId}`);
  return response;
};
