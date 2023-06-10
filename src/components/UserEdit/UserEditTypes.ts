export type UserInfoValues = {
  email: string;
  profileImage: string;
  nickname: string;
  newPassword: string;
  passwordConfirm: string;
  birthDate: {
    year: string;
    month: string;
    day: string;
  };
  gender: string;
  phoneNumber: string;
};

export type UserInfoErrors = {
  email: string;
  profileImage: string;
  nickname: string;
  newPassword: string;
  passwordConfirm: string;
  birthDate: string;
  phoneNumber: string;
};
