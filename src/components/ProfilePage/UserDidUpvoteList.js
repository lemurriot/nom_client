/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable camelcase */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Chip } from '@material-ui/core';
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
          <section className="profile-page__list-item__top-line flex-container--space-between">
            <div className="profile-page__list-item-title-container">
              <h5 className="profile-page__list-item--title">
                <Link to={`/category/${food_category}/${restaurantId}`}>
                  {name}
                </Link>
              </h5>
              <h6 className="profile-page__list-item--subtitle">{subtitle}</h6>
            </div>
            <div className="profile-page__list-item-chip-container">
              <Chip size="small" label={`Best ${food_category}`} />
              <div className="profile-page__list-item--vote-count">
                Total Votes: {vote_count}
              </div>
            </div>
          </section>
          <div className="profile-page__list-item--quote-container">
            {!!comment.length && (
              <>
                <span className="profile-page__list-item--quote-header montserrat">
                  Your comment:
                </span>
                <div className="profile-page__list-item--quote">
                  &quot;{comment}&quot;
                </div>
              </>
            )}
            <Button
              variant="outlined"
              size="small"
              color="primary"
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
