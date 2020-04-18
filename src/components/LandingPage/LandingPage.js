import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import CategoryPreview from '../CategoryPreview/CategoryPreview';
import './LandingPage.css';
import NomsContext from '../../NomsContext';

const LandingPage = () => {
  const { nominatedRestaurants, uniqueCategories } = useContext(NomsContext);
  const restaurantsFilteredByCategory = [...uniqueCategories].map((category) =>
    nominatedRestaurants.filter(
      (restaurant) => restaurant.food_category === category
    )
  );
  const categoryPreviewList = restaurantsFilteredByCategory.map(
    (categoryRestaurants, i) => (
      <CategoryPreview
        key={[...uniqueCategories][i]}
        categoryRestaurants={categoryRestaurants}
        category={[...uniqueCategories][i]}
      />
    )
  );

  return (
    <main className="page">
      <Button variant="contained" color="primary" size="medium">
        <Link
          to="/add-new-nom"
          style={{ textDecoration: 'none', height: '100%', color: 'white' }}
        >
          Nominate a New Restaurant!
        </Link>
      </Button>
      <section className="flex-container--space-around">
        {categoryPreviewList}
      </section>
    </main>
  );
};

export default LandingPage;
