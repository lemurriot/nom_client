import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { portlandCities } from '../../constants/portlandGeoConstants';
import { validateZipCode } from '../../utils';

const CreateNewRestaurantForm = ({
  setSelectedRestaurant,
  selectedRestaurant: { name, address, city, zip },
  setCurrentForm,
}) => (
  <>
    <Formik
      initialValues={{ name, address, city, zip }}
      validate={(values) => {
        const errors = {};
        if (values.name.length > 65) {
          errors.name = 'Restaurant name cannot exceed 65 characters';
        }
        if (!validateZipCode(values.zip)) {
          errors.zip = 'Not a valid Portland area zip code';
        }
        return errors;
      }}
      onSubmit={({ name, address, city, zip }, { setSubmitting }) => {
        setTimeout(() => {
          setSelectedRestaurant({
            name,
            address,
            city,
            zip,
            subtitle: `${address}, ${city}, ${
              city === 'Vancouver' ? 'WA' : 'OR'
            }, ${zip}`,
            id: '',
            apiReferred: false,
          });
          setSubmitting(false);
          setCurrentForm('submit');
        }, 400);
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(65).required('Required'),
        address: Yup.string().required('Required'),
        zip: Yup.string().length(5).required('Required'),
      })}
    >
      {({
        errors,
        isSubmitting,
        handleSubmit,
        values,
        touched,
        handleChange,
        handleBlur,
      }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            required
            label="Restaurant Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
          />
          <TextField
            required
            label="Restaurant Address"
            name="address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
          />
          <InputLabel id="city-select-menu">City</InputLabel>
          <Select
            required
            labelId="city-select-menu"
            label="City"
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {portlandCities.map((_city) => (
              <MenuItem key={_city} value={_city}>
                {_city}
              </MenuItem>
            ))}
          </Select>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            autoComplete="off"
            onChange={handleChange}
            error={errors.zip && touched.zip}
            helperText={errors.zip && touched.zip && errors.zip}
          />
          {/* <ErrorMessage name="zip" component="div" /> */}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
    <div className="form-buttons">
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCurrentForm('search')}
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
  </>
);

// const CreateNewRestaurantForm = ({
//   // setShowCreateForm,
//   // setShowSubmitForm,
//   setCurrentForm,
//   setSelectedRestaurant,
//   // category,
// }) => (
//   <div className="submit-form--outer">
//     <div className="submit-form--inner">
//       <div className="submit-form--container">
//         {/* <h4>Nominate a New Restaurant for Best {category}</h4> */}
//         <Formik
//           initialValues={{ name: '', address: '' }}
//           validate={(values) => {
//             const errors = {};
//             if (values.name.length > 185) {
//               errors.name = 'Comment cannot exceed 185 characters';
//             }
//             return errors;
//           }}
//           onSubmit={(values, { setSubmitting }) => {
//             setTimeout(() => {
//               setSelectedRestaurant({
//                 name: values.name,
//                 address: values.address,
//                 subtitle: '',
//                 id: '',
//                 apiReferred: false,
//               });
//               setSubmitting(false);
//               setShowSubmitForm(true);
//               setShowCreateForm(false);
//             }, 400);
//           }}
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               <label htmlFor="name">Restaurant Name:</label>
//               <Field type="text" name="name" />
//               <ErrorMessage name="name" component="div" />
//               <label htmlFor="address">Restaurant Address:</label>
//               <Field type="text" name="address" />
//               <ErrorMessage name="address" component="div" />
//               <button type="submit" disabled={isSubmitting}>
//                 Submit
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   </div>
// );

CreateNewRestaurantForm.propTypes = {
  // category: PropTypes.string.isRequired,
  // setShowCreateForm: PropTypes.func,
  setCurrentForm: PropTypes.func,
  setSelectedRestaurant: PropTypes.func,
};

CreateNewRestaurantForm.defaultProps = {
  // setShowCreateForm: () => {},
  setCurrentForm: () => {},
  setSelectedRestaurant: () => {},
};

export default CreateNewRestaurantForm;
