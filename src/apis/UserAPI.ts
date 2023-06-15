import axios from 'axios';
import {
  LoginFormData,
  RegisterFormData,
  UserEditFormData
} from '../types/UserTypes';
import tokenInstance from './tokenInstance';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const registerUser = async (formData: RegisterFormData) => {
  const response = await axios.post(`${baseUrl}/auth/signup`, formData);
  return response;
};

export const loginUser = async (formData: LoginFormData) => {
  const response = await axios.post(`${baseUrl}/auth/signin`, formData);
  return response;
};

export const refreshUserTokens = async (refreshToken: string) => {
  const response = await axios.post(
    `${baseUrl}/auth/refresh`,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    }
  );
  return response;
};

export const getUser = async () => {
  const response = await tokenInstance.get(`${baseUrl}/auth/users/me`);
  return response;
};

export const editUser = async (formData: UserEditFormData) => {
  const response = await tokenInstance.put(
    `${baseUrl}/auth/users/me`,
    formData
  );
  return response;
};

export const checkPassword = async (formData: { password: string }) => {
  const response = await tokenInstance.post(
    `${baseUrl}/auth/users/password`,
    formData
  );
  return response;
};

export const checkNicknameDuplicate = async (formData: {
  nickname: string;
}) => {
  const response = await axios.post(`${baseUrl}/auth/users/nickname`, formData);
  return response;
};

export const checkEmailDuplicate = async (formData: { id: string }) => {
  const response = await axios.post(`${baseUrl}/auth/users/email`, formData);
  return response;
};

export const deleteUser = async () => {
  const response = await tokenInstance.delete(`${baseUrl}/auth/users/me`);

  return response;
};

export const uploadProfileImage = async (formData: FormData) => {
  const response = await tokenInstance.post(
    `${baseUrl}/upload/profile/image`,
    formData
  );
  return response;
};
