import React from 'react';
import { Link } from 'react-router-dom';
import NomsContext from '../../NomsContext';
import VoteButtons from '../VoteButtons/VoteButtons';
import './NominatedRestaurantPreview.css';

const NominatedRestaurantPreview = props => (
  <NomsContext.Consumer>
    {context => {
      const { category, name, id: restaurantId, voteCount } = props;
      const { likesAndComments, user } = context;
      const filterLikesArray = likesAndComments.filter(
        like => like.restaurant_id === restaurantId && like.user_id === user.id
      );
      const likeId = filterLikesArray.length ? filterLikesArray[0].id : null;

      return (
        <div className="preview-nom-box">
          <Link to={`/category/${category}/${restaurantId}`}>
            <h5>{name}</h5>
          </Link>
          <span>
            Votes:
            {voteCount}
          </span>
          <VoteButtons
            restaurantId={restaurantId}
            userDidLike={filterLikesArray.length}
            likeId={likeId}
          />
        </div>
      );
    }}
  </NomsContext.Consumer>
);

export default NominatedRestaurantPreview;
