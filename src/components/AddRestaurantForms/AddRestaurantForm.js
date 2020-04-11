/* eslint-disable camelcase */
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import './AddRestaurantForms.css';
import SelectCategoryForm from './SelectCategoryForm';
import SearchRestaurantsForm from './SearchRestaurantsForm';
import WarningModal from '../WarningModal/WarningModal';
import NomsContext from '../../NomsContext';
// import ValidationError from '../Validation/Validation';
// import CurrentNominatedRestaurants from './CurrentNominatedRestaurants';
// import GoogleAutocompleteResults from './GoogleAutocompleteResults';
import CreateNewRestaurantForm from './CreateNewRestaurantForm';
import SubmitForm from './SubmitForm';
// import SelectCategoryForm from './SelectCategoryForm';

// eslint-disable-next-line react/prefer-stateless-function
const AddRestaurantForm = () => {
  const { nominateNewRestaurant, user, uniqueCategories } = useContext(
    NomsContext
  );
  const history = useHistory();
  const [restaurantName, setRestaurantName] = useState({
    value: '',
    touched: false,
  });
  const [category, setCategory] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState({
    name: '',
    subtitle: '',
    address: '',
    city: 'Portland',
    zip: '',
    id: '',
    apiReferred: false,
  });
  const [redirectAction, setRedirectAction] = useState(() => {});
  const [currentForm, setCurrentForm] = useState('category');
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const handleCategoryChange = (foodCategory) => {
    setCategory(foodCategory);
  };

  const handleSubmitForm = (comment) => {
    const newRestaurant = {
      restaurantName: selectedRestaurant.name,
      foodCategory: category,
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
    <main className="add-restaurant-form--page page">
      <section className="add-restaurant-form--outer">
        <>
          <div className="buttons">
            <Button
              onClick={history.goBack}
              variant="contained"
              className="go-back-btn"
            >
              Cancel
            </Button>
          </div>
          <div className="content-container page-content-container">
            <h2>
              Nominate a Restaurant for Best{' '}
              {category ? category : 'in Category'}
            </h2>
            {currentForm === 'category' && (
              <SelectCategoryForm
                menuOptions={uniqueCategories}
                value={category}
                setSortBy={handleCategoryChange}
                setCurrentForm={setCurrentForm}
              />
            )}
            {currentForm === 'search' && (
              <SearchRestaurantsForm
                setCurrentForm={setCurrentForm}
                category={category}
                setRestaurantName={setRestaurantName}
                restaurantName={restaurantName}
                setSelectedRestaurant={setSelectedRestaurant}
                setRedirectAction={setRedirectAction}
                setShowWarningModal={setShowWarningModal}
                setShowCreateForm={setShowCreateForm}
              />
            )}
            {currentForm === 'create' && (
              <CreateNewRestaurantForm
                setSelectedRestaurant={setSelectedRestaurant}
                setCurrentForm={setCurrentForm}
                selectedRestaurant={selectedRestaurant}
              />
            )}
            {currentForm === 'submit' && (
              <SubmitForm
                selectedRestaurant={selectedRestaurant}
                // setShowSubmitForm={setShowSubmitForm}
                setCurrentForm={setCurrentForm}
                category={category}
                onSubmitForm={handleSubmitForm}
              />
            )}
          </div>
        </>
      </section>
      {showWarningModal && (
        <WarningModal
          showWarningModal={showWarningModal}
          setShowWarningModal={() => setShowWarningModal(!showWarningModal)}
          category={category}
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
