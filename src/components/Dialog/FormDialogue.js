import React, { useState } from 'react';
import { bool, func } from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';

const FormDialog = ({ open, handleClose, handleSubmit }) => {
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState('');
  const handleSetNewUsername = (e) => {
    if (error && e.target.value.trim().length > 2) {
      setError('');
    }
    setNewUsername(e.target.value);
  };
  const handleSubmitNewUsername = () => {
    if (newUsername.trim().length < 2) {
      return setError('Username must be at least 2 characters long');
    }
    return handleSubmit(newUsername);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Change Username</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter your preferred username</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="New Username"
          type="text"
          fullWidth
          error={error.length}
          onChange={handleSetNewUsername}
          helperText={!!error.length && error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmitNewUsername} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FormDialog.propTypes = {
  open: bool.isRequired,
  handleClose: func.isRequired,
  handleSubmit: func.isRequired,
};

export default FormDialog;
