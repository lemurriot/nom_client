import React from 'react';
import './CategoryReviewPreview.css';
import NomsContext from '../../NomsContext';
import NominatedRestaurantPreview from '../NominatedRestaurantPreview/NominatedRestaurantPreview';

const CategoryReviewPreview = props => (
  <NomsContext.Consumer>
    {context => {
      const { categoryRestaurants } = props;
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
          <h3>{props.category}</h3>
          <div className="restaurant-review-preview-box">
            {CategoryRestaurantList}
          </div>
        </section>
      );
    }}
  </NomsContext.Consumer>
);

export default CategoryReviewPreview;
