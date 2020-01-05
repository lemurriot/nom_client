import React from "react";
import PropTypes from "prop-types";
import "./Validation.css";

export default function ValidationError(props) {
  return (
    <div className="validation-message" id={props.validationId}>
      {props.message}
    </div>
  );
}

ValidationError.propTypes = {
  message: PropTypes.string,
  validationId: PropTypes.string.isRequired
};
