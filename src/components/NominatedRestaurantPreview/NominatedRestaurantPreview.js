import React from 'react';
import { Link } from 'react-router-dom';
import findUserDidLike from '../../utils';
import NomsContext from '../../NomsContext';
import VoteButtons from '../VoteButtons/VoteButtons';
import './NominatedRestaurantPreview.css';

const NominatedRestaurantPreview = props => (
  <NomsContext.Consumer>
    {context => {
      const { category, name, id: restaurantId, voteCount } = props;
      const { likesAndComments, user } = context;
      const findIfUserDidLike = findUserDidLike(
        likesAndComments,
        restaurantId,
        user.id
      );
      const likeId = findIfUserDidLike.length ? findIfUserDidLike[0].id : null;

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
            userDidLike={findIfUserDidLike.length}
            likeId={likeId}
          />
          {likeId && !findIfUserDidLike[0].comment.length && (
            <span>Add Comment</span>
          )}
          {likeId && !!findIfUserDidLike[0].comment.length && (
            <span>Edit Comment</span>
          )}
        </div>
      );
    }}
  </NomsContext.Consumer>
);

export default NominatedRestaurantPreview;
