import React from 'react';
import styles from './UserEditForm.module.scss';
import { UserInfoProps } from '../../types/UserTypes';
import TextField from '@mui/material/TextField';
import { FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';

function UserInfo({ values, errors, handleChange }: UserInfoProps) {
  return (
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
          disabled
        />
      </li>
      <li>
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
        <TextField
          id='outlined-basic'
          label='비밀번호 변경'
          type='password'
          variant='outlined'
          name='newPassword'
          value={values.newPassword}
          onChange={handleChange}
          size='small'
          style={{ width: '100%' }}
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
        {errors.gender && <p className={styles.errMsg}>{errors.gender}</p>}
      </li>
      <li>
        <TextField
          id='outlined-basic'
          label='생년월일'
          variant='outlined'
          name='birthDate'
          value={values.birthDate}
          onChange={handleChange}
          size='small'
          style={{ width: '100%' }}
        />
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
        {!errors.phoneNumber && <p className={styles.msg}>하이픈(-) 포함</p>}
        {errors.phoneNumber && (
          <p className={styles.errMsg}>{errors.phoneNumber}</p>
        )}
      </li>
    </ul>
  );
}

export default UserInfo;
