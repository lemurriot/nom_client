import React from 'react';

const NomsContext = React.createContext({
  user: {},
  nominatedRestaurants: [],
  likesAndComments: {},
  voteTallies: {},
  uniqueCategories: [],
  addNewRestaurant: () => {},
  voteForRestaurant: () => {},
  undoVoteForRestaurant: () => {},
  addEditComment: () => {},
});

export default NomsContext;
