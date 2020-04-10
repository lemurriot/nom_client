/* eslint-disable camelcase */
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import './AddRestaurantForm.css';
import { uuid } from 'uuidv4';
import config from '../../config';
import SelectMenu from '../SelectMenu/SelectMenu';
import WarningModal from '../WarningModal/WarningModal';
import NomsContext from '../../NomsContext';
// import ValidationError from '../Validation/Validation';
import CurrentNominatedRestaurants from './CurrentNominatedRestaurants';
import GoogleAutocompleteResults from './GoogleAutocompleteResults';
import CreateNewRestaurantForm from './CreateNewRestaurantForm';
import SubmitForm from './SubmitForm';

// eslint-disable-next-line react/prefer-stateless-function
const AddRestaurantForm = () => {
  const {
    nominateNewRestaurant,
    user,
    nominatedRestaurants,
    uniqueCategories,
  } = useContext(NomsContext);
  const history = useHistory();
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
  const [redirectAction, setRedirectAction] = useState(() => {});
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
      setRedirectAction(() => () =>
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
        <>
          <div className="buttons">
            <Button
              onClick={history.goBack}
              variant="contained"
              className="go-back-btn"
            >
              Go Back
            </Button>
          </div>
          <div className="container">
            <h2>Nominate a Restaurant for Best in Category!</h2>
            <SelectMenu
              menuOptions={uniqueCategories}
              value={restaurantCategory.value}
              setSortBy={handleCategoryChange}
              showVerbose
              helperText="Select Category (required)"
            />
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
        </>
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
          proceedAction={redirectAction}
          headingText="This Restaurant is Already Nominated"
          buttonText="Go to Restaurant Page"
          subtext="A restaurant can only be nominated once per category"
        />
      )}
    </main>
  );
};

export default AddRestaurantForm;
