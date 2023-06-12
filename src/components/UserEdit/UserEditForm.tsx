import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './UserEditForm.module.scss';
import { UserInfoErrors, UserInfoValues } from './UserEditTypes';
import ProfileImage from './ProfileImage';
import UserInfo from './UserInfo';
import UserEditButtons from './UserEditButtons';
import { checkNicknameDuplicate, editUser, getUser } from '../../apis/UserAPI';
import { AxiosError } from 'axios';
import { useAuthState } from '../../contexts/AuthContext';

function UserEditForm() {
  const navigate = useNavigate();
  const { updateAuthState } = useAuthState();
  const initValues: UserInfoValues = {
    email: '',
    profileImage: '',
    nickname: '',
    newPassword: '',
    passwordConfirm: '',
    birthDate: {
      year: '',
      month: '',
      day: ''
    },
    gender: '',
    phoneNumber: ''
  };
  const initErrors = {
    ...initValues,
    birthDate: ''
  };
  const [values, setValues] = useState<UserInfoValues>(initValues);
  const [errors, setErrors] = useState<UserInfoErrors>(initErrors);
  const [nicknameDuplicate, setNicknameDuplicate] = useState({
    isPass: false,
    prevValue: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (imagePath: string) => {
    setValues((prev) => ({ ...prev, profileImage: imagePath }));
  };

  const handleImageRemove = () => {
    setValues((prev) => ({ ...prev, profileImage: '' }));
  };

  const handleBirthDateChange = (
    e:
      | React.ChangeEvent<{ name: string; value: unknown }>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setValues((prev) => {
      return {
        ...prev,
        birthDate: {
          ...prev.birthDate,
          [name]: Number(value as string)
        }
      };
    });
  };

  const checkEmptyInputFields = (
    values: UserInfoValues,
    errMsgs: UserInfoErrors
  ) => {
    for (const [key, value] of Object.entries(values)) {
      if (
        key === 'newPassword' ||
        key === 'passwordConfirm' ||
        key === 'profileImage'
      )
        return;
      const errorKey = key as keyof UserInfoErrors;
      if (!value) errMsgs[errorKey] = '빈칸을 입력해 주세요.';
    }
  };

  const validateNickname = (nickname: string, errMsgs: UserInfoErrors) => {
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

  const validatePassword = (password: string, errMsgs: UserInfoErrors) => {
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
    errMsgs: UserInfoErrors
  ) => {
    if (password !== passwordConfirm) {
      errMsgs.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }
  };

  const validatePhoneNumber = (
    phoneNumber: string,
    errMsgs: UserInfoErrors
  ) => {
    const pattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
    const hasAllowedChars = /^[0-9-]*$/;

    if (!phoneNumber.includes('-')) {
      return (errMsgs.phoneNumber = '하이픈(-)을 포함하여 입력해주세요.');
    }

    if (!pattern.test(phoneNumber) || !hasAllowedChars.test(phoneNumber)) {
      return (errMsgs.phoneNumber = '유효한 전화번호 형식이 아닙니다.');
    }
  };

  const validateBirthDate = (
    { year, month, day }: UserInfoValues['birthDate'],
    errMsgs: UserInfoErrors
  ) => {
    const birthDate = new Date(Number(year), Number(month) - 1, Number(day));
    const isYearValid = birthDate.getFullYear() === Number(year);
    const isMonthValid = birthDate.getMonth() + 1 === Number(month);
    const isDayValid = birthDate.getDate() === Number(day);

    if (!isYearValid || !isMonthValid || !isDayValid) {
      return (errMsgs.birthDate = '유효한 날짜를 입력해주세요.');
    }
  };

  const validateForm = (values: UserInfoValues) => {
    const errMsgs: UserInfoErrors = initErrors;

    checkEmptyInputFields(values, errMsgs);
    if (!errMsgs.nickname) {
      validateNickname(values.nickname, errMsgs);

      if (
        !nicknameDuplicate.isPass &&
        nicknameDuplicate.prevValue !== values.nickname
      ) {
        errMsgs.nickname = '닉네임 중복 확인을 해주세요.';
      }
    }

    if (!errMsgs.newPassword && values.newPassword)
      validatePassword(values.newPassword, errMsgs);
    if (!errMsgs.passwordConfirm && values.newPassword)
      validatePasswordConfirm(
        values.newPassword,
        values.passwordConfirm,
        errMsgs
      );
    if (!errMsgs.phoneNumber) validatePhoneNumber(values.phoneNumber, errMsgs);
    if (!errMsgs.birthDate) validateBirthDate(values.birthDate, errMsgs);

    return errMsgs;
  };

  const handleCheckNickname = async () => {
    const nickname = values.nickname;
    if (!nickname) {
      return setErrors((prev) => ({
        ...prev,
        nickname: '빈칸을 입력해주세요.'
      }));
    }
    const errMsgs = { ...errors };
    const nicknameError = validateNickname(values.nickname, errMsgs);
    if (nicknameError) return setErrors(errMsgs);

    try {
      const response = await checkNicknameDuplicate({ nickname });

      if (response.status === 201) {
        setNicknameDuplicate((prev) => ({ ...prev, isPass: true }));
        setErrors((prev) => ({ ...prev, nickname: '' }));
        alert('사용할 수 있는 닉네임입니다.');
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          const { message: errMsg } = err.response.data;

          setNicknameDuplicate((prev) => ({
            ...prev,
            isPass: false,
            nickname: ''
          }));
          return setErrors((prev) => ({ ...prev, nickname: errMsg }));
        }
      }

      console.log(err);
      alert('닉네임 중복 확인에 실패하였습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(values);
    setErrors(validationErrors);
    if (Object.values(validationErrors).every((error) => !error)) {
      try {
        const { year, month, day } = values.birthDate;
        const data = {
          password: values.newPassword,
          nickname: values.nickname,
          birth_date: `${year}-${month}-${day}`,
          phone_number: values.phoneNumber,
          gender: values.gender,
          profile_image: values.profileImage
        };
        const response = await editUser(data);

        if (response.status === 200) {
          alert('회원 정보가 수정되었습니다.');
          updateAuthState(true, response.data.user);
          navigate('/mypage');
        }
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            if (
              err.response.data.reason === 'INVALID' ||
              err.response.data.reason === 'EXPIRED'
            ) {
              alert('로그인 상태가 아닙니다. 다시 로그인해주세요.');
              return updateAuthState(false);
            }
          }
        }

        console.log(err);
        alert('회원 정보 수정에 실패하였습니다.');
      }
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getUser();
        if (response.status === 200) {
          const {
            id,
            birth_date,
            gender,
            nickname,
            phone_number,
            profile_image
          } = response.data;

          const [year, month, day] = birth_date.split('-');

          setValues((prev: UserInfoValues) => ({
            ...prev,
            email: id,
            birthDate: {
              year,
              month,
              day
            },
            gender,
            nickname,
            phoneNumber: phone_number,
            profileImage: profile_image
          }));
          setNicknameDuplicate((prev) => ({
            ...prev,
            prevValue: nickname
          }));
        }
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            if (
              err.response.data.reason === 'INVALID' ||
              err.response.data.reason === 'EXPIRED'
            ) {
              alert('로그인 상태가 아닙니다. 다시 로그인해주세요.');
              return updateAuthState(false);
            }
          }
        }

        console.log(err);
        alert('회원 정보 불러오기에 실패하였습니다.');
      }
    };

    getUserData();
  }, [updateAuthState]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <ProfileImage
        handleChange={handleImageChange}
        handleImageRemove={handleImageRemove}
        image={values.profileImage}
      />
      <UserInfo
        values={values}
        errors={errors}
        isNicknameNew={values.nickname !== nicknameDuplicate.prevValue}
        handleChange={handleChange}
        handleCheckNickname={handleCheckNickname}
        handleBirthDateChange={handleBirthDateChange}
      />
      <UserEditButtons />
    </form>
  );
}

export default UserEditForm;
