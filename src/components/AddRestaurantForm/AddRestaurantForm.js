import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AddRestaurantForm.css';
import { uuid } from 'uuidv4';
import config from '../../config';
import NomsContext from '../../NomsContext';
// import ValidationError from '../Validation/Validation';
import CurrentNominatedRestaurants from './CurrentNominatedRestaurants';
import GoogleAutocompleteResults from './GoogleAutocompleteResults';
import CreateNewRestaurantForm from './CreateNewRestaurantForm';
import SubmitForm from './SubmitForm';

// eslint-disable-next-line react/prefer-stateless-function
const AddRestaurantForm = ({ history }) => {
  const [googleSessionId, setGoogleSessionId] = useState('');
  const [googleResults, setGoogleResults] = useState([]);
  const [restaurantName, setRestaurantName] = useState({
    value: '',
    touched: false,
  });
  const [restaurantCategory, setRestaurantCategory] = useState({
    value: '',
    touched: false,
  });
  const [selectedRestaurant, setSelectedRestaurant] = useState({
    name: '',
    subtitle: '',
    address: '',
    id: '',
    apiReferred: false,
  });
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <NomsContext.Consumer>
      {(context) => {
        const { nominateNewRestaurant, user, nominatedRestaurants } = context;

        const handleCategoryChange = (category) => {
          setRestaurantCategory({ value: category, touched: true });
        };

        const handleSearchInputChange = (searchString) => {
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
              .then((res) => res.json())
              .then((res) => {
                console.log(res);
                if (res.status === 'OK') setGoogleResults(res.predictions);
              });
          }
        };

        const handleSelectResult = (resultIndex) => {
          setSelectedRestaurant({
            name: googleResults[resultIndex].structured_formatting.main_text,
            subtitle:
              googleResults[resultIndex].structured_formatting.secondary_text,
            address: '',
            id: googleResults[resultIndex].id,
            apiReferred: true,
          });
          setShowSubmitForm(true);
        };

        const handleSelectCreateNew = () => setShowCreateForm(true);

        const handleSubmitForm = (comment) => {
          const newRestaurant = {
            restaurantName: selectedRestaurant.name,
            foodCategory: restaurantCategory.value,
            subtitle: selectedRestaurant.subtitle,
            address: selectedRestaurant.address,
            googleId: selectedRestaurant.id,
            nominatedByUser: user.id,
            comment,
          };
          nominateNewRestaurant(newRestaurant);
          history.push('/');
        };

        return (
          <main className="add-restaurant-form--page">
            <section className="add-restaurant-form--outer">
              <div className="brand">
                <span className="logo">★</span>
                <h1>NomsPDX</h1>
              </div>
              <form onSubmit={() => alert('submit')}>
                <div className="buttons">
                  <Link to="/">
                    <button type="button" className="cxl-btn">
                      Cancel
                    </button>
                  </Link>
                </div>
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
                    onChange={(e) => handleCategoryChange(e.target.value)}
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
                    Search Restaurants (required)
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
                    onChange={(e) => handleSearchInputChange(e.target.value)}
                    onFocus={() => setGoogleSessionId(uuid())}
                    disabled={!restaurantCategory.value}
                    required
                  />
                  {restaurantName.value.length > 2 && (
                    <GoogleAutocompleteResults
                      results={googleResults}
                      onSelectResult={handleSelectResult}
                      onSelectCreateNew={handleSelectCreateNew}
                    />
                  )}
                  {showSubmitForm && (
                    <SubmitForm
                      selectedRestaurant={selectedRestaurant}
                      setShowSubmitForm={setShowSubmitForm}
                      category={restaurantCategory.value}
                      onSubmitForm={handleSubmitForm}
                    />
                  )}
                  {showCreateForm && (
                    <CreateNewRestaurantForm
                      setSelectedRestaurant={setSelectedRestaurant}
                      setShowSubmitForm={setShowSubmitForm}
                      setShowCreateForm={setShowCreateForm}
                      category={restaurantCategory.value}
                    />
                  )}
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
