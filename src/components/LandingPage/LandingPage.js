import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CategoryReviewPreview from '../CategoryReviewPreview/CategoryReviewPreview';
import './LandingPage.css';
import NomsContext from '../../NomsContext';

const LandingPage = props => (
  <NomsContext.Consumer>
    {context => {
      const { nominatedRestaurants } = context;
      const categoryList = nominatedRestaurants.map(
        restaurant => restaurant.food_category
      );
      const uniqueCategories = new Set(categoryList);
      const restaurantsFilteredByCategory = [
        ...uniqueCategories,
      ].map(category =>
        nominatedRestaurants.filter(
          restaurant => restaurant.food_category === category
        )
      );
      const reviewPreviewList = restaurantsFilteredByCategory.map(
        (categoryRestaurants, i) => (
          <CategoryReviewPreview
            key={[...uniqueCategories][i]}
            // likesAndComments={context.likesAndComments}
            categoryRestaurants={categoryRestaurants}
            category={[...uniqueCategories][i]}
            // loggedIn={props.loggedIn}
          />
        )
      );

      return (
        <>
          <Header {...props} loggedIn onLogout={context.onLogout} />
          <main className="landing-page-main-container">
            <Link to="/add-new-nom">
              <button type="button" className="add-new-nom-btn btn">
                Nominate a New Restaurant!
              </button>
            </Link>
            {reviewPreviewList}
          </main>
          <Footer />
        </>
      );
    }}
  </NomsContext.Consumer>
);

export default LandingPage;
