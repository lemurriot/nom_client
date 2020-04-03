/* eslint-disable camelcase */
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { findUserDidLike } from '../../utils';
import NomsContext from '../../NomsContext';
import Comments from '../Comments/Comments';
import VoteButtons from '../VoteButtons/VoteButtons';
import './NominatedRestaurantPage.css';
import { fetchLikesAndComments } from '../../api/routes';
import AddCommentForm from '../AddCommentForm/AddCommentForm';

const NominatedRestaurantPage = () => {
  const { likesAndComments, voteTallies, user, addEditComment } = useContext(
    NomsContext
  );
  const [restaurantInfo, setrestaurantInfo] = useState([]);
  const [commentsFormIsShown, setShowCommentsForm] = useState(false);
  const [error, setError] = useState({});
  const { goBack } = useHistory();
  const { restaurant_id } = useParams();
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
    setShowCommentsForm(false);
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
    <main style={{ padding: '2%' }}>
      {restaurantInfo.id && (
        <article className="restaurant-page-main-container">
          <Button onClick={goBack}>Go back</Button>
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
              onKeyDown={() => setShowCommentsForm(true)}
              onClick={() => setShowCommentsForm(true)}
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
                onKeyDown={() => setShowCommentsForm(true)}
                onClick={() => setShowCommentsForm(true)}
              >
                Edit Comment
              </span>
              <span
                className="comment-action"
                role="button"
                tabIndex={0}
                onKeyDown={() => setShowCommentsForm(true)}
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
    </main>
  );
};

export default NominatedRestaurantPage;
