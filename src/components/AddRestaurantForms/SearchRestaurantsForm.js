import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { uuid } from 'uuidv4';
import config from '../../config';
import NomsContext from '../../NomsContext';
import { string, func, arr } from 'prop-types';
// import CurrentNominatedRestaurants from './CurrentNominatedRestaurants';
import GoogleAutocompleteResults from './GoogleAutocompleteResults';

const SearchRestaurantsForm = ({
  setCurrentForm,
  restaurantName,
  setRestaurantName,
  category,
  // handleSelectCreateNew,
  setRedirectAction,
  setSelectedRestaurant,
  setShowWarningModal,
}) => {
  const { nominatedRestaurants } = useContext(NomsContext);
  const [googleSessionId, setGoogleSessionId] = useState('');
  const [googleResults, setGoogleResults] = useState([]);
  const history = useHistory();

  const handleSearchInputChange = (searchString) => {
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
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Google search results could not be fetched');
        })
        .then((res) => {
          if (res.status === 'OK') {
            return setGoogleResults(res.predictions);
          }
          throw new Error('Google search results could not be fetched');
        })
        .catch((err) => console.error(err.message));
    }
  };

  const setNewSearchString = (e) => {
    setRestaurantName({
      value: e.target.value,
      touched: true,
    });
    handleSearchInputChange(e.target.value);
  };

  const handleSelectResult = (resultIndex) => {
    const googleRestaurantAlreadyNominated = nominatedRestaurants.filter(
      ({ food_category, googleid }) =>
        food_category === category && googleid === googleResults[resultIndex].id
    );
    if (googleRestaurantAlreadyNominated.length) {
      setRestaurantName({
        value: '',
        touched: false,
      });
      setRedirectAction(() => () =>
        history.push(
          `/category/${category}/${googleRestaurantAlreadyNominated[0].id}`
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
    return setCurrentForm('submit');
  };

  return (
    <>
      <h3>Search For Restaurant</h3>
      <div className="search-form flex-container--space-around">
        <div className="search-form--left">
          <TextField
            value={restaurantName.value}
            id="filled-basic"
            label="Enter Restaurant Name"
            variant="filled"
            onChange={setNewSearchString}
            onFocus={() => setGoogleSessionId(uuid())}
            autoFocus
            autoComplete="off"
          />
          {restaurantName.value.length > 2 && (
            <GoogleAutocompleteResults
              results={googleResults}
              onSelectResult={handleSelectResult}
              onSelectCreateNew={() => setCurrentForm('create')}
            />
          )}
        </div>
        {/* <div className="search-form--right" style={{ width: "50%" }}>
          <h4>Already Nominated Restaurants</h4>
          <h5>...avoid nominating the same restaurant twice for the same category</h5>
          <div className="current-restaurants-container">
            <CurrentNominatedRestaurants
              nominatedRestaurants={nominatedRestaurants}
              searchString={restaurantName.value}
              category={category}
            />
          </div>
        </div> */}
      </div>
      <div className="form-buttons">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCurrentForm('category')}
        >
          Previous
        </Button>
        {/* <Button
          disabled
          variant="contained"
          color="primary"
          onClick={() => setCurrentForm('search')}
        >
          Next
        </Button> */}
      </div>
    </>
  );
};

export default SearchRestaurantsForm;
