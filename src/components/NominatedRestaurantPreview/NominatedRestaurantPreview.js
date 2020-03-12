import React from 'react';
import { Link } from 'react-router-dom';
import NomsContext from '../../NomsContext';
import VoteButtons from '../VoteButtons/VoteButtons';
import './NominatedRestaurantPreview.css';

const NominatedRestaurantPreview = props => (
  <NomsContext.Consumer>
    {context => {
      const { category, name, id, voteCount } = props;
      const { likesAndComments, user } = context;
      const filterLikesArray = likesAndComments.filter(
        like => like.restaurant_id === id && like.user_id === user.id
      );
      const userDidLike = filterLikesArray ? filterLikesArray.length : false;

      return (
        <div className="preview-nom-box">
          <Link to={`/category/${category}/${id}`}>
            <h5>{name}</h5>
          </Link>
          <span>
            Votes:
            {voteCount}
          </span>
          <VoteButtons id={id} userDidLike={userDidLike} />
        </div>
      );
    }}
  </NomsContext.Consumer>
);

export default NominatedRestaurantPreview;
