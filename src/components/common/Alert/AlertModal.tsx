// Props 로 showCancelButton={true} 면 확인 취소 둘다 보이고, {false} 이면 확인 버튼만 보임
// showTitle={true} 일때만 타이틀이 보임

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef<
  unknown,
  TransitionProps & { children: React.ReactElement }
>(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

interface ConfirmableAlertProps {
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
  showTitle?: boolean;
}

function AlertModal({
  title,
  message,
  onConfirm,
  onCancel,
  showCancelButton,
  showTitle
}: ConfirmableAlertProps) {
  return (
    <Dialog
      open
      TransitionComponent={Transition}
      disableScrollLock
      PaperProps={{
        style: {
          position: 'absolute',
          top: 0
        }
      }}
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0)'
        }
      }}
    >
      {showTitle && title && (
        <DialogTitle
          style={{
            fontSize: '20px',
            textAlign: 'center',
            color: '#ef6d00'
          }}
        >
          {title}
        </DialogTitle>
      )}
      <DialogContent>
        <DialogContentText
          style={{
            color: '#555',
            fontSize: '15px',
            fontWeight: '500'
          }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {showCancelButton && onCancel && (
          <Button
            sx={{
              color: 'black',
              fontWeight: '600',
              '&:hover': {
                color: 'white',
                backgroundColor: 'black'
              }
            }}
            onClick={onCancel}
          >
            취소
          </Button>
        )}
        <Button
          sx={{
            color: '#ef6d00',
            fontWeight: '600',
            '&:hover': {
              color: '#ffffff',
              backgroundColor: '#ef6d00'
            }
          }}
          onClick={onConfirm}
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertModal;
