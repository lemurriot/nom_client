import React from 'react';
import { shape, string, bool, func } from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@material-ui/core';

const SubmitForm = ({
  selectedRestaurant: { name, subtitle, apiReferred },
  setCurrentForm,
  onSubmitForm,
  category,
}) => {
  return (
    <>
      <div className="submit-form-info__container">
        <div className="submit-form-info__guide-text">You Are Nominating</div>
        <div className="submit-form-info__restaurant-title">{name}</div>
        <div className="submit-form-info__restaurant-subtitle">{subtitle}</div>
        <div className="submit-form-info__guide-text">For Best {category}</div>
      </div>
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
            <Field
              as="textarea"
              name="comment"
              placeholder="Add a Comment... (optional)"
              style={{ width: '100%', border: '1px solid grey' }}
            />
            <ErrorMessage
              name="comment"
              component="div"
              style={{ color: 'red' }}
            />
            <div className="form-buttons__container form-buttons__container--submit">
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
              <Button
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit!
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
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
  onSubmitForm: func,
  setCurrentForm: func,
};

SubmitForm.defaultProps = {
  onSubmitForm: () => {},
  setCurrentForm: () => {},
};

export default SubmitForm;
