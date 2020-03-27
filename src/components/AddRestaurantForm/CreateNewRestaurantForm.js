import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const CreateNewRestaurantForm = ({ setShowCreateForm }) => (
  <div className="submit-form--outer">
    <div className="submit-form--inner">
      <button type="button" onClick={() => setShowCreateForm(false)}>
        Cancel
      </button>
      <div className="submit-form--container">
        <h4>Add a New Restaurant</h4>
        <Formik
          initialValues={{ name: '', address: '' }}
          validate={(values) => {
            const errors = {};
            if (values.comment.length > 185) {
              errors.name = 'Comment cannot exceed 185 characters';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <label htmlFor="name">Restaurant Name:</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />
              <label htmlFor="address">Restaurant Address:</label>
              <Field type="text" name="address" />
              <ErrorMessage name="address" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  </div>
);

CreateNewRestaurantForm.propTypes = {
  setShowCreateForm: PropTypes.func,
};

CreateNewRestaurantForm.defaultProps = {
  setShowCreateForm: () => {},
};

export default CreateNewRestaurantForm;
