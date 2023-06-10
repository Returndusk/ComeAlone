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

export type RegisterFormErrors = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  birthDate: string;
  gender: string;
  phoneNumber: string;
};
