/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import NomsContext from '../NomsContext';
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
import NominatedRestaurantPage from './NominatedRestaurantPage/NominatedRestaurantPage';
import AddRestaurantForm from './AddRestaurantForm/AddRestaurantForm';
import ProfilePage from './ProfilePage/ProfilePage';
import CategoryPage from './CategoryPage/CategoryPage';
import WarningModal from './WarningModal/WarningModal';
import About from './About/About';
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
      likesAndComments: [],
      voteTallies: {},
      uniqueCategories: [],
      showWarningModal: false,
      proceedFunction: () => {},
      // error: null,
    };
  }

  componentDidMount() {
    this.getUser();
    this.getRestaurants();
    this.getLikesAndComments();
  }

  getUser = () => fetchUserData().then((user) => this.setState({ user }));

  getRestaurants = () =>
    fetchRestaurantsData().then((nominatedRestaurants) => {
      nominatedRestaurants.forEach(
        (restaurant) => (restaurant.vote_count = Number(restaurant.vote_count))
      );
      this.setState({ nominatedRestaurants }, () => {
        this.getVoteTallies();
        this.getUniqueCategories();
      });
    });

  getUniqueCategories = () => {
    const { nominatedRestaurants } = this.state;
    const categoryList = nominatedRestaurants.map(
      (restaurant) => restaurant.food_category
    );
    const uniqueCategories = new Set(categoryList);
    this.setState({ uniqueCategories: Array.from(uniqueCategories) });
  };

  getVoteTallies = () => {
    const { nominatedRestaurants } = this.state;
    const voteTallyObj = {};
    nominatedRestaurants.forEach((restaurant) => {
      voteTallyObj[restaurant.id] = Number(restaurant.vote_count);
    });
    this.setState({ voteTallies: voteTallyObj });
  };

  getLikesAndComments = () =>
    fetchAllLikesAndComments().then((likesAndComments) =>
      this.setState({ likesAndComments })
    );

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
    newRestaurantFromDb.vote_count = Number(newRestaurantFromDb.vote_count);
    this.setState(
      (prevState) => ({
        nominatedRestaurants: [
          ...prevState.nominatedRestaurants,
          newRestaurantFromDb,
        ],
      }),
      () => {
        const newComment = newRestaurantFromDb.comments[0];
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

  handleVoteForRestaurant = async (userId, restaurantId) => {
    const { voteTallies } = this.state;
    const newUpvote = await postNewUpvote(userId, restaurantId);
    const newVoteTallies = { ...voteTallies };
    ++newVoteTallies[restaurantId];
    this.setState((prevState) => ({
      likesAndComments: [...prevState.likesAndComments, newUpvote],
      voteTallies: newVoteTallies,
    }));
  };

  handleUndoVoteForRestaurant = (userId, restaurantId, likesCommentsId) => {
    const { likesAndComments } = this.state;
    const [userLikeObj] = likesAndComments.filter(
      ({ id }) => id === likesCommentsId
    );
    if (userLikeObj.comment.length) {
      return this.setState({
        showWarningModal: true,
        proceedFunction: () =>
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
    deleteUpvote(userId, restaurantId);
    const newVoteTallies = { ...voteTallies };
    --newVoteTallies[restaurantId];
    this.setState({
      likesAndComments: likesAndComments.filter(
        ({ id }) => id !== likesCommentsId
      ),
      voteTallies: newVoteTallies,
    });
  };

  addEditComment = async (commentId, updatedComment, restaurantId) => {
    const { user, likesAndComments } = this.state;
    patchComment(commentId, updatedComment, user.id, restaurantId);
    // console.log(commentId, updatedComment)
    const newLikesAndComments = [...likesAndComments];
    const commentToUpdate = newLikesAndComments.findIndex(
      ({ id }) => id === commentId
    );
    newLikesAndComments[commentToUpdate].comment = updatedComment;
    this.setState({ likesAndComments: newLikesAndComments });
  };

  render() {
    const {
      nominatedRestaurants,
      user,
      voteTallies,
      likesAndComments,
      uniqueCategories,
      showWarningModal,
      proceedFunction,
    } = this.state;
    const contextVal = {
      nominatedRestaurants,
      user,
      voteTallies,
      likesAndComments,
      uniqueCategories,
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
            <Route path="/add-new-nom" component={AddRestaurantForm} />
            <Route
              path="/category/:food_category/:restaurant_id"
              render={({ match }) => <NominatedRestaurantPage match={match} />}
            />
            <Route
              path="/category/:food_category"
              render={({ match }) => <CategoryPage match={match} />}
            />
            <Route path="/about" component={About} />
            <Route path="/profile" component={ProfilePage} />
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
              proceedFunction={proceedFunction}
              headingText="Your comment for this post will also be deleted"
              buttonText="Proceed"
              subtext="To foster a positive community, only those who provide an upvote may leave a comment"
            />
          )}
          <Footer />
        </div>
      </NomsContext.Provider>
    );
  }
}
