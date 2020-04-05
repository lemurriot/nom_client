import React from 'react';
import {
  InputLabel,
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

const SelectMenu = ({
  value,
  menuOptions,
  setSortBy,
  helperText,
  showVerbose = false,
}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      {showVerbose && <InputLabel id="select-menu">Category</InputLabel>}
      <Select
        labelId="select-menu"
        value={value}
        onChange={handleChange}
        displayEmpty={false}
        renderValue={() => value}
        className={classes.selectEmpty}
      >
        {showVerbose && (
          <MenuItem value="" disabled>
            {' '}
            -- Select an Option --
          </MenuItem>
        )}
        {menuOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

SelectMenu.propTypes = {
  value: string,
  menuOptions: arrayOf(string),
  setSortBy: func,
  helperText: string,
};

SelectMenu.defaultProps = {
  value: '',
  menuOptions: [''],
  setSortBy: () => {},
  helperText: '',
};

export default SelectMenu;
