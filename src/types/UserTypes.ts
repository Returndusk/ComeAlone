export type Errors = {
  [key: string]: string;
};

export type UserData = {
  id: string;
  nickname: string;
  birth_date: string;
  gender: string;
  phone_number: string;
  profile_image: string;
  created_at: string;
};

export type UserDetail = {
  email: string;
  nickname: string;
  birthDate: string;
  gender: string;
  phoneNumber: string;
  profileImage: string;
};

export type RegisterFormData = {
  id: string;
  password: string;
  nickname: string;
  birth_date: string;
  gender: '남성' | '여성';
  phone_number: string;
  profile_image: '';
};

//Login/LoginForm
export type LoginFormValues = {
  email: string;
  password: string;
};
export type LoginFormData = {
  id: string;
  password: string;
};

//MyPage/MyPageButtons
export type MyPageButtonsProps = {
  attemptDeleteAccount: () => void;
};

//MyPage/DeleteAccountForm
export type DeleteFormProps = {
  cancelDeleteAccount: () => void;
};

//UserEdit/UserInfo
export type UserInfoProps = {
  values: UserInfoValues;
  errors: Errors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBirthDateChange: (
    e:
      | React.ChangeEvent<{ name: string; value: unknown }>
      | { target: { name: string; value: string } }
  ) => void;
};

export type UserEditFormData = {
  password?: string;
  nickname: string;
  birth_date: string;
  phone_number: string;
  gender: string;
  profile_image: string;
};

//UserEdit/UserInfoValues
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

//UserEdit/ProfileImage
export type ProfileImageProps = {
  url: string;
};

//UserEdit/UserConfirmForm
export type UserConfirmFormProps = {
  confirmUser: () => void;
};
