import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import NomsContext from "../NomsContext";
import STORE from "../store.js";
import uuid from "uuid";
// import config from "../config";
import { fetchUserData, fetchRestaurantsData } from "../api/routes";
import LandingPage from "./LandingPage/LandingPage";
import NominatedRestaurantPage from "./NominatedRestaurantPage/NominatedRestaurantPage";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import AddRestaurantForm from "./AddRestaurantForm/AddRestaurantForm";
import MyReviews from "./MyReviews/MyReviews";
import About from "./About/About";
import TermsAndConditions from "./TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "./TermsAndConditions/PrivacyPolicy";
import NotFoundPage from "./NotFoundPage/NotFoundPage";

import "./App.css";

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
      likesAndComments: {},
      error: null
    };
  }

  componentDidMount() {
    this.setState(STORE);
    //add current user session
    this.getUser();
    this.getRestaurants();
  }

  getUser = () => 
    fetchUserData().then(user => this.setState({ user }, () => {
          const newUserId = this.state.user.id;
          const newUserObj = { username: "You" };
          this.setState(({ users }) => (users[newUserId] = newUserObj));
        }));
  
  getRestaurants = () => 
    fetchRestaurantsData().then(nominatedRestaurants => this.setState({ nominatedRestaurants }))
  
  handleAddRestaurant = (newRestaurant, newLike, newLikesTableID) => {
    this.setState({
      nominatedRestaurants: [
        ...this.state.nominatedRestaurants,
        newRestaurant
      ]
    });
    this.setState(
      ({ likes_and_comments }) =>
        (likes_and_comments[newLikesTableID] = newLike)
    );
  };

  handleVoteForRestaurant = (userID, restaurantID) => {
    const { likes_and_comments } = this.state;
    const checkIfAlreadyLiked = likes_and_comments[
      restaurantID
    ].liked_by.filter(likeObj => likeObj.user === userID);
    if (checkIfAlreadyLiked.length) {
      this.setState({
        error: "User already voted"
      });
    } else {
      const newLikedByObj = {
        user: this.state.userId,
        date_liked: Date.now(),
        comment: ""
      };
      const updatedLikedByArr = [
        ...likes_and_comments[restaurantID].liked_by,
        newLikedByObj
      ];

      this.setState(
        ({ likes_and_comments }) =>
          (likes_and_comments[restaurantID].liked_by = updatedLikedByArr)
      );
    }
  };

  handleUndoVoteForRestaurant = (userID, restaurantID) => {
    const { likes_and_comments } = this.state;
    const updatedLikedByArr = likes_and_comments[restaurantID].liked_by.filter(
      lc => lc.user !== userID
    );

    this.setState(
      ({ likes_and_comments }) =>
        (likes_and_comments[restaurantID].liked_by = updatedLikedByArr)
    );
  };

  handleLogin = e => {
    e.preventDefault();
    this.setState({
      loggedIn: true
    });
  };
  handleLogout = e => {
    e.preventDefault();
    this.setState({
      loggedIn: false
    });
  };
  render() {
    const contextVal = {
      loggedIn: this.state.loggedIn,
      userId: this.state.userId,
      nominatedRestaurants: this.state.nominatedRestaurants,
      users: this.state.users,
      likes_and_comments: this.state.likes_and_comments,
      nominateNewRestaurant: this.handleAddRestaurant,
      voteForRestaurant: this.handleVoteForRestaurant,
      undoVoteForRestaurant: this.handleUndoVoteForRestaurant
    };
    return (
      <NomsContext.Provider value={contextVal}>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <LandingPage
                  {...props}
                  likesComments={this.state.likes_and_comments}
                  nominatedRestaurants={this.state.nominatedRestaurants}
                  loggedIn={this.state.loggedIn}
                  onLogout={this.handleLogout}
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
