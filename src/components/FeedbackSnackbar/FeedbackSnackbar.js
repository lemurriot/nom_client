import React from 'react';
import Button from '@material-ui/core/Button';
import { IconButton, SnackbarContent } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    // width: '100%',
  },
}));

export default function FeedbackSnackbar({ setOpen, open, message }) {
  const classes = useStyles();
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        className={classes.root}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        action={
          <>
            <IconButton
              size="medium"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              &times;
            </IconButton>
          </>
        }
      />
    </div>
  );
}
