import React from 'react';
import './CategoryReviewPreview.css';
import PropTypes from 'prop-types';
import restaurantType from '../../types';
import NomsContext from '../../NomsContext';
import NominatedRestaurantPreview from '../NominatedRestaurantPreview/NominatedRestaurantPreview';

const { string, arrayOf, shape } = PropTypes;

const CategoryReviewPreview = props => (
  <NomsContext.Consumer>
    {context => {
      const { categoryRestaurants, category } = props;
      const { voteTallies } = context;
      const CategoryRestaurantList = categoryRestaurants.map(restaurant => (
        <NominatedRestaurantPreview
          key={restaurant.id}
          id={restaurant.id}
          voteCount={voteTallies[restaurant.id]}
          category={restaurant.food_category}
          name={restaurant.name}
          loggedIn
          // likesAndComments={context}
        />
      ));
      return (
        <section className="category-card">
          <h3>{category}</h3>
          <div className="restaurant-review-preview-box">
            {CategoryRestaurantList}
          </div>
        </section>
      );
    }}
  </NomsContext.Consumer>
);

CategoryReviewPreview.propTypes = {
  category: string.isRequired,
  categoryRestaurants: arrayOf(shape(restaurantType)).isRequired,
};

export default CategoryReviewPreview;
