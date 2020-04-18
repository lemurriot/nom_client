import React from 'react';
import { IconButton } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { func, bool, string } from 'prop-types';
import { useStyles } from '../../hooks/useStyles';

export default function FeedbackSnackbar({ setOpen, open, message }) {
  const classes = useStyles();
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      className={classes.snackbarRoot}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={2200}
      onClose={handleClose}
      message={message}
      action={
        <IconButton
          size="medium"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          &times;
        </IconButton>
      }
    />
  );
}

FeedbackSnackbar.propTypes = {
  setOpen: func.isRequired,
  open: bool.isRequired,
  message: string.isRequired,
};
