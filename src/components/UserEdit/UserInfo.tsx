import React, { useMemo } from 'react';
import styles from './UserEditForm.module.scss';
import { UserInfoValues, UserInfoErrors } from './UserEditForm';
import TextField from '@mui/material/TextField';
import {
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';

type UserInfoProps = {
  values: UserInfoValues;
  errors: UserInfoErrors;
  isNicknameNew: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckNickname: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleBirthDateChange: (
    e:
      | React.ChangeEvent<{ name: string; value: unknown }>
      | { target: { name: string; value: string } }
  ) => void;
};

function UserInfo({
  values,
  errors,
  isNicknameNew,
  handleChange,
  handleCheckNickname,
  handleBirthDateChange
}: UserInfoProps) {
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
          <button
            type='button'
            onClick={handleCheckNickname}
            className={
              !isNicknameNew || errors.nickname !== '' ? styles.disabled : ''
            }
            disabled={!isNicknameNew || errors.nickname !== ''}
          >
            중복확인
          </button>
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
        <FormLabel id='demo-radio-buttons-group-label'>성별</FormLabel>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
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
      </li>
      <li className={styles.birthDate}>
        <InputLabel id='birthDate-select-label'>생년월일</InputLabel>
        <Select
          labelId='birthDate-select-label'
          id='demo-simple-select'
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
          id='demo-simple-select'
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
          id='demo-simple-select'
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
        {!errors.phoneNumber && <p className={styles.msg}>하이픈(-) 포함</p>}
        {errors.phoneNumber && (
          <p className={styles.errMsg}>{errors.phoneNumber}</p>
        )}
      </li>
    </ul>
  );
}

export default UserInfo;
