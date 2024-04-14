import { ApolloError } from '@apollo/client';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { FC, useState } from 'react';

import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import LoadingButton from 'components/LoadingButton';

// Description: A button that opens a confirmation dialog before executing the action

const ConfirmButton: FC<{
  children: string | JSX.Element;
  onConfirm: any;
  loading?: boolean;
  error?: ApolloError;
  title?: string;
  description?: string;
  confirmButtonLabel?: string;
}> = ({ children, onConfirm, loading, error, title, description, confirmButtonLabel }) => {
  const [showConfirmDialog, toggleConfirmDialog] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => toggleConfirmDialog(true)}>
        {children}
      </Button>
      <Dialog open={showConfirmDialog} onClose={() => toggleConfirmDialog(false)}>
        <DialogTitle>{title || 'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description || 'Please confirm your action'}</DialogContentText>
          {error && <ErrorMessage error={error} type="alert" />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleConfirmDialog(false)}>Cancel</Button>
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={() => onConfirm().then(() => toggleConfirmDialog(false))}
          >
            {confirmButtonLabel || 'Confirm'}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmButton;
