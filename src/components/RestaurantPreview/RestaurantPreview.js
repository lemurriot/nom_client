import React from 'react';
import { string, number } from 'prop-types';
import { Link } from 'react-router-dom';
import { findUserDidLike } from '../../utils';
import NomsContext from '../../NomsContext';
import VoteButtons from '../VoteButtons/VoteButtons';
import './RestaurantPreview.css';

const RestaurantPreview = ({
  category,
  name,
  subtitle,
  id: restaurantId,
  voteCount,
}) => (
  <NomsContext.Consumer>
    {({ likesAndComments, user, upvoteAnimation }) => {
      const findIfUserDidLike = findUserDidLike(
        likesAndComments,
        restaurantId,
        user.id
      );
      const likeId = findIfUserDidLike.length ? findIfUserDidLike[0].id : 0;
      const applyUpvoteAnimation = upvoteAnimation === restaurantId;

      return (
        <div
          className={
            applyUpvoteAnimation
              ? 'restaurant-preview-card flex-container--space-between upvote-animation'
              : 'restaurant-preview-card flex-container--space-between'
          }
        >
          <div className="restaurant-preview-card--left restaurant-preview-card--section">
            <Link to={`/category/${category}/${restaurantId}`}>
              <h5>{name}</h5>
            </Link>
            <h6>{subtitle}</h6>
          </div>
          <div className="restaurant-preview-card--middle restaurant-preview-card--section flex-container--centered">
            {voteCount}
          </div>
          <div className="restaurant-preview-card--right restaurant-preview-card--section flex-container--centered">
            <VoteButtons
              restaurantId={restaurantId}
              userDidLike={findIfUserDidLike.length}
              likeId={likeId}
            />
          </div>
        </div>
      );
    }}
  </NomsContext.Consumer>
);

RestaurantPreview.propTypes = {
  category: string.isRequired,
  name: string.isRequired,
  subtitle: string.isRequired,
  id: number.isRequired,
  voteCount: number,
};

RestaurantPreview.defaultProps = {
  voteCount: 0,
};

export default RestaurantPreview;
