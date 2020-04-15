/* eslint-disable camelcase */
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import './AddRestaurantForms.css';
import SelectCategoryForm from './SelectCategoryForm';
import SearchRestaurantsForm from './SearchRestaurantsForm';
import WarningModal from '../WarningModal/WarningModal';
import NomsContext from '../../NomsContext';
// import CurrentNominatedRestaurants from './CurrentNominatedRestaurants';
import CreateNewRestaurantForm from './CreateNewRestaurantForm';
import SubmitForm from './SubmitForm';

// eslint-disable-next-line react/prefer-stateless-function
const AddRestaurantForm = () => {
  const { nominateNewRestaurant, user } = useContext(NomsContext);
  const history = useHistory();
  const [restaurantName, setRestaurantName] = useState('');
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
  const [showWarningModal, setShowWarningModal] = useState(false);

  const handleCategoryChange = (foodCategory) => {
    setCategory(foodCategory);
  };

  const formSubtitle = () => {
    switch (currentForm) {
      case 'category':
        return 'First select a category';
      case 'search':
        return 'Search Portland restaurants';
      case 'create':
        return 'Enter restaurant information';
      case 'submit':
        return 'Last Step: Comment and confirm entry!';
      default:
        return '';
    }
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
    <main className="add-restaurant-form__page page">
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
          <div className="content-container page-content-container flex-container--column add-new-restaurant__container">
            <div className="add-new-restaurant__header">
              <h2 className="center add-new-restaurant__title montserrat">
                Nominate a Restaurant for Best {category || 'in Category'}
              </h2>
              <h3 className="add-new-restaurant__subtitle">{formSubtitle()}</h3>
            </div>
            {currentForm === 'category' && (
              <SelectCategoryForm
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
