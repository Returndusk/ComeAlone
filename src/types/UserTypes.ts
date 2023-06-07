export type Errors = {
  [key: string]: string;
};

//Register/RegisterForm
export type RegisterFormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  birthDate: {
    year: number;
    month: number;
    day: number;
  };
  gender: '남성' | '여성';
  phoneNumber: string;
};
export type RegisterFormData = {
  id: string;
  password: string;
  nickname: string;
  birth_date: string;
  gender: '남성' | '여성';
  phone_number: string;
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
      | { target: { name: string; value: number } }
  ) => void;
};

//UserEdit/UserInfoValues
export type UserInfoValues = {
  email: string;
  profileImage: string;
  nickname: string;
  newPassword: '';
  passwordConfirm: '';
  birthDate: {
    year: number;
    month: number;
    day: number;
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
