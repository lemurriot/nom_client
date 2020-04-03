import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { string, func, bool } from 'prop-types';

const WarningModal = ({
  showWarningModal,
  setShowWarningModal,
  proceedFunction,
  headingText,
  buttonText,
  subtext,
}) => (
  <Dialog
    open={showWarningModal}
    onClose={setShowWarningModal}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{headingText}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {subtext}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={setShowWarningModal} color="default">
        Cancel
      </Button>
      <Button onClick={proceedFunction} color="primary" size="large" autoFocus>
        {buttonText}
      </Button>
    </DialogActions>
  </Dialog>
);

WarningModal.propTypes = {
  showWarningModal: bool,
  setShowWarningModal: func,
  proceedFunction: func,
  headingText: string.isRequired,
  buttonText: string.isRequired,
  subtext: string.isRequired,
};

WarningModal.defaultProps = {
  showWarningModal: false,
  setShowWarningModal: () => {},
  proceedFunction: () => {},
};

export default WarningModal;
