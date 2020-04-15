import React from 'react';
import { func, string, shape } from 'prop-types';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import { Formik } from 'formik';
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
        if (values.name.length > 50) {
          errors.name = 'Restaurant name cannot exceed 50 characters';
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
        name: Yup.string().max(50).required('Required'),
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
          <div className="create-form__fields flex-container--column">
            <TextField
              required
              label="Restaurant Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              error={errors.name && touched.name}
              helperText={touched.name && errors.name}
            />
            <TextField
              required
              label="Restaurant Address"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              error={errors.address && touched.address}
              helperText={touched.address && errors.address}
            />
            <div className="create-form__fields--inline">
              <span className="flex-container--column">
                <InputLabel id="city-select-menu">City</InputLabel>
                <Select
                  required
                  labelId="city-select-menu"
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
              </span>
              <TextField
                className="create-form__zip-field"
                required
                id="zip"
                name="zip"
                label="Zip"
                autoComplete="off"
                onChange={handleChange}
                error={errors.zip && touched.zip}
                helperText={touched.zip && errors.zip}
              />
            </div>
          </div>
          <div className="form-buttons__container flex-container--space-between">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setCurrentForm('search')}
            >
              Previous
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              color="primary"
            >
              Next!
            </Button>
          </div>
        </form>
      )}
    </Formik>
  </>
);

CreateNewRestaurantForm.propTypes = {
  setCurrentForm: func,
  setSelectedRestaurant: func,
  selectedRestaurant: shape({
    name: string.isRequired,
    address: string.isRequired,
    city: string.isRequired,
    zip: string.isRequired,
  }).isRequired,
};

CreateNewRestaurantForm.defaultProps = {
  setCurrentForm: () => {},
  setSelectedRestaurant: () => {},
};

export default CreateNewRestaurantForm;
