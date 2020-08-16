import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import isEmpty from 'lodash.isempty';
import GoogleButton from 'react-google-button';
import config from '../../config';
import CategoryPreview from '../CategoryPreview/CategoryPreview';
import './LandingPage.css';
import NomsContext from '../../NomsContext';

const LandingPage = () => {
  const { nominatedRestaurants, uniqueCategories, user } = useContext(
    NomsContext
  );
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
      {!isEmpty(user) && (
        <Button variant="contained" color="primary" size="medium">
          <Link
            to="/add-new-nom"
            style={{ textDecoration: 'none', height: '100%', color: 'white' }}
          >
            Nominate a New Restaurant!
          </Link>
        </Button>
      )}
      {!!isEmpty(user) && (
        <a
          style={{ textDecoration: 'none' }}
          href={`${config.API_ENDPOINT}/auth/google-oauth`}
          className="login-btn google-oauth-btn"
        >
          <GoogleButton />
        </a>
      )}
      <section className="flex-container--space-around">
        {categoryPreviewList}
      </section>
      <section className="pre-footer center flex-container--space-around">
        <ul className="ul-reset roboto">
          <li>
            <Link to="/privacypolicy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/termsandconditions">Terms &amp; Conditions</Link>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default LandingPage;
