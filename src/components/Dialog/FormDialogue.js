import React, { useState } from 'react';
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
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleSubmit(newUsername)} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
