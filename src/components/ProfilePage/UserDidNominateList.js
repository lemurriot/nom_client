/* eslint-disable camelcase */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NomsContext from '../../NomsContext';

const UserDidNominateList = () => {
  const { nominatedRestaurants, user } = useContext(NomsContext);
  const userNominatedRestaurants = nominatedRestaurants.filter(
    ({ nominated_by_user }) => nominated_by_user === user.id
  );

  const userNominatedRestaurantsList = userNominatedRestaurants.map(
    ({ id, name, subtitle, food_category, vote_count }) => (
      <div key={id} className="profile-page__list-item">
        <h5 className="profile-page__list-item--title">
          <Link to={`/category/${food_category}/${id}`}>{name}</Link>
        </h5>
        <h6 className="profile-page__list-item--subtitle">{subtitle}</h6>
        <div className="profile-page__list-item--category">
          Nominated for best {food_category}
        </div>
        <div className="profile-page__list-item--vote-count">
          Votes: {vote_count}
        </div>
      </div>
    )
  );

  if (userNominatedRestaurantsList.length) {
    return userNominatedRestaurantsList;
  }

  return <div className="center">You have not nominated any restaurants</div>;
};

export default UserDidNominateList;
