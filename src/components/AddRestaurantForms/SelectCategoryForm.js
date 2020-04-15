import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { string, func } from 'prop-types';
import NomsContext from '../../NomsContext';
import SelectMenu from '../SelectMenu/SelectMenu';

const SelectCategoryForm = ({ value, setSortBy, setCurrentForm }) => {
  const { uniqueCategories } = useContext(NomsContext);
  return (
    <>
      {/* <h3>First select a Category</h3> */}
      <SelectMenu
        required
        menuOptions={uniqueCategories}
        value={value}
        setSortBy={setSortBy}
        showVerbose
        autoFocus
        helperText="Select Category (required)"
      />
      <div className="form-buttons__container category-select__next-btn-container">
        <Button
          disabled={!value}
          variant="contained"
          color="primary"
          onClick={() => setCurrentForm('search')}
        >
          Next!
        </Button>
      </div>
    </>
  );
};

SelectCategoryForm.propTypes = {
  value: string.isRequired,
  setSortBy: func.isRequired,
  setCurrentForm: func.isRequired,
};

export default SelectCategoryForm;
