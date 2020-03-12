import React from 'react';
import './VoteButtons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NomsContext from '../../NomsContext';

const VoteButtons = props => (
  <NomsContext.Consumer>
    {context => {
      const { voteForRestaurant } = context;
      return (
        <div className="buttons-container">
          <button
            type="button"
            className={
              props.userDidLike
                ? 'upvote-btn vote-btn hide'
                : 'upvote-btn vote-btn'
            }
            // onClick={voteForRestaurant}
            onClick={() => alert('clicked vote')}
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
            onClick={() => alert('cliked unvote')}
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
