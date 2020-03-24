import React from 'react';

const NomsContext = React.createContext({
  user: {},
  nominatedRestaurants: [],
  likesAndComments: {},
  voteTallies: {},
  addNewRestaurant: () => {},
  voteForRestaurant: () => {},
  undoVoteForRestaurant: () => {},
  addEditComment: () => {},
});

export default NomsContext;
