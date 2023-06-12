import React, { Dispatch, SetStateAction } from 'react';
import styles from './PublicStatusScheduleEdit.module.scss';
import { FormGroup, FormControlLabel, Switch } from '@mui/material';

const IS_SCHEDULE_PUBLIC = 'PUBLIC';
const IS_SCHEDULE_PRIVATE = 'PRIVATE';

function PublicStatusScheduleEdit({
  updatedStatus,
  onStatusUpdate
}: {
  updatedStatus: string;
  onStatusUpdate: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className={styles.publicStatus}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              className={styles.statusSwitch}
              checked={updatedStatus === IS_SCHEDULE_PUBLIC ? true : false}
              onClick={() => {
                if (updatedStatus === IS_SCHEDULE_PUBLIC) {
                  onStatusUpdate(IS_SCHEDULE_PRIVATE);
                } else {
                  onStatusUpdate(IS_SCHEDULE_PUBLIC);
                }
              }}
            />
          }
          label={updatedStatus === IS_SCHEDULE_PUBLIC ? '공개' : '비공개'}
        />
      </FormGroup>
    </div>
  );
}

export default PublicStatusScheduleEdit;
