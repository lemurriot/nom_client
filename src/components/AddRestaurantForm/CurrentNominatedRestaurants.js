import React from 'react';
import { Link } from 'react-router-dom';

const CurrentNominatedRestaurants = ({
  nominatedRestaurants,
  category,
  searchString,
}) => {
  const re = new RegExp(searchString, 'i');
  let currentRestaurantFilter;
  if (!category) {
    currentRestaurantFilter = nominatedRestaurants;
  } else if (category && !searchString) {
    currentRestaurantFilter = nominatedRestaurants.filter(
      restaurant => restaurant.food_category === category
    );
  } else {
    currentRestaurantFilter = nominatedRestaurants.filter(
      restaurant =>
        restaurant.food_category === category && restaurant.name.match(re)
    );
  }

  if (!currentRestaurantFilter.length) {
    return <span>No Matches</span>;
  }

  return currentRestaurantFilter.map(restaurant => {
    const {
      id,
      name,
      address,
      subtitle,
      food_category,
      date_nominated,
    } = restaurant;
    return (
      <div className="current-filtered-list" key={id}>
        <Link to={`/category/${food_category}/${id}`}>
          <span className="current-filtered-list--name">{name}</span>
        </Link>
        <span className="current-filtered-list--subtitle">
          {address.length ? address : subtitle}
        </span>
        <span className="current-filtered-list--category">
          Nominated for Best {food_category} on{' '}
          {new Date(date_nominated).toDateString()}
        </span>
      </div>
    );
  });
};

export default CurrentNominatedRestaurants;
