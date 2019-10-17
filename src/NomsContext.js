import React from 'react'


const NomsContext = React.createContext({
    loggedIn: false,
    userId: null,
    nominated_restaurants: [],
    users: [],
    likes_and_comments: {},
    addNewRestaurant: () => {},
    voteForRestaurant: () => {},
    undoVoteForRestaurant: () => {},
})

export default NomsContext