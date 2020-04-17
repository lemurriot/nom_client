import React from 'react';
import { Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { arrayOf, shape, func, number } from 'prop-types';
import { googleSearchResultsShape } from '../../types';

const GoogleAutocompleteResults = ({
  results,
  setShowFloatingResults,
  clearTextField,
  position: { top, width },
  onSelectResult,
  setCurrentForm,
}) => {
  let focusedLi = 0;
  const handleKeyDown = (event, type, i) => {
    if (event.key === 'Enter') {
      return type === 'SELECT' ? onSelectResult(i) : setCurrentForm('create');
    }
    if (event.key === 'Tab') {
      focusedLi += 1;
    }
    return null;
  };
  const handleClickAway = () => {
    setShowFloatingResults(false);
    clearTextField();
  };

  const resultsList = results.map((result, i) => (
    <li
      className="result-list-item--api flex-container--column"
      role="option"
      aria-selected={i === focusedLi}
      tabIndex={0}
      key={result.id}
      onClick={() => onSelectResult(i)}
      onKeyDown={(e) => handleKeyDown(e, 'SELECT', i)}
    >
      <span className="result-list__name">
        {result.structured_formatting.main_text}
      </span>
      <span className="result-list__subtitle">
        {result.structured_formatting.secondary_text}
      </span>
    </li>
  ));
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <ul
        className="results-container ul-reset roboto"
        id="google-results-flyout"
        role="listbox"
        style={{ top, width }}
      >
        {resultsList}
        <li
          className="result__list-item add-new__list-item"
          role="option"
          aria-selected={focusedLi === resultsList.length}
          tabIndex={0}
          onClick={() => setCurrentForm('create')}
          onKeyDown={(e) => handleKeyDown(e, 'CREATE')}
        >
          <Button size="small" variant="contained" color="primary">
            Add New
            {'  '}
            <FontAwesomeIcon icon="plus" color="white" size="xs" />
          </Button>
        </li>
      </ul>
    </ClickAwayListener>
  );
};

GoogleAutocompleteResults.propTypes = {
  results: arrayOf(shape(googleSearchResultsShape)),
  position: shape({
    top: number,
    width: number,
  }),
  setShowFloatingResults: func,
  clearTextField: func,
  onSelectResult: func,
  setCurrentForm: func,
};

GoogleAutocompleteResults.defaultProps = {
  results: [],
  position: {
    top: 0,
    width: 0,
  },
  setShowFloatingResults: () => {},
  clearTextField: () => {},
  onSelectResult: () => {},
  setCurrentForm: () => {},
};

export default GoogleAutocompleteResults;
