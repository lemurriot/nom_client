/* eslint-disable camelcase */
import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useLayoutEffect,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { uuid } from 'uuidv4';
import { string, func } from 'prop-types';
import config from '../../config';
import NomsContext from '../../NomsContext';
// import CurrentNominatedRestaurants from './CurrentNominatedRestaurants';
import GoogleAutocompleteResults from './GoogleAutocompleteResults';

const SearchRestaurantsForm = ({
  setCurrentForm,
  restaurantName,
  setRestaurantName,
  category,
  setRedirectAction,
  setSelectedRestaurant,
  setShowWarningModal,
}) => {
  const { nominatedRestaurants } = useContext(NomsContext);
  const [googleSessionId, setGoogleSessionId] = useState('');
  const [googleResults, setGoogleResults] = useState([]);
  const [showFloatingResults, setShowFloatingResults] = useState(false);
  const [searchResultPosition, setSearchResultPosition] = useState({
    top: 0,
    width: 0,
  });
  const searchInputRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (searchInputRef.current) {
      setSearchResultPosition({
        top: searchInputRef.current.getBoundingClientRect().bottom,
        width: searchInputRef.current.getBoundingClientRect().width,
      });
    }
  }, [searchInputRef]);

  useLayoutEffect(() => {
    function updatePosition() {
      setSearchResultPosition({
        top: searchInputRef.current.getBoundingClientRect().bottom,
        width: searchInputRef.current.getBoundingClientRect().width,
      });
    }
    window.addEventListener('resize', updatePosition);
    updatePosition();
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const toggleFloatingSearchResults = () => {
    setShowFloatingResults((showRes) => !showRes);
  };

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
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err.message));
    }
  };

  const setNewSearchString = (e) => {
    setRestaurantName(e.target.value);
    handleSearchInputChange(e.target.value);
  };
  const clearTextField = () => {
    setRestaurantName('');
  };

  const handleOnFocus = () => {
    setGoogleSessionId(uuid());
    toggleFloatingSearchResults();
  };

  const handleSelectResult = (resultIndex) => {
    setRestaurantName('');
    const googleRestaurantAlreadyNominated = nominatedRestaurants.filter(
      ({ food_category, googleid }) =>
        food_category === category && googleid === googleResults[resultIndex].id
    );
    if (googleRestaurantAlreadyNominated.length) {
      // setRestaurantName('');
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
      <div className="search-form">
        {/* height is fixed at 57 for consistency of anchored results flyout */}
        <div ref={searchInputRef} style={{ height: 57 }}>
          <TextField
            value={restaurantName}
            fullWidth
            label="Search Restaurants by Name"
            variant="filled"
            onChange={setNewSearchString}
            onFocus={handleOnFocus}
            autoFocus
            autoComplete="off"
          />
        </div>
        {showFloatingResults && restaurantName.length > 2 && (
          <GoogleAutocompleteResults
            position={searchResultPosition}
            showFloatingResults={showFloatingResults}
            setShowFloatingResults={setShowFloatingResults}
            toggleFloatingSearchResults={toggleFloatingSearchResults}
            results={googleResults}
            clearTextField={clearTextField}
            onSelectResult={handleSelectResult}
            setCurrentForm={setCurrentForm}
          />
        )}
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
          variant="outlined"
          color="primary"
          onClick={() => setCurrentForm('category')}
        >
          Previous
        </Button>
      </div>
    </>
  );
};

SearchRestaurantsForm.propTypes = {
  setCurrentForm: func,
  restaurantName: string,
  setRestaurantName: func,
  category: string,
  setRedirectAction: func,
  setSelectedRestaurant: func,
  setShowWarningModal: func,
};

SearchRestaurantsForm.defaultProps = {
  setCurrentForm: () => {},
  restaurantName: '',
  category: '',
  setRestaurantName: () => {},
  setRedirectAction: () => {},
  setSelectedRestaurant: () => {},
  setShowWarningModal: () => {},
};

export default SearchRestaurantsForm;
