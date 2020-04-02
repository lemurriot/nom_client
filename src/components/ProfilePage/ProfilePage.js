/* eslint-disable camelcase */
import React, { useContext } from 'react';
import NomsContext from '../../NomsContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, nominatedRestaurants, likesAndComments } = useContext(
    NomsContext
  );

  const userDidUpvoteStore = {};

  const userNominatedRestaurants = nominatedRestaurants.filter(
    ({ nominated_by_user }) => nominated_by_user === user.id
  );

  const userNominatedRestaurantsList = userNominatedRestaurants.map(
    ({ id, name, subtitle, food_category, vote_count }) => (
      <div key={id} style={{ borderBottom: '1px solid black' }}>
        <h5>{name}</h5>
        <h6>{subtitle}</h6>
        <div>Nominated for best {food_category}</div>
        <span>Votes: {vote_count}</span>
      </div>
    )
  );

  likesAndComments
    .filter(({ user_id }) => user_id === user.id)
    .forEach((likeObject) => {
      userDidUpvoteStore[likeObject.restaurant_id] = likeObject;
    });

  nominatedRestaurants.forEach((restaurant) => {
    if (userDidUpvoteStore[restaurant.id]) {
      userDidUpvoteStore[restaurant.id].restaurantInfo = restaurant;
    }
  });

  const userDidUpvoteList = Object.keys(userDidUpvoteStore).map((key) => {
    if (userDidUpvoteStore[key].restaurantInfo) {
      const { restaurantInfo, comment } = userDidUpvoteStore[key];
      return (
        <div key={key} style={{ borderBottom: '1px solid black' }}>
          <h5>{restaurantInfo.name}</h5>
          <h5>{restaurantInfo.subtitle}</h5>
          <div>Nominated for Best {restaurantInfo.food_category}</div>
          <div>Total Votes: {restaurantInfo.vote_count}</div>
          <div>
            Your Comment: {comment.length ? comment : <a>Leave a comment</a>}
          </div>
        </div>
      );
    }
    return [];
  });

  return (
    <div className="profile-page--container" style={{ padding: '2%' }}>
      <h2>Hello {user.user_name}</h2>
      <a href="#" style={{ fontSize: '.7em' }}>
        Change Username
      </a>
      <section
        className="user-nominated-restaurants--list"
        style={{ padding: '2%' }}
      >
        <h4>Your Restaurant Nominations</h4>
        {userNominatedRestaurantsList.length
          ? userNominatedRestaurantsList
          : 'You have not nominated any restaurants'}
      </section>
      <section className="user-did-upvote--list" style={{ padding: '2%' }}>
        <h4>You Upvoted</h4>
        {userDidUpvoteList.length
          ? userDidUpvoteList
          : 'You have not upvoted any restaurants'}
      </section>
    </div>
  );
};

export default ProfilePage;
