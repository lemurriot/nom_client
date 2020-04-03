import React, { useContext, useEffect, useState } from 'react';
import NomsContext from '../../NomsContext';
import NominatedRestaurantPreview from '../NominatedRestaurantPreview/NominatedRestaurantPreview';
import SelectMenu from '../SelectMenu/SelectMenu';
import { sortRestaurants } from '../../utils';
import { sortConstants } from '../../constants/sortConstants';
import { string, arrayOf, shape } from 'prop-types';

const CategoryPage = ({ match }) => {
  const { nominatedRestaurants, voteTallies } = useContext(NomsContext);
  const [sortRestaurantsBy, setSortRestaurantsBy] = useState('All Time');
  const category = match.params.food_category;

  const categoryRestaurants = nominatedRestaurants.filter(
    ({ food_category }) => food_category === category
  );

  const sortedCategoryRestaurants = sortRestaurants(
    categoryRestaurants,
    voteTallies,
    sortRestaurantsBy
  );

  useEffect(() => {
    sortRestaurants(categoryRestaurants, voteTallies, sortRestaurantsBy);
  }, [categoryRestaurants, voteTallies, sortRestaurantsBy]);

  const CategoryRestaurantList = sortedCategoryRestaurants.map((restaurant) => (
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
    <main style={{ padding: '2%' }}>
      <h3>Nominated for Best {category}</h3>
      <SelectMenu
        menuOptions={sortConstants}
        value={sortRestaurantsBy}
        setSortBy={setSortRestaurantsBy}
      />
      <div className="restaurant-review-preview-box">
        {CategoryRestaurantList}
      </div>
    </main>
  );
};

export default CategoryPage;
