export interface UserData {
  id: string;
  nickname: string;
  birth_date: string;
  gender: string;
  phone_number: string;
  profile_image: string;
  created_at: string;
}

export interface UserDetail {
  email: string;
  nickname: string;
  birthDate: string;
  gender: string;
  phoneNumber: string;
  profileImage: string;
}

export interface RegisterFormData {
  id: string;
  password: string;
  nickname: string;
  birth_date: string;
  gender: string;
  phone_number: string;
  profile_image: string;
}

export interface UserEditFormData {
  password?: string;
  nickname: string;
  birth_date: string;
  phone_number: string;
  gender: string;
  profile_image: string;
}

export interface LoginFormData {
  id: string;
  password: string;
}
