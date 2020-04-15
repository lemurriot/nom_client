/* eslint-disable camelcase */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { func } from 'prop-types';
import NomsContext from '../../NomsContext';

const UserDidUpvoteList = ({ onShowCommentForm }) => {
  const { likesAndComments, user, nominatedRestaurants } = useContext(
    NomsContext
  );
  const userDidUpvoteStore = {};
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

  const userUpvoteList = Object.keys(userDidUpvoteStore).map((key) => {
    if (userDidUpvoteStore[key].restaurantInfo) {
      const {
        id,
        comment,
        restaurantInfo: {
          name,
          subtitle,
          food_category,
          vote_count,
          id: restaurantId,
        },
      } = userDidUpvoteStore[key];
      const editFormText = comment.length ? 'Edit Comment' : 'Add Comment';
      return (
        <div key={id} className="profile-page__list-item">
          <h5>
            <Link to={`/category/${food_category}/${restaurantId}`}>
              {name}
            </Link>
          </h5>
          <h5>{subtitle}</h5>
          <div>Nominated for Best {food_category}</div>
          <div>Total Votes: {vote_count}</div>
          <div>
            {!!comment.length && <div>Your comment: "{comment}"</div>}
            <Button
              variant="outlined"
              size="small"
              color="primary"
              href="#text-buttons"
              onClick={() =>
                onShowCommentForm({
                  name,
                  comment,
                  id,
                  restaurantId,
                })
              }
            >
              {editFormText}
            </Button>
          </div>
        </div>
      );
    }
    return [];
  });
  if (userUpvoteList.length) {
    return userUpvoteList;
  }
  return <div className="center">You have not upvoted any restaurants</div>;
};

UserDidUpvoteList.propTypes = {
  onShowCommentForm: func.isRequired,
};

export default UserDidUpvoteList;
