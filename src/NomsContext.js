import React from 'react';

const NomsContext = React.createContext({
  loggedIn: false,
  userId: null,
  user: {},
  nominatedRestaurants: [],
  users: [],
  likesAndComments: {},
  voteTallies: {},
  onLogout: () => {},
  addNewRestaurant: () => {},
  voteForRestaurant: () => {},
  undoVoteForRestaurant: () => {},
  addEditComment: () => {},
});

export default NomsContext;
