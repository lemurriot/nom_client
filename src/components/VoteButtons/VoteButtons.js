import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import './VoteButtons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useBurstAnimation from '../../hooks/useBurstAnimation';
import NomsContext from '../../NomsContext';

const VoteButtons = ({ userDidLike, restaurantId, likeId }) => {
  const { voteForRestaurant, undoVoteForRestaurant, user } = useContext(
    NomsContext
  );
  const buttonRef = useRef(null);
  const animationTimeline = useBurstAnimation({
    duration: 300,
    burstEl: buttonRef,
  });

  const handleActiveUpvoteClick = () => {
    animationTimeline.replay();
    voteForRestaurant(user.id, restaurantId);
  };

  return (
    <div className="buttons-container flex-container--centered">
      <button
        type="button"
        className={
          userDidLike ? 'upvote-btn vote-btn hide' : 'upvote-btn vote-btn'
        }
        onClick={handleActiveUpvoteClick}
      >
        <FontAwesomeIcon icon="check-square" color="white" />
      </button>
      <button
        ref={buttonRef}
        type="button"
        className={
          !userDidLike
            ? 'upvoted-btn vote-btn hide'
            : 'upvoted-btn vote-btn flex-container--centered'
        }
        onClick={() => undoVoteForRestaurant(user.id, restaurantId, likeId)}
      >
        <FontAwesomeIcon icon="check" color="red" transform="right-2 up-2" />
      </button>
    </div>
  );
};

VoteButtons.propTypes = {
  likeId: PropTypes.number.isRequired,
  restaurantId: PropTypes.number.isRequired,
  userDidLike: PropTypes.number.isRequired,
};

export default VoteButtons;
