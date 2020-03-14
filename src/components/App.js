import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NomsContext from '../NomsContext';
import STORE from '../store.js';
import uuid from 'uuid';
// import config from "../config";
import {
  fetchUserData,
  fetchRestaurantsData,
  fetchAllLikesAndComments,
  postNewUpvote,
  deleteUpvote,
} from '../api/routes';
import LandingPage from './LandingPage/LandingPage';
import NominatedRestaurantPage from './NominatedRestaurantPage/NominatedRestaurantPage';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import AddRestaurantForm from './AddRestaurantForm/AddRestaurantForm';
import MyReviews from './MyReviews/MyReviews';
import About from './About/About';
import TermsAndConditions from './TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from './TermsAndConditions/PrivacyPolicy';
import NotFoundPage from './NotFoundPage/NotFoundPage';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      userId: uuid.v4(),
      nominatedRestaurants: [],
      users: [],
      user: {},
      likes_and_comments: [],
      likesAndComments: [],
      voteTallies: {},
      error: null,
    };
  }

  componentDidMount() {
    this.setState(STORE);
    //add current user session
    this.getUser();
    this.getRestaurants();
    this.getLikesAndComments();
  }

  getUser = () =>
    fetchUserData().then(user =>
      this.setState({ user }, () => {
        const newUserId = this.state.user.id;
        const newUserObj = { username: 'You' };
        this.setState(({ users }) => (users[newUserId] = newUserObj));
      })
    );

  getRestaurants = () =>
    fetchRestaurantsData().then(nominatedRestaurants =>
      this.setState({ nominatedRestaurants }, () => this.getVoteTallies())
    );

  getVoteTallies = () => {
    const voteTallyObj = {};
    this.state.nominatedRestaurants.forEach(
      restaurant =>
        (voteTallyObj[restaurant.id] = Number(restaurant.vote_count))
    );
    this.setState({ voteTallies: voteTallyObj });
  };

  getLikesAndComments = () =>
    fetchAllLikesAndComments().then(likesAndComments =>
      this.setState({ likesAndComments })
    );

  handleAddRestaurant = (newRestaurant, newLike, newLikesTableID) => {
    this.setState({
      nominatedRestaurants: [...this.state.nominatedRestaurants, newRestaurant],
    });
    this.setState(
      ({ likes_and_comments }) =>
        (likes_and_comments[newLikesTableID] = newLike)
    );
  };

  handleVoteForRestaurant = async (userId, restaurantId) => {
    const newUpvote = await postNewUpvote(userId, restaurantId);
    const newVoteTallies = { ...this.state.voteTallies };
    ++newVoteTallies[restaurantId];
    this.setState(prevState => ({
      likesAndComments: [...prevState.likesAndComments, newUpvote],
      voteTallies: newVoteTallies,
    }));
  };

  handleUndoVoteForRestaurant = (userId, restaurantId, likesCommentsId) => {
    deleteUpvote(userId, restaurantId);
    const newVoteTallies = { ...this.state.voteTallies };
    --newVoteTallies[restaurantId];
    this.setState({
      likesAndComments: this.state.likesAndComments.filter(
        ({ id }) => id !== likesCommentsId
      ),
      voteTallies: newVoteTallies,
    });
  };

  handleLogin = e => {
    e.preventDefault();
    this.setState({
      loggedIn: true,
    });
  };
  handleLogout = e => {
    e.preventDefault();
    this.setState({
      loggedIn: false,
    });
  };
  render() {
    const contextVal = {
      loggedIn: this.state.loggedIn,
      userId: this.state.userId,
      nominatedRestaurants: this.state.nominatedRestaurants,
      users: this.state.users,
      user: this.state.user,
      voteTallies: this.state.voteTallies,
      likesAndComments: this.state.likesAndComments,
      nominateNewRestaurant: this.handleAddRestaurant,
      voteForRestaurant: this.handleVoteForRestaurant,
      undoVoteForRestaurant: this.handleUndoVoteForRestaurant,
    };
    return (
      <NomsContext.Provider value={contextVal}>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={routerProps => (
                <LandingPage
                  {...routerProps}
                  // likesAndComments={this.state.likesAndComments}
                  // nominatedRestaurants={this.state.nominatedRestaurants}
                  // loggedIn={this.state.loggedIn}
                  // onLogout={this.handleLogout}
                />
              )}
            />
            <Route
              path="/login"
              render={props => (
                <LoginForm {...props} onLogin={this.handleLogin} />
              )}
            />
            <Route path="/register" component={RegisterForm} />
            <Route
              path="/add-new-nom"
              render={props => (
                <AddRestaurantForm
                  {...props}
                  handleAddRestaurant={this.handleAddRestaurant}
                  userId={this.state.userId}
                />
              )}
            />
            <Route
              path="/my-reviews"
              render={props => (
                <MyReviews
                  {...props}
                  restaurants={this.state.nominatedRestaurants}
                  userId={this.state.userId}
                  loggedIn={this.state.loggedIn}
                  onLogout={this.handleLogout}
                />
              )}
            />
            <Route
              path="/category/:food_category/:restaurant_id"
              render={props => (
                <NominatedRestaurantPage
                  {...props}
                  userId={this.state.userId}
                  loggedIn={this.state.loggedIn}
                  onLogout={this.handleLogout}
                />
              )}
            />
            <Route
              path="/about"
              render={props => (
                <About
                  {...props}
                  loggedIn={this.state.loggedIn}
                  onLogout={this.handleLogout}
                />
              )}
            />
            <Route path="/termsandconditions" component={TermsAndConditions} />
            <Route path="/privacypolicy" component={PrivacyPolicy} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </NomsContext.Provider>
    );
  }
}
