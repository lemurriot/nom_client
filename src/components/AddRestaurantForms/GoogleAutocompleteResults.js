import React from 'react';
import PropTypes from 'prop-types';

const GoogleAutocompleteResults = ({
  results,
  onSelectResult,
  onSelectCreateNew,
}) => {
  const handleKeyDown = (event, type, i) => {
    if (event.key === 'Enter') {
      return type === 'SELECT' ? onSelectResult(i) : onSelectCreateNew();
    }
    return null;
  };

  const resultsList = results.map((result, i) => (
    <div
      className="result-list-item"
      role="option"
      tabIndex={0}
      key={result.id}
      onClick={() => onSelectResult(i)}
      onKeyDown={(e) => handleKeyDown(e, 'SELECT', i)}
    >
      <h5 className="result-list-name">
        {result.structured_formatting.main_text}
      </h5>
      <h6 className="result-list-subtitle">
        {result.structured_formatting.secondary_text}
      </h6>
    </div>
  ));
  return (
    <div className="results-container" role="listbox">
      {resultsList}
      <div
        className="result-list-item add-new-list-item"
        role="option"
        tabIndex={0}
        onClick={onSelectCreateNew}
        onKeyDown={(e) => handleKeyDown(e, 'CREATE')}
      >
        Add New
      </div>
    </div>
  );
};

GoogleAutocompleteResults.propTypes = {
  results: PropTypes.array,
  onSelectResult: PropTypes.func,
  onSelectCreateNew: PropTypes.func,
};

GoogleAutocompleteResults.defaultProps = {
  results: [],
  onSelectResult: () => {},
  onSelectCreateNew: () => {},
};

export default GoogleAutocompleteResults;
