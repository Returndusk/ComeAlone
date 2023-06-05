import React from 'react';
import styles from './UserEditButtons.module.scss';

function UserEditButtons() {
  return (
    <ul className={styles.buttons}>
      <li>
        <button type='submit'>수정하기</button>
      </li>
      <li>
        <button className={styles.cancelBtn} type='button'>
          취소
        </button>
      </li>
    </ul>
  );
}

export default UserEditButtons;
