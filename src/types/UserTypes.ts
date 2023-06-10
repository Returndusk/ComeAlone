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

export type UserEditFormData = {
  password?: string;
  nickname: string;
  birth_date: string;
  phone_number: string;
  gender: string;
  profile_image: string;
};

export type LoginFormData = {
  id: string;
  password: string;
};
