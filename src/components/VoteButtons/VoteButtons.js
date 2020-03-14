import React from 'react';
import './VoteButtons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NomsContext from '../../NomsContext';

const VoteButtons = props => (
  <NomsContext.Consumer>
    {context => {
      const { voteForRestaurant, undoVoteForRestaurant, user } = context;
      return (
        <div className="buttons-container">
          <button
            type="button"
            className={
              props.userDidLike
                ? 'upvote-btn vote-btn hide'
                : 'upvote-btn vote-btn'
            }
            onClick={() => voteForRestaurant(user.id, props.restaurantId)}
            disabled={false}
          >
            Upvote!
            <FontAwesomeIcon icon="star" color="white" />
          </button>
          <button
            type="button"
            className={
              !props.userDidLike
                ? 'upvoted-btn vote-btn hide'
                : 'upvoted-btn vote-btn'
            }
            onClick={() =>
              undoVoteForRestaurant(user.id, props.restaurantId, props.likeId)
            }
            disabled={false}
          >
            You upvoted this
            <FontAwesomeIcon icon="star" color="gold" />
          </button>
        </div>
      );
    }}
  </NomsContext.Consumer>
);

export default VoteButtons;
