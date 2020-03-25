import React from 'react';
import PropTypes from 'prop-types';

const GoogleAutocompleteResults = ({ results }) => {
  const resultsList = results.map(result => (
    <div
      className="result-list-item"
      key={result.id}
      style={{ borderBottom: '1px solid black' }}
    >
      <h5 className="result-list-name">
        {result.structured_formatting.main_text}
      </h5>
      <h6 className="result-list-subtitle">
        {result.structured_formatting.secondary_text}
      </h6>
    </div>
  ));
  return <div className="results-container">{resultsList}</div>;
};

GoogleAutocompleteResults.propTypes = {
  results: PropTypes.array,
};

GoogleAutocompleteResults.defaultProps = {
  results: [],
};

export default GoogleAutocompleteResults;
