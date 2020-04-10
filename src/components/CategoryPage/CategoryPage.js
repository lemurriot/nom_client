import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, InputBase } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStyles } from '../../hooks/useStyles';
import NomsContext from '../../NomsContext';
import RestaurantPreview from '../RestaurantPreview/RestaurantPreview';
import SelectMenu from '../SelectMenu/SelectMenu';
import { sortRestaurants } from '../../utils';
import { sortConstants } from '../../constants/sortConstants';

const CategoryPage = () => {
  const { food_category: category } = useParams();
  const classes = useStyles();
  const { goBack } = useHistory();
  const { nominatedRestaurants, voteTallies } = useContext(NomsContext);
  const [sortRestaurantsBy, setSortRestaurantsBy] = useState('All Time');
  const [searchString, setSearchString] = useState('');
  const re = new RegExp(searchString, 'i');

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

  let currentRestaurantSearchFilter;
  if (!searchString) {
    currentRestaurantSearchFilter = sortedCategoryRestaurants;
  } else {
    currentRestaurantSearchFilter = sortedCategoryRestaurants.filter(
      (restaurant) => restaurant.name.match(re)
    );
  }

  const CategoryRestaurantList = currentRestaurantSearchFilter.map(
    (restaurant) => (
      <RestaurantPreview
        key={restaurant.id}
        id={restaurant.id}
        voteCount={voteTallies[restaurant.id]}
        category={restaurant.food_category}
        name={restaurant.name}
        subtitle={restaurant.subtitle}
      />
    )
  );
  return (
    <main className="page">
      <Button onClick={goBack} variant="contained" className="go-back-btn">
        Go back
      </Button>
      <section className="content-container">
        <h3>Nominated for Best {category}</h3>
        <SelectMenu
          menuOptions={sortConstants}
          value={sortRestaurantsBy}
          setSortBy={setSortRestaurantsBy}
          helperText="Sort By"
        />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <FontAwesomeIcon icon="search" color="grey" />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </div>
        <div className="restaurant-review-preview-box">
          {CategoryRestaurantList}
        </div>
      </section>
    </main>
  );
};

export default CategoryPage;
