/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import isEmpty from 'lodash.isempty';
import config from '../config';
import { generateUniqueCategoriesArray, generateVoteTallies } from '../utils';
import NomsContext from '../NomsContext';
import {
  deleteUpvoteConstants,
  mustLoginInConstants,
} from '../constants/messageConstants';
import {
  fetchUserData,
  fetchRestaurantsData,
  fetchAllLikesAndComments,
  postNewUpvote,
  deleteUpvote,
  patchComment,
  postNewRestaurant,
} from '../api/routes';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import LandingPage from './LandingPage/LandingPage';
import LoginForm from './LoginForm/LoginForm';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import RestaurantPage from './RestaurantPage/RestaurantPage';
import AddRestaurantForm from './AddRestaurantForm/AddRestaurantForm';
import ProfilePage from './ProfilePage/ProfilePage';
import CategoryPage from './CategoryPage/CategoryPage';
import WarningModal from './WarningModal/WarningModal';
import FeedbackSnackbar from './FeedbackSnackbar/FeedbackSnackbar';
import AboutPage from './AboutPage/AboutPage';
import TermsAndConditions from './TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from './TermsAndConditions/PrivacyPolicy';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nominatedRestaurants: [],
      user: {},
      username: '',
      likesAndComments: [],
      voteTallies: {},
      uniqueCategories: [],
      showWarningModal: false,
      warningModalMessages: {},
      warningModalProceedAction: () => {},
      feedbackMessage: '',
      showFeedbackMessage: false,
    };
  }

  componentDidMount() {
    this.getUser();
    this.getRestaurants();
    this.getLikesAndComments();
  }

  getUser = () => {
    fetchUserData().then((userData) => {
      if (userData.error) {
        this.handleShowFeedbackSnackbar(userData.message);
      }
      return this.setState({
        user: userData,
        username: localStorage.getItem('username') || userData.user_name,
      });
    });
  };

  changeUsernameLocally = (username) => {
    this.setState({ username });
  };

  getRestaurants = () =>
    fetchRestaurantsData().then((restaurantData) => {
      if (restaurantData.error) {
        this.handleShowFeedbackSnackbar(restaurantData.message);
      }
      restaurantData.forEach((restaurant) => {
        // eslint-disable-next-line no-param-reassign
        restaurant.vote_count = Number(restaurant.vote_count);
      });
      return this.setState({ nominatedRestaurants: restaurantData }, () => {
        this.getVoteTallies();
        this.getUniqueCategories();
      });
    });

  getUniqueCategories = () => {
    const { nominatedRestaurants } = this.state;
    const uniqueCategories = generateUniqueCategoriesArray(
      nominatedRestaurants
    );
    this.setState({ uniqueCategories });
  };

  getVoteTallies = () => {
    const { nominatedRestaurants } = this.state;
    const voteTallies = generateVoteTallies(nominatedRestaurants);
    this.setState({ voteTallies });
  };

  getLikesAndComments = () =>
    fetchAllLikesAndComments().then((likesAndComments) => {
      if (likesAndComments.error) {
        this.handleShowFeedbackSnackbar(likesAndComments.message);
      }
      return this.setState({ likesAndComments });
    });

  handleAddRestaurant = async (newRestaurant) => {
    const {
      restaurantName,
      foodCategory,
      subtitle,
      address,
      googleId,
      nominatedByUser,
      comment,
    } = newRestaurant;
    const newRestaurantFromDb = await postNewRestaurant(
      restaurantName,
      foodCategory,
      subtitle,
      address,
      googleId,
      nominatedByUser,
      comment
    );
    if (newRestaurantFromDb.error) {
      this.handleShowFeedbackSnackbar(newRestaurantFromDb.message);
    }
    newRestaurantFromDb.vote_count = Number(newRestaurantFromDb.vote_count);
    this.setState(
      (prevState) => ({
        nominatedRestaurants: [
          ...prevState.nominatedRestaurants,
          newRestaurantFromDb,
        ],
      }),
      () => {
        const [newComment] = newRestaurantFromDb.comments;
        this.setState((prevState) => ({
          likesAndComments: [...prevState.likesAndComments, newComment],
          voteTallies: {
            ...prevState.voteTallies,
            [newRestaurantFromDb.id]: 1,
          },
        }));
      }
    );
  };

  handleRedirectToLogin = () => {
    this.setState({
      showWarningModal: false,
    });
    window.location.href = `${config.API_ENDPOINT}/auth/google-oauth`;
  };

  handleVoteForRestaurant = async (userId, restaurantId) => {
    const { voteTallies, user } = this.state;
    if (isEmpty(user)) {
      this.setState(
        {
          warningModalMessages: mustLoginInConstants,
          warningModalProceedAction: this.handleRedirectToLogin,
        },
        () => {
          this.setState({
            showWarningModal: true,
          });
        }
      );
    } else {
      const newUpvote = await postNewUpvote(userId, restaurantId);
      if (newUpvote.error) {
        return this.handleShowFeedbackSnackbar(newUpvote.message);
      }
      const newVoteTallies = { ...voteTallies };
      ++newVoteTallies[restaurantId];
      return this.setState((prevState) => ({
        likesAndComments: [...prevState.likesAndComments, newUpvote],
        voteTallies: newVoteTallies,
      }));
    }
  };

  handleShowFeedbackSnackbar = (feedbackMessage) =>
    this.setState({
      showFeedbackMessage: true,
      feedbackMessage,
    });

  handleUndoVoteForRestaurant = (userId, restaurantId, likesCommentsId) => {
    const { likesAndComments } = this.state;
    const [userLikeObj] = likesAndComments.filter(
      ({ id }) => id === likesCommentsId
    );
    if (userLikeObj.comment.length) {
      return this.setState({
        showWarningModal: true,
        warningModalMessages: deleteUpvoteConstants,
        warningModalProceedAction: () =>
          this.proceedUndoVoteForRestaurant(
            userId,
            restaurantId,
            likesCommentsId
          ),
      });
    }
    return this.proceedUndoVoteForRestaurant(
      userId,
      restaurantId,
      likesCommentsId
    );
  };

  proceedUndoVoteForRestaurant = (userId, restaurantId, likesCommentsId) => {
    const { voteTallies, likesAndComments } = this.state;
    this.addEditComment(likesCommentsId, '', restaurantId);
    deleteUpvote(userId, restaurantId).then((confirmation) => {
      if (confirmation.error) {
        return this.handleShowFeedbackSnackbar(confirmation.message);
      }
      const newVoteTallies = { ...voteTallies };
      --newVoteTallies[restaurantId];
      return this.setState({
        likesAndComments: likesAndComments.filter(
          ({ id }) => id !== likesCommentsId
        ),
        voteTallies: newVoteTallies,
        showWarningModal: false,
      });
    });
  };

  addEditComment = async (commentId, updatedComment, restaurantId) => {
    const { user, likesAndComments } = this.state;
    const confirmation = await patchComment(
      commentId,
      updatedComment,
      user.id,
      restaurantId
    );
    if (confirmation.error) {
      this.handleShowFeedbackSnackbar(confirmation.message);
      return confirmation;
    }
    const newLikesAndComments = [...likesAndComments];
    const commentToUpdate = newLikesAndComments.findIndex(
      ({ id }) => id === commentId
    );
    newLikesAndComments[commentToUpdate].comment = updatedComment;
    this.setState({ likesAndComments: newLikesAndComments });
    if (updatedComment.length) {
      this.handleShowFeedbackSnackbar('Success!');
    }
    return confirmation;
  };

  render() {
    const {
      nominatedRestaurants,
      user,
      username,
      voteTallies,
      likesAndComments,
      uniqueCategories,
      feedbackMessage,
      showFeedbackMessage,
      showWarningModal,
      warningModalProceedAction,
      warningModalMessages: { headingText, subtext, buttonText },
    } = this.state;
    const contextVal = {
      nominatedRestaurants,
      user,
      username,
      voteTallies,
      likesAndComments,
      uniqueCategories,
      setShowFeedbackSnackbar: this.handleShowFeedbackSnackbar,
      changeUsernameLocally: this.changeUsernameLocally,
      nominateNewRestaurant: this.handleAddRestaurant,
      voteForRestaurant: this.handleVoteForRestaurant,
      undoVoteForRestaurant: this.handleUndoVoteForRestaurant,
      addEditComment: this.addEditComment,
    };
    return (
      <NomsContext.Provider value={contextVal}>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <ProtectedRoute
              path="/add-new-nom"
              authenticated={!isEmpty(user)}
              component={AddRestaurantForm}
            />
            <Route
              path="/category/:food_category/:restaurant_id"
              component={RestaurantPage}
            />
            <Route path="/category/:food_category" component={CategoryPage} />
            <Route path="/about" component={AboutPage} />
            <ProtectedRoute
              path="/profile"
              authenticated={!isEmpty(user)}
              component={ProfilePage}
            />
            <Route path="/login" component={LoginForm} />
            <Route path="/termsandconditions" component={TermsAndConditions} />
            <Route path="/privacypolicy" component={PrivacyPolicy} />
            <Route component={NotFoundPage} />
          </Switch>
          {showWarningModal && (
            <WarningModal
              showWarningModal={showWarningModal}
              setShowWarningModal={() =>
                this.setState((prevState) => ({
                  showWarningModal: !prevState.showWarningModal,
                }))
              }
              proceedAction={warningModalProceedAction}
              headingText={headingText}
              buttonText={buttonText}
              subtext={subtext}
            />
          )}
          {showFeedbackMessage && (
            <FeedbackSnackbar
              open={showFeedbackMessage}
              setOpen={() =>
                this.setState({
                  showFeedbackMessage: false,
                })
              }
              message={feedbackMessage}
            />
          )}
          <Footer />
        </div>
      </NomsContext.Provider>
    );
  }
}
