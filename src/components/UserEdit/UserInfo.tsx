import React from 'react';
import styles from './UserEditForm.module.scss';
import { UserInfoValues } from './UserEditForm';

interface UserInfoProps {
  values: UserInfoValues;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function UserInfo({ values, handleChange }: UserInfoProps) {
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
        <label htmlFor='password'>비밀번호 변경</label>
        <input
          type='password'
          id='newPassword'
          name='newPassword'
          value={values.newPassword}
          onChange={handleChange}
        />
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
      </li>
    </ul>
  );
}

export default UserInfo;
