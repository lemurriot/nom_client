import React from 'react';
import PropTypes from 'prop-types';
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
        </div>
      );
    }}
  </NomsContext.Consumer>
);

NominatedRestaurantPreview.propTypes = {
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  voteCount: PropTypes.number.isRequired,
};

export default NominatedRestaurantPreview;
