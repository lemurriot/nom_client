import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import findUserDidLike from '../../utils';
import NomsContext from '../../NomsContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Comments from '../Comments/Comments';
import VoteButtons from '../VoteButtons/VoteButtons';
import './NominatedRestaurantPage.css';
import { fetchLikesAndComments } from '../../api/routes';

const NominatedRestaurantPage = props => {
  const [restaurantLikesAndComments, setRestaurantLikesAndComments] = useState(
    []
  );
  const { restaurant_id } = props.match.params;
  const restaurantId = Number(restaurant_id);

  const getRestaurantLikesAndComments = useCallback(async () => {
    const response = await fetchLikesAndComments(restaurantId);
    setRestaurantLikesAndComments(response);
  }, [restaurantId]);

  useEffect(() => {
    getRestaurantLikesAndComments();
  }, [getRestaurantLikesAndComments]);
  return (
    <NomsContext.Consumer>
      {context => {
        const { likesAndComments, voteTallies, user } = context;
        const findIfUserDidLike = findUserDidLike(
          likesAndComments,
          Number(restaurantId),
          user.id
        );
        const likeId = findIfUserDidLike.length
          ? findIfUserDidLike[0].id
          : null;

        const {
          name,
          subtitle,
          address,
          category,
          comments,
          id,
          date_nominated: dateNominated,
          // id: restaurantId
        } = restaurantLikesAndComments;

        const mapComments = () =>
          comments
            .filter(({ comment }) => comment.length)
            .map(
              ({
                user_name: username,
                comment,
                date_commented: dateCommented,
                id: commentId,
              }) => (
                <Comments
                  key={commentId}
                  id={commentId}
                  comment={comment}
                  username={username}
                  dateCommented={dateCommented}
                />
              )
            );
        return (
          <>
            <Header
              {...props}
              loggedIn
              // loggedIn={props.loggedIn}
              // onLogout={props.onLogout}
            />
            {restaurantLikesAndComments.id && (
              <article className="restaurant-page-main-container">
                <Link to="/">Go back</Link>
                <h2>{name}</h2>
                {subtitle && <h3>{subtitle}</h3>}
                {address && <h3>{address}</h3>}
                <VoteButtons
                  restaurantId={restaurantId}
                  userDidLike={findIfUserDidLike.length}
                  likeId={likeId}
                />
                <p>
                  <span className="restaurant-page-label">Current Votes: </span>
                  {voteTallies[id]}
                </p>
                <p>
                  <span className="restaurant-page-label">
                    Nominated for Best
                    {category}
                    on:
                    {new Date(dateNominated).toDateString()}
                  </span>
                </p>
                <section className="comment-section">
                  <h3>Comments</h3>
                  {mapComments()}
                </section>
              </article>
            )}
            ;
            <Footer />
          </>
        );
      }}
    </NomsContext.Consumer>
  );
};

export default NominatedRestaurantPage;
