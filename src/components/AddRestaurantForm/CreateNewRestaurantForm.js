import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const CreateNewRestaurantForm = ({
  setShowCreateForm,
  setShowSubmitForm,
  setSelectedRestaurant,
  category,
}) => (
  <div className="submit-form--outer">
    <div className="submit-form--inner">
      <button type="button" onClick={() => setShowCreateForm(false)}>
        Cancel
      </button>
      <div className="submit-form--container">
        <h4>Nominate a New Restaurant for Best {category}</h4>
        <Formik
          initialValues={{ name: '', address: '' }}
          validate={(values) => {
            const errors = {};
            if (values.name.length > 185) {
              errors.name = 'Comment cannot exceed 185 characters';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSelectedRestaurant({
                name: values.name,
                address: values.address,
                subtitle: '',
                id: '',
                apiReferred: false,
              });
              setSubmitting(false);
              setShowSubmitForm(true);
              setShowCreateForm(false);
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
  category: PropTypes.string.isRequired,
  setShowCreateForm: PropTypes.func,
  setShowSubmitForm: PropTypes.func,
  setSelectedRestaurant: PropTypes.func,
};

CreateNewRestaurantForm.defaultProps = {
  setShowCreateForm: () => {},
  setShowSubmitForm: () => {},
  setSelectedRestaurant: () => {},
};

export default CreateNewRestaurantForm;
