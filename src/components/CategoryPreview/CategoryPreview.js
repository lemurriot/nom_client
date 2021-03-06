import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SelectMenu from '../SelectMenu/SelectMenu';
import { sortRestaurants } from '../../utils';
import { sortConstants } from '../../constants/sortConstants';
import { restaurantType } from '../../types';
import NomsContext from '../../NomsContext';
import RestaurantPreview from '../RestaurantPreview/RestaurantPreview';
import './CategoryPreview.css';

const { string, arrayOf, shape } = PropTypes;

const CategoryPreview = ({ categoryRestaurants, category }) => {
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
      <RestaurantPreview
        key={restaurant.id}
        id={restaurant.id}
        voteCount={voteTallies[restaurant.id]}
        category={restaurant.food_category}
        name={restaurant.name}
        subtitle={restaurant.subtitle}
      />
    ));
  return (
    <section className="content-container category-card">
      <div className="category-card__title flex-container--space-between">
        <h3 className="montserrat center">{`Top 5 ${category} Noms`}</h3>
        <div style={{ textAlign: 'right' }}>
          <div className="category-card__title--right">
            <div className="category-card__list-count">
              {`Showing ${Math.min(sortedCategoryRestaurants.length, 5)} of ${
                sortedCategoryRestaurants.length
              }`}
            </div>
          </div>
          <Link to={`/category/${category}`}>
            <span
              style={{
                fontFamily: 'Arial',
                letterSpacing: '.8px',
              }}
            >
              See All
            </span>
          </Link>
        </div>
      </div>
      <SelectMenu
        menuOptions={sortConstants}
        value={sortRestaurantsBy}
        setSortBy={setSortRestaurantsBy}
        helperText="Sort By"
      />
      <div className="restaurant-review-preview-box">
        <div className="restaurant-list__header flex-container--space-between">
          <span className="restaurant-list__header--left">Restaurant</span>
          <span className="restaurant-list__header--middle">Vote Count</span>
          <span className="restaurant-list__header--right">Vote Button</span>
        </div>
        {CategoryRestaurantList}
      </div>
    </section>
  );
};

CategoryPreview.propTypes = {
  category: string.isRequired,
  categoryRestaurants: arrayOf(shape(restaurantType)).isRequired,
};

export default CategoryPreview;
