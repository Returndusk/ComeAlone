import React from 'react';
import styles from './UserEditForm.module.scss';
import { UserInfoValues, Errors } from './UserEditForm';

interface UserInfoProps {
  values: UserInfoValues;
  errors: Errors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function UserInfo({ values, errors, handleChange }: UserInfoProps) {
  return (
    <ul className={styles.inputs}>
      <li>
        <label htmlFor='email'>이메일</label>
        <input
          type='text'
          id='email'
          name='email'
          value={values.email}
          disabled
        />
      </li>
      <li>
        <label htmlFor='nickname'>닉네임</label>
        <div className={styles.nickname}>
          <input
            type='text'
            name='nickname'
            id='nickname'
            value={values.nickname}
            onChange={handleChange}
          />
          <button type='button'>중복확인</button>
        </div>
        {!errors.nickname && (
          <p className={styles.msg}>
            2자 이상, 6자 이하 (특수 문자, 공백 제외)
          </p>
        )}
        {errors.nickname && <p className={styles.errMsg}>{errors.nickname}</p>}
      </li>
      <li>
        <label htmlFor='password'>비밀번호 변경</label>
        <input
          type='password'
          id='newPassword'
          name='newPassword'
          value={values.newPassword}
          onChange={handleChange}
        />
        {!errors.newPassword && (
          <p className={styles.msg}>
            8자 이상 (대소문자, 특수 문자, 숫자 포함)
          </p>
        )}
        {errors.newPassword && (
          <p className={styles.errMsg}>{errors.newPassword}</p>
        )}
      </li>
      <li>
        <label htmlFor='passwordConfirm'>비밀번호 확인</label>
        <input
          type='password'
          name='passwordConfirm'
          id='passwordConfirm'
          value={values.passwordConfirm}
          onChange={handleChange}
        />
        {errors.passwordConfirm && (
          <p className={styles.errMsg}>{errors.passwordConfirm}</p>
        )}
      </li>
      <li>
        <label htmlFor='birthDate'>생년월일</label>
        <input
          type='text'
          name='birthDate'
          id='birthDate'
          value={values.birthDate}
          onChange={handleChange}
        />
        {errors.birthDate && (
          <p className={styles.errMsg}>{errors.birthDate}</p>
        )}
      </li>
      <li>
        <label htmlFor='gender'>성별</label>
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
        </div>
      </li>
      <li>
        <label htmlFor='phoneNumber'>연락처</label>
        <input
          type='text'
          name='phoneNumber'
          id='phoneNumber'
          value={values.phoneNumber}
          onChange={handleChange}
        />
        {!errors.phoneNumber && <p className={styles.msg}>하이픈(-) 포함</p>}
        {errors.phoneNumber && (
          <p className={styles.errMsg}>{errors.phoneNumber}</p>
        )}
      </li>
    </ul>
  );
}

export default UserInfo;
