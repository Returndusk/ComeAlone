import React from 'react';
import styles from './PublicStatusScheduleEdit.module.scss';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ScheduleEditPublicStatusPropsType } from '../../types/ScheduleEdit';

function PublicStatusScheduleEdit({
  updatedStatus,
  onStatusUpdate
}: ScheduleEditPublicStatusPropsType) {
  return (
    <div className={styles.publicStatus}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={updatedStatus === 'PUBLIC' ? true : false}
              onClick={() => {
                if (updatedStatus === 'PUBLIC') {
                  onStatusUpdate('PRIVATE');
                } else {
                  onStatusUpdate('PUBLIC');
                }
              }}
            />
          }
          label={updatedStatus === 'PUBLIC' ? '공개' : '비공개'}
        />
      </FormGroup>
    </div>
  );
}

export default PublicStatusScheduleEdit;
