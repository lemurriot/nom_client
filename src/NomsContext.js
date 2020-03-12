import React from 'react';

const NomsContext = React.createContext({
  loggedIn: false,
  userId: null,
  user: {},
  nominatedRestaurants: [],
  users: [],
  likesAndComments: {},
  onLogout: () => {},
  addNewRestaurant: () => {},
  voteForRestaurant: () => {},
  undoVoteForRestaurant: () => {},
});

export default NomsContext;
