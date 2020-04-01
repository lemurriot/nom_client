/* eslint-disable camelcase */
import React, { useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { findUserDidLike } from '../../utils';
import NomsContext from '../../NomsContext';
import Comments from '../Comments/Comments';
import VoteButtons from '../VoteButtons/VoteButtons';
import './NominatedRestaurantPage.css';
import { fetchLikesAndComments } from '../../api/routes';
import AddCommentForm from '../AddCommentForm/AddCommentForm';

const NominatedRestaurantPage = ({ match }) => {
  const { likesAndComments, voteTallies, user, addEditComment } = useContext(
    NomsContext
  );
  const [restaurantInfo, setrestaurantInfo] = useState([]);
  const [commentsFormIsShown, showCommentsForm] = useState(false);
  const [error, setError] = useState({});
  // eslint-disable-next-line react/destructuring-assignment
  const { restaurant_id } = match.params;
  const restaurantId = Number(restaurant_id);

  const getrestaurantInfo = useCallback(async () => {
    const response = await fetchLikesAndComments(restaurantId);
    setrestaurantInfo(response);
  }, [restaurantId]);

  useEffect(() => {
    getrestaurantInfo();
  }, [getrestaurantInfo, likesAndComments]);

  const findIfUserDidLike = findUserDidLike(
    likesAndComments,
    restaurantId,
    user.id
  );
  const likeId = findIfUserDidLike.length ? findIfUserDidLike[0].id : 0;

  const {
    name,
    subtitle,
    address,
    food_category: category,
    comments,
    id,
    date_nominated: dateNominated,
    // id: restaurantId
  } = restaurantInfo;

  const closeCommentsForm = () => {
    showCommentsForm(false);
  };

  const handleAddEditCommentSubmit = async (updatedComment) => {
    closeCommentsForm();
    await getrestaurantInfo();
    const newrestaurantInfo = { ...restaurantInfo };
    const userComment = newrestaurantInfo.comments.findIndex(
      ({ id }) => id === likeId
    );
    if (userComment !== -1) {
      newrestaurantInfo.comments[userComment].comment = updatedComment;
      setrestaurantInfo(newrestaurantInfo);
    } else {
      setError({ error: 'Something went wrong' });
    }
  };

  const deleteComment = () => {
    addEditComment(likeId, '', restaurantId);
    handleAddEditCommentSubmit('');
  };

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
      {restaurantInfo.id && (
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
          {!!likeId && !findIfUserDidLike[0].comment.length && (
            <span
              className="comment-action"
              role="link"
              tabIndex={0}
              onKeyDown={() => showCommentsForm(true)}
              onClick={() => showCommentsForm(true)}
            >
              Add Comment
            </span>
          )}
          {!!likeId && !!findIfUserDidLike[0].comment.length && (
            <>
              <span
                className="comment-action"
                role="link"
                tabIndex={0}
                onKeyDown={() => showCommentsForm(true)}
                onClick={() => showCommentsForm(true)}
              >
                Edit Comment
              </span>
              <span
                className="comment-action"
                role="button"
                tabIndex={0}
                onKeyDown={() => showCommentsForm(true)}
                onClick={deleteComment}
              >
                Delete Comment
              </span>
            </>
          )}
          {commentsFormIsShown && (
            <AddCommentForm
              restaurantName={name}
              restaurantId={restaurantId}
              commentId={likeId}
              comment={findIfUserDidLike[0].comment}
              handleSubmit={handleAddEditCommentSubmit}
              addEditComment={addEditComment}
              closeCommentsForm={closeCommentsForm}
              deleteComment={deleteComment}
            />
          )}
          <p>
            <span className="restaurant-page-label">Current Votes: </span>
            {voteTallies[id]}
          </p>
          <p>
            <span className="restaurant-page-label">
              Nominated for Best {category} on:{' '}
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
    </>
  );
};

NominatedRestaurantPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      food_category: PropTypes.string.isRequired,
      restaurant_id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default NominatedRestaurantPage;
