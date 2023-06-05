import React, { useState } from 'react';
import styles from './RegisterForm.module.scss';
import { Errors, RegisterFormValues } from '../../types/UserTypes';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';

function RegisterForm() {
  const initValues: RegisterFormValues = {
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    birthDate: '',
    gender: 'male',
    phoneNumber: ''
  };
  const [values, setValues] = useState<RegisterFormValues>(initValues);
  const [errors, setErrors] = useState<Errors>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const checkEmptyInputFields = (
    values: RegisterFormValues,
    errMsgs: Errors
  ) => {
    for (const [key, value] of Object.entries(values)) {
      if (!value) errMsgs[key] = '빈칸을 입력해 주세요.';
    }
  };

  const validateEmail = (email: string, errMsgs: Errors) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!pattern.test(email)) {
      errMsgs.email = '유효한 이메일 주소가 아닙니다.';
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

  const validateForm = (values: RegisterFormValues) => {
    const errMsgs: Errors = {};

    checkEmptyInputFields(values, errMsgs);
    if (!errMsgs.email) validateEmail(values.email, errMsgs);
    if (!errMsgs.nickname) validateNickname(values.nickname, errMsgs);
    if (!errMsgs.password) validatePassword(values.password, errMsgs);
    if (!errMsgs.passwordConfirm)
      validatePasswordConfirm(values.password, values.passwordConfirm, errMsgs);
    if (!errMsgs.phoneNumber) validatePhoneNumber(values.phoneNumber, errMsgs);
    //생년월일 유효성 검사는 추가 예정입니다.

    return errMsgs;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(values);
    if (Object.keys(validationErrors).length === 0) {
      alert('유효성 검사 통과!');
      //회원가입 api 호출
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <ul className={styles.inputs}>
        <li>
          <TextField
            id='outlined-basic'
            label='이메일'
            variant='outlined'
            name='email'
            value={values.email}
            onChange={handleChange}
            size='small'
            style={{ width: '100%' }}
          />
          {/* <label htmlFor='email'>이메일</label>
          <input
            type='text'
            id='email'
            name='email'
            value={values.email}
            onChange={handleChange}
          /> */}
          {errors.email && <p className={styles.errMsg}>{errors.email}</p>}
        </li>
        <li>
          {/* <label htmlFor='nickname'>닉네임</label> */}
          <div className={styles.nickname}>
            <TextField
              id='outlined-basic'
              label='닉네임'
              variant='outlined'
              name='nickname'
              value={values.nickname}
              onChange={handleChange}
              size='small'
            />
            {/* <input
              type='text'
              name='nickname'
              id='nickname'
              value={values.nickname}
              onChange={handleChange}
            /> */}
            <button type='button'>중복확인</button>
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
            id='outlined-basic'
            label='비밀번호'
            type='password'
            variant='outlined'
            name='password'
            value={values.password}
            onChange={handleChange}
            size='small'
            style={{ width: '100%' }}
          />
          {/* <label htmlFor='password'>비밀번호</label>
          <input
            type='password'
            name='password'
            id='password'
            value={values.password}
            onChange={handleChange}
          /> */}
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
            id='outlined-basic'
            label='비밀번호 확인'
            type='password'
            variant='outlined'
            name='passwordConfirm'
            value={values.passwordConfirm}
            onChange={handleChange}
            size='small'
            style={{ width: '100%' }}
          />
          {/* <label htmlFor='passwordConfirm'>비밀번호 확인</label>
          <input
            type='password'
            name='passwordConfirm'
            id='passwordConfirm'
            value={values.passwordConfirm}
            onChange={handleChange}
          /> */}
          {errors.passwordConfirm && (
            <p className={styles.errMsg}>{errors.passwordConfirm}</p>
          )}
        </li>
        <li className={styles.radioGroup}>
          <FormLabel id='demo-radio-buttons-group-label'>성별</FormLabel>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='male'
            name='gender'
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value='male'
              control={<Radio size='small' />}
              label='남성'
              checked={values.gender === 'male'}
            />
            <FormControlLabel
              value='female'
              control={<Radio size='small' />}
              label='여성'
              checked={values.gender === 'female'}
            />
          </RadioGroup>
          {/* <label htmlFor='gender'>성별</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type='radio'
                name='gender'
                value='male'
                checked={values.gender === 'male'}
                onChange={handleChange}
              />
              남자
            </label>
            <label>
              <input
                type='radio'
                name='gender'
                value='female'
                checked={values.gender === 'female'}
                onChange={handleChange}
              />
              여자
            </label> 
          </div>*/}
          {errors.gender && <p className={styles.errMsg}>{errors.gender}</p>}
        </li>
        <li>
          {/* <label htmlFor='birthDate'>생년월일</label>
          <input
            type='text'
            name='birthDate'
            id='birthDate'
            value={values.birthDate}
            onChange={handleChange}
          /> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label='생년월일'
                slotProps={{ textField: { size: 'small' } }}
              />
            </DemoContainer>
          </LocalizationProvider>
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
          />
          {/* <label htmlFor='phoneNumber'>연락처</label>
          <input
            type='text'
            name='phoneNumber'
            id='phoneNumber'
            value={values.phoneNumber}
            onChange={handleChange}
          /> */}
          {!errors.phoneNumber && <p className={styles.msg}>하이픈(-) 포함</p>}
          {errors.phoneNumber && (
            <p className={styles.errMsg}>{errors.phoneNumber}</p>
          )}
        </li>
      </ul>
      <button type='submit'>가입하기</button>
    </form>
  );
}

export default RegisterForm;
