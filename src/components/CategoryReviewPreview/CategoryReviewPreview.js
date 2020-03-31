import React, { useState, useEffect, useContext } from 'react';
import '../../../node_modules/gestalt/dist/gestalt.css';
import { SelectList } from 'gestalt';
import './CategoryReviewPreview.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { sortRestaurants } from '../../utils';
import restaurantType from '../../types';
import NomsContext from '../../NomsContext';
import NominatedRestaurantPreview from '../NominatedRestaurantPreview/NominatedRestaurantPreview';

const { string, arrayOf, shape } = PropTypes;

const CategoryReviewPreview = ({ categoryRestaurants, category }) => {
  const { voteTallies } = useContext(NomsContext);
  const [sortRestaurantsBy, setSortRestaurantsBy] = useState('ALL_TIME');
  const sortedCategoryRestaurants = sortRestaurants(
    categoryRestaurants,
    voteTallies,
    sortRestaurantsBy
  );

  useEffect(() => {
    sortRestaurants(categoryRestaurants, voteTallies, sortRestaurantsBy);
  }, [categoryRestaurants, voteTallies, sortRestaurantsBy]);

  const sortConstants = [
    { value: 'ALL_TIME', label: 'All Time' },
    { value: 'MOST_RECENT', label: 'Most Recent' },
    { value: 'LAST_MONTH', label: 'Last Month' },
    { value: 'ALPHABETICAL', label: 'Alphabetical' },
  ];

  const CategoryRestaurantList = sortedCategoryRestaurants
    .slice(0, 5)
    .map((restaurant) => (
      <NominatedRestaurantPreview
        key={restaurant.id}
        id={restaurant.id}
        voteCount={voteTallies[restaurant.id]}
        category={restaurant.food_category}
        name={restaurant.name}
        loggedIn
      />
    ));
  return (
    <section className="category-card">
      <h3>{category} - Top 5</h3>
      <Link to={`/category/${category}`}>See All</Link>
      <SelectList
        id="sort-options"
        name="sort-options"
        onChange={({ value }) => setSortRestaurantsBy(value)}
        options={sortConstants}
        placeholder="Select Sort Method"
        label="Sort Restaurants"
        // helperText="Sort Restaurants"
        value={sortRestaurantsBy}
      />
      <div className="restaurant-review-preview-box">
        {CategoryRestaurantList}
      </div>
    </section>
  );
};

CategoryReviewPreview.propTypes = {
  category: string.isRequired,
  categoryRestaurants: arrayOf(shape(restaurantType)).isRequired,
};

export default CategoryReviewPreview;
