import React, { useMemo, useState } from 'react';
import styles from './RegisterForm.module.scss';
import { RegisterFormData } from '../../types/UserTypes';
import TextField from '@mui/material/TextField';
import {
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { checkNicknameDuplicate, registerUser } from '../../apis/UserAPI';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import AlertModal from '../common/Alert/AlertModal';

type AlertOption = {
  isOpen: boolean;
  message: string;
  onConfirm: null | (() => void);
};

interface RegisterFormValues {
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
}

interface RegisterFormErrors {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  birthDate: string;
  gender: string;
  phoneNumber: string;
}

function RegisterForm() {
  const navigate = useNavigate();
  const initValues: RegisterFormValues = {
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    birthDate: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    },
    gender: '남성',
    phoneNumber: ''
  };
  const initErrors: RegisterFormErrors = {
    ...initValues,
    gender: '',
    birthDate: ''
  };
  const initAlert = {
    isOpen: false,
    message: '',
    onConfirm: null
  };
  const [alertModal, setAlertModal] = useState<AlertOption>(initAlert);
  const [values, setValues] = useState<RegisterFormValues>(initValues);
  const [errors, setErrors] = useState<RegisterFormErrors>(initErrors);
  const [nicknameDuplicate, setNicknameDuplicate] = useState({
    isPass: false,
    nickname: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBirthDateChange = (
    e:
      | React.ChangeEvent<{ name: string; value: unknown }>
      | { target: { name: string; value: number } }
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

  const birthDateOptions = useMemo(() => {
    const getYears = () => {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = currentYear; i >= 1900; i--) {
        years.push(i);
      }
      return years.reverse();
    };

    const getMonths = () => {
      return Array.from({ length: 12 }, (_, i) => i + 1);
    };

    const getDays = () => {
      return Array.from({ length: 31 }, (_, i) => i + 1);
    };

    return {
      years: getYears(),
      months: getMonths(),
      days: getDays()
    };
  }, []);

  const checkEmptyInputFields = (
    values: RegisterFormValues,
    errMsgs: RegisterFormErrors
  ) => {
    for (const [key, value] of Object.entries(values)) {
      const errorKey = key as keyof RegisterFormErrors;
      if (!value) errMsgs[errorKey] = '빈칸을 입력해 주세요.';
    }
  };

  const validateEmail = (email: string, errMsgs: RegisterFormErrors) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!pattern.test(email)) {
      return (errMsgs.email = '유효한 이메일 주소가 아닙니다.');
    }
  };

  const validateNickname = (nickname: string, errMsgs: RegisterFormErrors) => {
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

  const validatePassword = (password: string, errMsgs: RegisterFormErrors) => {
    const hasSpecialChar = /[-_!@#$%&*,.]/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumber = /[0-9]/;
    const minLength = 8;
    const hasAllowedChars = /^[a-zA-Z0-9-_!@#$%&*,.]+$/g;

    if (password.length < minLength) {
      return (errMsgs.password = '비밀번호는 8자 이상이어야 합니다.');
    }

    if (
      !hasSpecialChar.test(password) ||
      !hasUpperCase.test(password) ||
      !hasLowerCase.test(password) ||
      !hasNumber.test(password)
    ) {
      return (errMsgs.password =
        '대문자, 소문자, 특수 문자, 숫자가 1개 이상 포함되어야 합니다.');
    }

    if (!hasAllowedChars.test(password)) {
      return (errMsgs.password = '허용되지 않는 문자입니다.');
    }
  };

  const validatePasswordConfirm = (
    password: string,
    passwordConfirm: string,
    errMsgs: RegisterFormErrors
  ) => {
    if (password !== passwordConfirm) {
      errMsgs.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }
  };

  const validatePhoneNumber = (
    phoneNumber: string,
    errMsgs: RegisterFormErrors
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
    { year, month, day }: RegisterFormValues['birthDate'],
    errMsgs: RegisterFormErrors
  ) => {
    const birthDate = new Date(year, month - 1, day);
    const isYearValid = birthDate.getFullYear() === year;
    const isMonthValid = birthDate.getMonth() + 1 === month;
    const isDayValid = birthDate.getDate() === day;

    if (!isYearValid || !isMonthValid || !isDayValid) {
      return (errMsgs.birthDate = '유효한 날짜를 입력해주세요.');
    }
  };

  const validateForm = (values: RegisterFormValues) => {
    const errMsgs: RegisterFormErrors = initErrors;

    checkEmptyInputFields(values, errMsgs);
    if (!errMsgs.email) validateEmail(values.email, errMsgs);
    if (!errMsgs.nickname) {
      validateNickname(values.nickname, errMsgs);

      if (
        !nicknameDuplicate.isPass ||
        nicknameDuplicate.nickname !== values.nickname
      ) {
        errMsgs.nickname = '닉네임 중복 확인을 해주세요.';
      }
    }
    if (!errMsgs.password) validatePassword(values.password, errMsgs);
    if (!errMsgs.passwordConfirm)
      validatePasswordConfirm(values.password, values.passwordConfirm, errMsgs);
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
        setNicknameDuplicate({ isPass: true, nickname });
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

          setNicknameDuplicate({ isPass: false, nickname: '' });
          return setErrors((prev) => ({ ...prev, nickname: errMsg }));
        }
      }

      console.log(err);
      setAlertModal({
        isOpen: true,
        message: '닉네임 중복 확인에 실패하였습니다.',
        onConfirm: () => setAlertModal(initAlert)
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(values);
    setErrors(validationErrors);

    if (Object.values(validationErrors).every((error) => !error)) {
      const {
        email,
        nickname,
        password,
        phoneNumber,
        birthDate: { year, month, day },
        gender
      } = values;

      try {
        const data: RegisterFormData = {
          id: email,
          password,
          nickname,
          birth_date: `${year}-${month}-${day}`,
          phone_number: phoneNumber,
          gender,
          profile_image: ''
        };

        const response = await registerUser(data);

        if (response.status === 201) {
          setAlertModal({
            isOpen: true,
            message: '회원가입이 완료되었습니다!',
            onConfirm: () => navigate('/login')
          });
        }
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 409) {
            const { message: errMsg, field } = err.response.data;
            return setErrors((prev) => ({ ...prev, [field]: errMsg }));
          }
        }

        console.log(err);
        setAlertModal({
          isOpen: true,
          message: '회원가입에 실패하였습니다. 잠시 후에 다시 시도해주세요.',
          onConfirm: () => setAlertModal(initAlert)
        });
      }
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <ul className={styles.inputs}>
          <li>
            <TextField
              id='email'
              label='이메일'
              variant='outlined'
              name='email'
              value={values.email}
              onChange={handleChange}
              size='small'
              style={{ width: '100%' }}
              sx={{
                '& label.Mui-focused': { color: '#ef6d00' },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#fe9036',
                    borderWidth: '1px'
                  }
                }
              }}
            />
            {errors.email && <p className={styles.errMsg}>{errors.email}</p>}
          </li>
          <li>
            <div className={styles.nickname}>
              <TextField
                id='nickname'
                label='닉네임'
                variant='outlined'
                name='nickname'
                value={values.nickname}
                onChange={handleChange}
                size='small'
                sx={{
                  '& label.Mui-focused': { color: '#ef6d00' },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#fe9036',
                      borderWidth: '1px'
                    }
                  }
                }}
              />
              <button type='button' onClick={handleCheckNickname}>
                중복확인
              </button>
            </div>
            {!errors.nickname && (
              <p className={styles.msg}>
                2자 이상, 6자 이하 (특수 문자, 공백 제외)
              </p>
            )}
            {errors.nickname && (
              <p className={styles.errMsg}>{errors.nickname}</p>
            )}
          </li>
          <li>
            <TextField
              id='password'
              label='비밀번호'
              type='password'
              variant='outlined'
              name='password'
              value={values.password}
              onChange={handleChange}
              size='small'
              style={{ width: '100%' }}
              sx={{
                '& label.Mui-focused': { color: '#ef6d00' },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#fe9036',
                    borderWidth: '1px'
                  }
                }
              }}
            />
            {!errors.password && (
              <p className={styles.msg}>
                8자 이상 (대소문자, 특수 문자, 숫자 포함)
              </p>
            )}
            {errors.password && (
              <p className={styles.errMsg}>{errors.password}</p>
            )}
          </li>
          <li>
            <TextField
              id='passwordConfirm'
              label='비밀번호 확인'
              type='password'
              variant='outlined'
              name='passwordConfirm'
              value={values.passwordConfirm}
              onChange={handleChange}
              size='small'
              style={{ width: '100%' }}
              sx={{
                '& label.Mui-focused': { color: '#ef6d00' },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#fe9036',
                    borderWidth: '1px'
                  }
                }
              }}
            />
            {errors.passwordConfirm && (
              <p className={styles.errMsg}>{errors.passwordConfirm}</p>
            )}
          </li>
          <li className={styles.radioGroup}>
            <FormLabel id='gender'>성별</FormLabel>
            <RadioGroup
              aria-labelledby='gender'
              defaultValue='male'
              name='gender'
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value='남성'
                control={
                  <Radio
                    size='small'
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(254, 203, 161, 0.2)'
                      },
                      '&.Mui-checked': {
                        color: '#fe9036'
                      }
                    }}
                  />
                }
                label='남성'
                checked={values.gender === '남성'}
              />
              <FormControlLabel
                value='여성'
                control={
                  <Radio
                    size='small'
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(254, 203, 161, 0.2)'
                      },
                      '&.Mui-checked': {
                        color: '#fe9036'
                      }
                    }}
                  />
                }
                label='여성'
                checked={values.gender === '여성'}
              />
            </RadioGroup>
            {errors.gender && <p className={styles.errMsg}>{errors.gender}</p>}
          </li>
          <li className={styles.birthDate}>
            <InputLabel id='birthDate-select-label'>생년월일</InputLabel>
            <Select
              labelId='birthDate-select-label'
              id='birthDateYear'
              value={values.birthDate.year}
              name='year'
              label='연도'
              size='small'
              onChange={handleBirthDateChange}
              style={{
                width: 'calc(100% / 3)'
              }}
              sx={{
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#fe9036',
                  borderWidth: '1px'
                }
              }}
            >
              {birthDateOptions.years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
            <Select
              labelId='birthDate-select-label'
              id='birthDateMonth'
              value={values.birthDate.month}
              name='month'
              label='월'
              size='small'
              onChange={handleBirthDateChange}
              style={{
                width: 'calc(100% / 3 - 5px)',
                marginLeft: '5px'
              }}
              sx={{
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#fe9036',
                  borderWidth: '1px'
                }
              }}
            >
              {birthDateOptions.months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
            <Select
              labelId='birthDate-select-label'
              id='birthDateDay'
              value={values.birthDate.day}
              name='day'
              label='일'
              size='small'
              onChange={handleBirthDateChange}
              style={{
                width: 'calc(100% / 3 - 5px)',
                marginLeft: '5px'
              }}
              sx={{
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#fe9036',
                  borderWidth: '1px'
                }
              }}
            >
              {birthDateOptions.days.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
            {errors.birthDate && (
              <p className={styles.errMsg}>{errors.birthDate}</p>
            )}
          </li>
          <li>
            <TextField
              id='outlined-basic'
              label='연락처'
              variant='outlined'
              name='phoneNumber'
              value={values.phoneNumber}
              onChange={handleChange}
              size='small'
              style={{ width: '100%' }}
              sx={{
                '& label.Mui-focused': { color: '#ef6d00' },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#fe9036',
                    borderWidth: '1px'
                  }
                }
              }}
            />
            {!errors.phoneNumber && (
              <p className={styles.msg}>하이픈(-) 포함</p>
            )}
            {errors.phoneNumber && (
              <p className={styles.errMsg}>{errors.phoneNumber}</p>
            )}
          </li>
        </ul>
        <button type='submit'>가입하기</button>
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

export default RegisterForm;
