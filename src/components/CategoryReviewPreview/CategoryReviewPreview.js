import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SelectMenu from '../SelectMenu/SelectMenu';
import { sortRestaurants } from '../../utils';
import { sortConstants } from '../../constants/sortConstants';
import restaurantType from '../../types';
import NomsContext from '../../NomsContext';
import NominatedRestaurantPreview from '../NominatedRestaurantPreview/NominatedRestaurantPreview';
import './CategoryReviewPreview.css';

const { string, arrayOf, shape } = PropTypes;

const CategoryReviewPreview = ({ categoryRestaurants, category }) => {
  const { voteTallies } = useContext(NomsContext);
  const [sortRestaurantsBy, setSortRestaurantsBy] = useState('All Time');
  const sortedCategoryRestaurants = sortRestaurants(
    categoryRestaurants,
    voteTallies,
    sortRestaurantsBy
  );

  useEffect(() => {
    sortRestaurants(categoryRestaurants, voteTallies, sortRestaurantsBy);
  }, [categoryRestaurants, voteTallies, sortRestaurantsBy]);

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
      <SelectMenu
        menuOptions={sortConstants}
        value={sortRestaurantsBy}
        setSortBy={setSortRestaurantsBy}
        helperText="Sort By"
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
