import React, { Dispatch, SetStateAction } from 'react';
import styles from './PublicStatusScheduleEdit.module.scss';
import { alpha, styled } from '@mui/material/styles';
import { FormGroup, FormControlLabel, Switch } from '@mui/material';
import {
  IS_SCHEDULE_PUBLIC,
  IS_SCHEDULE_PRIVATE
} from '../../constants/Schedule';

const CustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#ef6d00',
    '&:hover': {
      backgroundColor: alpha('#ef6d00', theme.palette.action.hoverOpacity)
    }
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#ef6d00'
  }
}));

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
            <CustomSwitch
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
