import React, { useState } from 'react';
import styles from './UserEditForm.module.scss';
import { Errors, UserInfoValues } from '../../types/UserTypes';
import ProfileImage from './ProfileImage';
import UserInfo from './UserInfo';
import UserEditButtons from './UserEditButtons';

const userInfo = {
  email: 'elice@test.com',
  profileImage: '',
  nickname: '엘리스',
  birthDate: '1999/01/01',
  gender: 'female',
  phoneNumber: '010-1234-1234'
};

function UserEditForm() {
  const initValues: UserInfoValues = {
    email: userInfo.email,
    profileImage: userInfo.profileImage,
    nickname: userInfo.nickname,
    newPassword: '',
    passwordConfirm: '',
    birthDate: userInfo.birthDate,
    gender: userInfo.gender,
    phoneNumber: userInfo.phoneNumber
  };
  const [values, setValues] = useState<UserInfoValues>(initValues);
  const [errors, setErrors] = useState<Errors>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const checkEmptyInputFields = (values: UserInfoValues, errMsgs: Errors) => {
    for (const [key, value] of Object.entries(values)) {
      if (
        key === 'newPassword' ||
        key === 'passwordConfirm' ||
        key === 'profileImage'
      )
        return;
      if (!value) errMsgs[key] = '빈칸을 입력해 주세요.';
    }
  };

  const validateNickname = (nickname: string, errMsgs: Errors) => {
    const minLength = 2;
    const maxLength = 6;
    const hasAllowedChars = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]+$/;

    if (nickname.length < minLength || nickname.length > maxLength) {
      return (errMsgs.nickname = '닉네임은 2자 이상, 6자 이하여야 합니다.');
    }

    if (nickname.includes(' ')) {
      return (errMsgs.nickname = '닉네임에는 공백을 사용할 수 없습니다.');
    }

    if (!hasAllowedChars.test(nickname)) {
      return (errMsgs.nickname =
        '닉네임은 알파벳 대소문자, 숫자, 한글만 사용할 수 있습니다.');
    }
  };

  const validatePassword = (password: string, errMsgs: Errors) => {
    const hasSpecialChar = /[-_!@#$%&*,.]/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumber = /[0-9]/;
    const minLength = 8;
    const hasAllowedChars = /^[a-zA-Z0-9-_!@#$%&*,.]+$/g;

    if (password.length < minLength) {
      return (errMsgs.newPassword = '비밀번호는 8자 이상이어야 합니다.');
    }

    if (
      !hasSpecialChar.test(password) ||
      !hasUpperCase.test(password) ||
      !hasLowerCase.test(password) ||
      !hasNumber.test(password)
    ) {
      return (errMsgs.newPassword =
        '대문자, 소문자, 특수 문자, 숫자가 1개 이상 포함되어야 합니다.');
    }

    if (!hasAllowedChars.test(password)) {
      return (errMsgs.newPassword = '허용되지 않는 문자입니다.');
    }
  };

  const validatePasswordConfirm = (
    password: string,
    passwordConfirm: string,
    errMsgs: Errors
  ) => {
    if (password !== passwordConfirm) {
      errMsgs.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }
  };

  const validatePhoneNumber = (phoneNumber: string, errMsgs: Errors) => {
    const pattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
    const hasAllowedChars = /^[0-9-]*$/;

    if (!phoneNumber.includes('-')) {
      return (errMsgs.phoneNumber = '하이픈(-)을 포함하여 입력해주세요.');
    }

    if (!pattern.test(phoneNumber) || !hasAllowedChars.test(phoneNumber)) {
      return (errMsgs.phoneNumber = '유효한 전화번호 형식이 아닙니다.');
    }
  };

  const validateForm = (values: UserInfoValues) => {
    const errMsgs: Errors = {};

    checkEmptyInputFields(values, errMsgs);
    if (!errMsgs.nickname) validateNickname(values.nickname, errMsgs);
    if (!errMsgs.newPassword && values.newPassword)
      validatePassword(values.newPassword, errMsgs);
    if (!errMsgs.passwordConfirm && values.newPassword)
      validatePasswordConfirm(
        values.newPassword,
        values.passwordConfirm,
        errMsgs
      );
    if (!errMsgs.phoneNumber) validatePhoneNumber(values.phoneNumber, errMsgs);
    //생년월일 유효성 검사 추가 예정

    return errMsgs;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(values);
    if (Object.keys(validationErrors).length === 0) {
      alert('유효성 검사 통과!');
      //회원정보수정 api 호출
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <ProfileImage url={userInfo.profileImage} />
      <UserInfo values={values} errors={errors} handleChange={handleChange} />
      <UserEditButtons />
    </form>
  );
}

export default UserEditForm;
