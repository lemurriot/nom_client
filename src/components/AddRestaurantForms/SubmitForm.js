import React from 'react';
import { shape, string, bool, func } from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@material-ui/core';

const SubmitForm = ({
  selectedRestaurant: { name, subtitle, id, apiReferred },
  // setShowSubmitForm,
  setCurrentForm,
  onSubmitForm,
  category,
}) => {
  // const closeSubmitForm = () => setShowSubmitForm(false);
  return (
    <div className="submit-form--outer">
      <div className="submit-form--inner">
        {/* <button type="button" onClick={closeSubmitForm}>
          Cancel
        </button> */}
        <div className="submit-form--container">
          <div className="prepop-title">You Are Nominating</div>
          <div className="restaurant-title">{name}</div>
          <div className="restaurant-subtitle">{subtitle}</div>
          <div className="restaurant-title">For Best {category}</div>
          <Formik
            initialValues={{ comment: '' }}
            validate={(values) => {
              const errors = {};
              if (values.comment.length > 185) {
                errors.comment = 'Comment cannot exceed 185 characters';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                onSubmitForm(values.comment);
                setSubmitting(false);
                setCurrentForm('');
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <label htmlFor="comment">Add a Comment (optional):</label>
                <Field type="text" name="comment" />
                <ErrorMessage name="comment" component="div" />
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="form-buttons">
          <Button
            variant="outlined"
            color="primary"
            onClick={
              apiReferred
                ? () => setCurrentForm('search')
                : () => setCurrentForm('create')
            }
          >
            Previous
          </Button>
          {/* <Button
        disabled={!value}
        variant="contained"
        color="primary"
        onClick={() => setCurrentForm('search')}
      >
        Next
      </Button> */}
        </div>
      </div>
    </div>
  );
};

SubmitForm.propTypes = {
  category: string.isRequired,
  selectedRestaurant: shape({
    name: string.isRequired,
    subtitle: string.isRequired,
    id: string.isRequired,
    apiReferred: bool.isRequired,
  }).isRequired,
  setShowSubmitForm: func,
};

SubmitForm.defaultProps = {
  setShowSubmitForm: () => {},
};

export default SubmitForm;
