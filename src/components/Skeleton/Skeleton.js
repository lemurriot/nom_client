/* eslint-disable react/no-array-index-key */
import React from 'react';
import './Skeleton.css';

const Skeleton = () => {
  return (
    <div className="page">
      <div className="skeleton__fake-button" />
      <div className="flex-container--space-around">
        {Array(5)
          .fill(null)
          .map((_item, i) => (
            <div key={i} className="skeleton content-container category-card">
              <div className="skeleton__title" />
              {Array(5)
                .fill(null)
                .map((__item, j) => (
                  <div key={j} className="skeleton__subsection" />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Skeleton;
