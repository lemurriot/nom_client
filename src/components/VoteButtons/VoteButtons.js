import React from 'react';
import PropTypes from 'prop-types';
import './VoteButtons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NomsContext from '../../NomsContext';

const VoteButtons = ({ userDidLike, restaurantId, likeId }) => (
  <NomsContext.Consumer>
    {(context) => {
      const { voteForRestaurant, undoVoteForRestaurant, user } = context;
      return (
        <div className="buttons-container flex-container--centered">
          <button
            type="button"
            className={
              userDidLike ? 'upvote-btn vote-btn hide' : 'upvote-btn vote-btn'
            }
            onClick={() => voteForRestaurant(user.id, restaurantId)}
          >
            <FontAwesomeIcon icon="check-square" color="white" />
          </button>
          <button
            type="button"
            className={
              !userDidLike
                ? 'upvoted-btn vote-btn hide'
                : 'upvoted-btn vote-btn flex-container--centered'
            }
            onClick={() => undoVoteForRestaurant(user.id, restaurantId, likeId)}
          >
            <FontAwesomeIcon
              icon="check"
              color="red"
              transform="right-2 up-3"
            />
          </button>
        </div>
      );
    }}
  </NomsContext.Consumer>
);

VoteButtons.propTypes = {
  likeId: PropTypes.number.isRequired,
  restaurantId: PropTypes.number.isRequired,
  userDidLike: PropTypes.number.isRequired,
};

export default VoteButtons;
