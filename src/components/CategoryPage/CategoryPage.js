import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import NomsContext from '../../NomsContext';
import NominatedRestaurantPreview from '../NominatedRestaurantPreview/NominatedRestaurantPreview';
import SelectMenu from '../SelectMenu/SelectMenu';
import { sortRestaurants } from '../../utils';
import { sortConstants } from '../../constants/sortConstants';

const CategoryPage = () => {
  const { food_category: category } = useParams();
  const { goBack } = useHistory();
  const { nominatedRestaurants, voteTallies } = useContext(NomsContext);
  const [sortRestaurantsBy, setSortRestaurantsBy] = useState('All Time');

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
    />
  ));
  return (
    <main className="page">
      <Button onClick={goBack}>Go back</Button>
      <h3>Nominated for Best {category}</h3>
      <SelectMenu
        menuOptions={sortConstants}
        value={sortRestaurantsBy}
        setSortBy={setSortRestaurantsBy}
        helperText="Sort By"
      />
      <div className="restaurant-review-preview-box">
        {CategoryRestaurantList}
      </div>
    </main>
  );
};

export default CategoryPage;
