import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AddRestaurantForm.css';
import { uuid } from 'uuidv4';
import config from '../../config';
import NomsContext from '../../NomsContext';
// import ValidationError from '../Validation/Validation';
import CurrentNominatedRestaurants from './CurrentNominatedRestaurants';
import GoogleAutocompleteResults from './GoogleAutocompleteResults';

// eslint-disable-next-line react/prefer-stateless-function
const AddRestaurantForm = () => {
  const [googleSessionId, setGoogleSessionId] = useState('');
  const [restaurantName, setRestaurantName] = useState({
    value: '',
    touched: false,
  });
  const [restaurantCategory, setRestaurantCategory] = useState({
    value: '',
    touched: false,
  });
  const [googleResults, setGoogleResults] = useState([]);
  return (
    <NomsContext.Consumer>
      {context => {
        const { nominateNewRestaurant, user, nominatedRestaurants } = context;

        const handleCategoryChange = category => {
          setRestaurantCategory({ value: category, touched: true });
        };

        const handleSearchInputChange = searchString => {
          setRestaurantName({
            value: searchString,
            touched: true,
          });
          if (searchString.length > 2) {
            fetch(`${config.API_ENDPOINT}/search/${searchString}`, {
              method: 'PUT',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                sessionToken: googleSessionId,
              }),
            })
              .then(res => res.json())
              .then(res => {
                console.log(res);
                if (res.status === 'OK') setGoogleResults(res.predictions);
              });
          }
        };

        const submitNewRestaurant = () => {
          const newRestaurant = {
            restaurantName: 'PDX Pizza',
            foodCategory: 'Pizza',
            subtitle: 'SE Belmont',
            address: '2323 SE Belmont',
            nominatedByUser: user.id,
            comment: 'Classic NY style, no frills, just great pizza',
          };
          nominateNewRestaurant(newRestaurant);
        };
        return (
          <main className="add-restaurant-form--page">
            <section className="add-restaurant-form--outer">
              <div className="brand">
                <span className="logo">★</span>
                <h1>NomsPDX</h1>
              </div>
              <form onSubmit={() => alert('submit')}>
                <div className="container">
                  <h2>Nominate a Restaurant for Best in Category!</h2>
                  <label htmlFor="food-category">Category (required)</label>
                  <select
                    name="food-category"
                    id="food-category"
                    value={restaurantCategory.value}
                    aria-label="food category"
                    aria-required="true"
                    aria-describedby="categoryError"
                    onChange={e => handleCategoryChange(e.target.value)}
                    required
                  >
                    <option disabled value="">
                      -- select an option --
                    </option>
                    <option value="Burger">Burger</option>
                    <option value="Burrito">Burrito</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Falafel">Falafel</option>
                  </select>
                  <label htmlFor="restaurant-name">
                    Restaurant Name (required)
                  </label>
                  <input
                    type="text"
                    name="restaurant-name"
                    id="restaurant-name"
                    value={restaurantName.value}
                    autoComplete="Off"
                    aria-label="restaurant name"
                    aria-required="true"
                    aria-describedby="restaurantError"
                    onChange={e => handleSearchInputChange(e.target.value)}
                    onFocus={() => setGoogleSessionId(uuid())}
                    disabled={!restaurantCategory.value}
                    required
                  />
                  {/* {restaurantName.touched && (
                    <ValidationError
                      message={this.validateRestaurantName()}
                      validationId={'restaurantError'}
                    />
                  )} */}
                  <GoogleAutocompleteResults results={googleResults} />
                  {/* <label htmlFor="comment">Comment (optional)</label>
                  <textarea
                    name="item-comment"
                    id="item-comment"
                    placeholder="Comment on this food item or experience"
                    value={'meep meep'}
                    aria-label="comment on this entry"
                    aria-required="true"
                    aria-describedby="commentError"
                    onChange={e => this.handleCommentInputChange(e)}
                  /> */}
                </div>
                <div className="buttons">
                  <Link to="/">
                    <button type="button" className="cxl-btn">
                      Cancel
                    </button>
                  </Link>
                  <button type="submit" className="submit-btn" disabled={false}>
                    Submit
                  </button>
                </div>
              </form>
            </section>
            <section className="filtered-list--container">
              <h3>Current Matching Nominations</h3>
              <p>Please do not add duplicates</p>
              <CurrentNominatedRestaurants
                nominatedRestaurants={nominatedRestaurants}
                searchString={restaurantName.value}
                category={restaurantCategory.value}
              />
            </section>
          </main>
        );
      }}
    </NomsContext.Consumer>
  );
};

export default AddRestaurantForm;
