import React from 'react';

const NomsContext = React.createContext({
  user: {},
  username: '',
  nominatedRestaurants: [],
  likesAndComments: {},
  voteTallies: {},
  uniqueCategories: [],
  upvoteAnimation: null,
  setShowFeedbackSnackbar: () => {},
  addNewRestaurant: () => {},
  changeUsernameLocally: () => {},
  voteForRestaurant: () => {},
  undoVoteForRestaurant: () => {},
  addEditComment: () => {},
});

export default NomsContext;
