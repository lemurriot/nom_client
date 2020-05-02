import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => (
  <div className="loading-spinner-container flex-container--centered">
    <div className="lds-ripple">
      <div />
      <div />
    </div>
  </div>
);

export default LoadingSpinner;
