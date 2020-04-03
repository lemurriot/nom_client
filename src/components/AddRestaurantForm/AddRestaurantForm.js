/* eslint-disable camelcase */
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './AddRestaurantForm.css';
import { uuid } from 'uuidv4';
import config from '../../config';
import WarningModal from '../WarningModal/WarningModal';
import NomsContext from '../../NomsContext';
// import ValidationError from '../Validation/Validation';
import CurrentNominatedRestaurants from './CurrentNominatedRestaurants';
import GoogleAutocompleteResults from './GoogleAutocompleteResults';
import CreateNewRestaurantForm from './CreateNewRestaurantForm';
import SubmitForm from './SubmitForm';

// eslint-disable-next-line react/prefer-stateless-function
const AddRestaurantForm = ({ history }) => {
  const {
    nominateNewRestaurant,
    user,
    nominatedRestaurants,
    uniqueCategories,
  } = useContext(NomsContext);
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
  const [redirectFunction, setRedirectFunction] = useState(() => {});
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

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
          // console.log(res);
          if (res.status === 'OK') setGoogleResults(res.predictions);
        });
    }
  };

  const handleSelectResult = (resultIndex) => {
    const googleRestaurantAlreadyNominated = nominatedRestaurants.filter(
      ({ food_category, googleid }) =>
        food_category === restaurantCategory.value &&
        googleid === googleResults[resultIndex].id
    );
    if (googleRestaurantAlreadyNominated.length) {
      setRestaurantName({
        value: '',
        touched: false,
      });
      setRedirectFunction(() => () =>
        history.push(
          `/category/${restaurantCategory.value}/${googleRestaurantAlreadyNominated[0].id}`
        )
      );
      return setShowWarningModal(true);
    }
    setSelectedRestaurant({
      name: googleResults[resultIndex].structured_formatting.main_text,
      subtitle: googleResults[resultIndex].structured_formatting.secondary_text,
      address: '',
      id: googleResults[resultIndex].id,
      apiReferred: true,
    });
    return setShowSubmitForm(true);
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
              {uniqueCategories.map((category) => (
                <option value={category}>{category}</option>
              ))}
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
      {showWarningModal && (
        <WarningModal
          showWarningModal={showWarningModal}
          setShowWarningModal={setShowWarningModal}
          category={restaurantCategory}
          proceedFunction={redirectFunction}
          headingText="This Restaurant is Already Nominated"
          buttonText="Go to Restaurant Page"
          subtext="A restaurant can only be nominated once per category"
        />
      )}
    </main>
  );
};

export default AddRestaurantForm;
