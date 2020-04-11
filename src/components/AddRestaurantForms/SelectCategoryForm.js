import React from 'react';
import { Button } from '@material-ui/core';
import SelectMenu from '../SelectMenu/SelectMenu';

const SelectCategoryForm = ({
  menuOptions,
  value,
  setSortBy,
  setCurrentForm,
}) => (
  <>
    <h3>First select a Category</h3>
    <SelectMenu
      menuOptions={menuOptions}
      value={value}
      setSortBy={setSortBy}
      showVerbose
      autoFocus
      helperText="Select Category (required)"
    />
    <div className="form-buttons">
      {/* <Button
        disabled
        variant="contained"
        color="primary"
      >
        Previous
      </Button> */}
      <Button
        disabled={!value}
        variant="contained"
        color="primary"
        onClick={() => setCurrentForm('search')}
      >
        Next
      </Button>
    </div>
  </>
);

export default SelectCategoryForm;
