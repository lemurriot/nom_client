import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import CategoryReviewPreview from '../CategoryReviewPreview/CategoryReviewPreview';
import './LandingPage.css';
import NomsContext from '../../NomsContext';

const LandingPage = () => {
  const { nominatedRestaurants, uniqueCategories } = useContext(NomsContext);
  const restaurantsFilteredByCategory = [...uniqueCategories].map((category) =>
    nominatedRestaurants.filter(
      (restaurant) => restaurant.food_category === category
    )
  );
  const reviewPreviewList = restaurantsFilteredByCategory.map(
    (categoryRestaurants, i) => (
      <CategoryReviewPreview
        key={[...uniqueCategories][i]}
        categoryRestaurants={categoryRestaurants}
        category={[...uniqueCategories][i]}
      />
    )
  );

  return (
    <>
      <main className="landing-page-main-container">
        <Button type="button" className="add-new-nom-btn btn">
          <Link to="/add-new-nom">Nominate a New Restaurant!</Link>
        </Button>
        {reviewPreviewList}
      </main>
    </>
  );
};

export default LandingPage;
