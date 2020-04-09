import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { findUserDidLike } from '../../utils';
import NomsContext from '../../NomsContext';
import VoteButtons from '../VoteButtons/VoteButtons';
import './NominatedRestaurantPreview.css';

const NominatedRestaurantPreview = ({
  category,
  name,
  subtitle,
  id: restaurantId,
  voteCount,
}) => (
  <NomsContext.Consumer>
    {({ likesAndComments, user }) => {
      const findIfUserDidLike = findUserDidLike(
        likesAndComments,
        restaurantId,
        user.id
      );
      const likeId = findIfUserDidLike.length ? findIfUserDidLike[0].id : 0;

      return (
        <div className="restaurant-preview-card flex-container--space-between">
          <div className="restaurant-preview-card--left">
            <Link to={`/category/${category}/${restaurantId}`}>
              <h5>{name}</h5>
            </Link>
            <h6>{subtitle}</h6>
          </div>
          <div className="restaurant-preview-card--right">
            <span>
              Votes:
              {voteCount}
            </span>
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

NominatedRestaurantPreview.propTypes = {
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  voteCount: PropTypes.number,
};

NominatedRestaurantPreview.defaultProps = {
  voteCount: 0,
};

export default NominatedRestaurantPreview;
