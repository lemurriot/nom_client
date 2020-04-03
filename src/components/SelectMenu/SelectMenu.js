import React from 'react';
import {
  makeStyles,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
} from '@material-ui/core';
import { func, arrayOf, string } from 'prop-types';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

const SelectMenu = ({ value, menuOptions, setSortBy }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <Select
        value={value}
        onChange={handleChange}
        displayEmpty={false}
        renderValue={() => value}
        className={classes.selectEmpty}
      >
        {menuOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Sort By</FormHelperText>
    </FormControl>
  );
};

SelectMenu.propTypes = {
  value: string,
  menuOptions: arrayOf(string),
  setSortBy: func,
};

SelectMenu.defaultProps = {
  value: '',
  menuOptions: [''],
  setSortBy: () => {},
};

export default SelectMenu;
