/* eslint-disable camelcase */
import React from 'react';
// import { string, arrOf, shape } from 'prop-types';
import RestaurantPreview from '../RestaurantPreview/RestaurantPreview';

// TO DO: add existant recommendations to ui
const CurrentNominatedRestaurants = ({
  nominatedRestaurants,
  category,
  searchString,
}) => {
  const re = new RegExp(searchString, 'i');
  let currentRestaurantFilter = [];
  if (searchString.length > 2) {
    currentRestaurantFilter = nominatedRestaurants.filter(
      ({ food_category, name }) => food_category === category && name.match(re)
    );
  }

  if (!currentRestaurantFilter.length) {
    return <span>No Matches</span>;
  }

  return currentRestaurantFilter.map((restaurant) => {
    const {
      id,
      name,
      address,
      subtitle,
      food_category,
      vote_count,
    } = restaurant;
    return (
      <RestaurantPreview
        category={food_category}
        name={name}
        subtitle={address || subtitle}
        id={id}
        voteCount={vote_count}
      />
    );
  });
};

export default CurrentNominatedRestaurants;
