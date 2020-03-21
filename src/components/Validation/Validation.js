import React from 'react';
import PropTypes from 'prop-types';
import './Validation.css';

const ValidationError = ({ validationId, message }) => (
  <div className="validation-message" id={validationId}>
    {message}
  </div>
);

ValidationError.propTypes = {
  message: PropTypes.string.isRequired,
  validationId: PropTypes.string.isRequired,
};

export default ValidationError;
