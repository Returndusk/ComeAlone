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
import { registerUser } from '../../apis/UserAPI';
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

interface Validator {
  email: (email: string) => string;
  nickname: (nickname: string) => string;
  password: (password: string) => string;
  passwordConfirm: (passwordConfirm: string) => string;
  // birthDate: ({ year, month, day }: RegisterFormValues['birthDate'])=> string;
  phoneNumber: (phoneNumber: string) => string;
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

  const checkEmptyInputFields = (
    values: RegisterFormValues,
    errMsgs: RegisterFormErrors
  ) => {
    for (const [key, value] of Object.entries(values)) {
      const errorKey = key as keyof RegisterFormErrors;
      if (!value) errMsgs[errorKey] = '빈칸을 입력해 주세요.';
    }
  };

  const validateEmail = (email: string) => {
    let errMsg = '';
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!pattern.test(email)) {
      return (errMsg = '유효한 이메일 주소가 아닙니다.');
    }

    return errMsg;
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
    if (passwordConfirm !== values.password) {
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
  }: RegisterFormValues['birthDate']) => {
    let errMsg = '';
    const birthDate = new Date(year, month - 1, day);
    const isYearValid = birthDate.getFullYear() === year;
    const isMonthValid = birthDate.getMonth() + 1 === month;
    const isDayValid = birthDate.getDate() === day;

    if (!isYearValid || !isMonthValid || !isDayValid) {
      return (errMsg = '유효한 날짜를 입력해주세요.');
    }

    return errMsg;
  };

  const validators: Validator = {
    email: validateEmail,
    password: validatePassword,
    passwordConfirm: validatePasswordConfirm,
    nickname: validateNickname,
    phoneNumber: validatePhoneNumber
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    //유효성 검사
    if (name === 'gender') return;
    const error = validators[name as keyof typeof validators](value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBirthDateChange = (
    e:
      | React.ChangeEvent<{ name: string; value: unknown }>
      | { target: { name: string; value: number } }
  ) => {
    const { value, name } = e.target as {
      value: string;
      name: keyof typeof validators;
    };
    setValues((prev) => {
      return {
        ...prev,
        birthDate: {
          ...prev.birthDate,
          [name]: Number(value as string)
        }
      };
    });

    const error = validateBirthDate({ ...values.birthDate, [name]: value });
    setErrors((prev) => ({ ...prev, birthDate: error }));
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

  const validateForm = (values: RegisterFormValues) => {
    const errMsgs: RegisterFormErrors = { ...errors };

    checkEmptyInputFields(values, errMsgs);

    if (!errMsgs.email) {
      errMsgs.email = validateEmail(values.email);
    }

    if (!errMsgs.nickname) {
      errMsgs.nickname = validateNickname(values.nickname);
    }

    if (!errMsgs.password) {
      errMsgs.password = validatePassword(values.password);
    }

    if (!errMsgs.passwordConfirm) {
      errMsgs.passwordConfirm = validatePasswordConfirm(values.passwordConfirm);
    }

    errMsgs.birthDate = validateBirthDate(values.birthDate);

    if (!errMsgs.phoneNumber) {
      errMsgs.phoneNumber = validatePhoneNumber(values.phoneNumber);
    }

    return errMsgs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //에러 존재시 에러메시지 출력 (가입X)
    const validationErrors = validateForm(values);
    const hasErrors = Object.values(validationErrors).some((error) => error);
    if (hasErrors) return setErrors(validationErrors);

    //회원가입 api 호출
    try {
      const {
        email,
        nickname,
        password,
        phoneNumber,
        birthDate: { year, month, day },
        gender
      } = values;

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

      setAlertModal({
        isOpen: true,
        message: '회원가입에 실패하였습니다. 잠시 후에 다시 시도해주세요.',
        onConfirm: () => setAlertModal(initAlert)
      });
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <ul className={styles.inputs}>
          <li>
            <div className={styles.email}>
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
            </div>
            {errors.email && <p className={styles.errMsg}>{errors.email}</p>}
          </li>
          <li>
            <TextField
              id='nickname'
              label='닉네임'
              variant='outlined'
              name='nickname'
              value={values.nickname}
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
              <p className={styles.msg}>8자 이상 (특수 문자, 숫자 포함)</p>
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
              inputProps={{
                maxLength: 13
              }}
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
