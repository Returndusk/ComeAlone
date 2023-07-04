import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './UserEditForm.module.scss';
import ProfileImage from './ProfileImage';
import UserInfo from './UserInfo';
import UserEditButtons from './UserEditButtons';
import { checkNicknameDuplicate, editUser, getUser } from '../../apis/UserAPI';
import { AxiosError } from 'axios';
import { useAuthState } from '../../contexts/AuthContext';
import AlertModal from '../common/Alert/AlertModal';

type AlertOption = {
  isOpen: boolean;
  message: string;
  onConfirm: null | (() => void);
};

export interface UserInfoValues {
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
}

export interface UserInfoErrors {
  email: string;
  profileImage: string;
  nickname: string;
  newPassword: string;
  passwordConfirm: string;
  birthDate: string;
  phoneNumber: string;
}

interface Validator {
  nickname: (nickname: string) => string;
  newPassword: (password: string) => string;
  passwordConfirm: (passwordConfirm: string) => string;
  phoneNumber: (phoneNumber: string) => string;
}

function UserEditForm() {
  const navigate = useNavigate();
  const { authState, updateAuthState } = useAuthState();
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
  const initAlert = {
    isOpen: false,
    message: '',
    onConfirm: null
  };
  const [alertModal, setAlertModal] = useState<AlertOption>(initAlert);
  const [values, setValues] = useState<UserInfoValues>(initValues);
  const [errors, setErrors] = useState<UserInfoErrors>(initErrors);
  const [nicknameDuplicate, setNicknameDuplicate] = useState({
    isPass: false,
    prevValue: ''
  });

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

  const validateNickname = (nickname: string) => {
    let errMsg = '';
    const minLength = 2;
    const maxLength = 6;
    const hasAllowedChars = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]+$/;

    if (nickname.length < minLength || nickname.length > maxLength) {
      return (errMsg = `닉네임은 ${minLength}자 이상, ${maxLength}자 이하여야 합니다.`);
    }

    if (nickname.includes(' ')) {
      return (errMsg = '닉네임에는 공백을 사용할 수 없습니다.');
    }

    if (!hasAllowedChars.test(nickname)) {
      return (errMsg =
        '닉네임은 알파벳 대소문자, 숫자, 한글만 사용할 수 있습니다.');
    }

    return errMsg;
  };

  const validatePassword = (password: string) => {
    let errMsg = '';
    const hasSpecialChar = /[-_!@#$%&*,.]/;
    const hasNumber = /[0-9]/;
    const minLength = 8;
    const maxLength = 20;
    const hasAllowedChars = /^[a-zA-Z0-9-_!@#$%&*,.]+$/g;

    if (!hasSpecialChar.test(password) || !hasNumber.test(password)) {
      return (errMsg = '특수 문자와 숫자가 1개 이상 포함되어야 합니다.');
    }

    if (!hasAllowedChars.test(password)) {
      return (errMsg = '허용되지 않는 문자입니다.');
    }

    if (password.length < minLength) {
      return (errMsg = `비밀번호는 ${minLength}자 이상이어야 합니다.`);
    }

    if (password.length > maxLength) {
      return (errMsg = `비밀번호는 ${maxLength}자 이하여야 합니다.`);
    }

    return errMsg;
  };

  const validatePasswordConfirm = (passwordConfirm: string) => {
    let errMsg = '';
    if (passwordConfirm !== values.newPassword) {
      return (errMsg = '비밀번호가 일치하지 않습니다.');
    }

    return errMsg;
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    let errMsg = '';
    const pattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
    const hasAllowedChars = /^[0-9-]*$/;

    if (!phoneNumber.includes('-')) {
      return (errMsg = '하이픈(-)을 포함하여 입력해주세요.');
    }

    if (!pattern.test(phoneNumber) || !hasAllowedChars.test(phoneNumber)) {
      return (errMsg = '유효한 전화번호 형식이 아닙니다.');
    }

    return errMsg;
  };

  const validateBirthDate = ({
    year,
    month,
    day
  }: UserInfoValues['birthDate']) => {
    let errMsg = '';
    const birthDate = new Date(Number(year), Number(month) - 1, Number(day));
    const isYearValid = birthDate.getFullYear() === Number(year);
    const isMonthValid = birthDate.getMonth() + 1 === Number(month);
    const isDayValid = birthDate.getDate() === Number(day);

    if (!isYearValid || !isMonthValid || !isDayValid) {
      return (errMsg = '유효한 날짜를 입력해주세요.');
    }

    return errMsg;
  };

  const validators: Validator = {
    newPassword: validatePassword,
    passwordConfirm: validatePasswordConfirm,
    nickname: validateNickname,
    phoneNumber: validatePhoneNumber
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    //유효성 검사
    if (name === 'gender') return;
    if (name === 'newPassword' && !value) {
      if (!values.passwordConfirm) {
        setErrors((prev) => ({ ...prev, passwordConfirm: '' }));
      }
      return setErrors((prev) => ({ ...prev, newPassword: '' }));
    }

    const error = validators[name as keyof typeof validators](value);
    setErrors((prev) => ({ ...prev, [name]: error }));
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

    //유효성 검사
    const error = validateBirthDate({ ...values.birthDate, [name]: value });
    setErrors((prev) => ({ ...prev, birthDate: error }));
  };

  const handleCheckNickname = async () => {
    const nickname = values.nickname;
    if (!nickname) {
      return setErrors((prev) => ({
        ...prev,
        nickname: '빈칸을 입력해주세요.'
      }));
    }

    try {
      const response = await checkNicknameDuplicate({ nickname });

      if (response.status === 201) {
        setNicknameDuplicate((prev) => ({ ...prev, isPass: true }));
        setErrors((prev) => ({ ...prev, nickname: '' }));
        setAlertModal({
          isOpen: true,
          message: '사용할 수 있는 닉네임입니다.',
          onConfirm: () => setAlertModal(initAlert)
        });
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

      setAlertModal({
        isOpen: true,
        message: '닉네임 중복 확인에 실패하였습니다.',
        onConfirm: () => setAlertModal(initAlert)
      });
    }
  };

  const validateForm = (values: UserInfoValues) => {
    const errMsgs: UserInfoErrors = { ...errors };

    checkEmptyInputFields(values, errMsgs);

    if (!errMsgs.nickname) {
      errMsgs.nickname = validateNickname(values.nickname);
    }

    if (!errMsgs.newPassword && values.newPassword) {
      errMsgs.newPassword = validatePassword(values.newPassword);
    }

    if (!errMsgs.passwordConfirm && values.newPassword) {
      errMsgs.passwordConfirm = validatePasswordConfirm(values.passwordConfirm);
    }

    if (!errMsgs.phoneNumber) {
      errMsgs.phoneNumber = validatePhoneNumber(values.phoneNumber);
    }

    errMsgs.birthDate = validateBirthDate(values.birthDate);

    return errMsgs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //에러 존재시 에러메시지 출력 (가입X)
    const validationErrors = validateForm(values);
    const hasErrors = Object.values(validationErrors).some((error) => error);
    if (hasErrors) return setErrors(validationErrors);

    //닉네임 중복 확인 여부 확인
    if (
      !nicknameDuplicate.isPass &&
      nicknameDuplicate.prevValue !== values.nickname
    ) {
      return setAlertModal({
        isOpen: true,
        message: '닉네임 중복확인을 해주세요.',
        onConfirm: () => setAlertModal(initAlert)
      });
    }

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
        setAlertModal({
          isOpen: true,
          message: '회원 정보가 수정되었습니다.',
          onConfirm: () => {
            updateAuthState(true, response.data.user);
            navigate('/mypage');
          }
        });
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          if (
            err.response.data.reason === 'INVALID' ||
            err.response.data.reason === 'EXPIRED'
          ) {
            return setAlertModal({
              isOpen: true,
              message: '로그인 상태가 아닙니다. 다시 로그인해주세요.',
              onConfirm: () => updateAuthState(false)
            });
          }
        }
      }

      setAlertModal({
        isOpen: true,
        message: '회원 정보 수정에 실패하였습니다.',
        onConfirm: () => setAlertModal(initAlert)
      });
    }
  };

  useEffect(() => {
    if (authState.isLoggedIn) {
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
                return setAlertModal({
                  isOpen: true,
                  message: '로그인 상태가 아닙니다. 다시 로그인해주세요.',
                  onConfirm: () => updateAuthState(false)
                });
              }
            }
          }

          setAlertModal({
            isOpen: true,
            message: '회원 정보 불러오기에 실패하였습니다.',
            onConfirm: () => setAlertModal(initAlert)
          });
        }
      };

      getUserData();
    }
  }, [authState.isLoggedIn, updateAuthState]);

  return (
    <>
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
      {alertModal.isOpen && alertModal.onConfirm && (
        <AlertModal
          message={alertModal.message}
          onConfirm={alertModal.onConfirm}
        />
      )}
    </>
  );
}

export default UserEditForm;
