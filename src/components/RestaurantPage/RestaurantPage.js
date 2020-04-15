/* eslint-disable camelcase */
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Chip } from '@material-ui/core';
import { findUserDidLike } from '../../utils';
import NomsContext from '../../NomsContext';
import Comments from '../Comments/Comments';
import VoteButtons from '../VoteButtons/VoteButtons';
import './RestaurantPage.css';
import { fetchLikesAndComments } from '../../api/routes';
import AddCommentForm from '../AddCommentForm/AddCommentForm';

const RestaurantPage = () => {
  const { likesAndComments, voteTallies, user, addEditComment } = useContext(
    NomsContext
  );
  const [restaurantInfo, setrestaurantInfo] = useState([]);
  const [commentsFormIsShown, setShowCommentsForm] = useState(false);
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
  } = restaurantInfo;

  const closeCommentsForm = () => {
    setShowCommentsForm(false);
  };

  const handleAddEditCommentSubmit = async (updatedComment) => {
    await getrestaurantInfo();
    const newrestaurantInfo = { ...restaurantInfo };
    const userComment = newrestaurantInfo.comments.findIndex(
      ({ id }) => id === likeId
    );
    if (userComment !== -1) {
      newrestaurantInfo.comments[userComment].comment = updatedComment;
      setrestaurantInfo(newrestaurantInfo);
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
    <main className="page">
      {restaurantInfo.id && (
        <>
          <Button onClick={goBack} variant="contained" className="go-back-btn">
            Go back
          </Button>
          <section className="content-container page-content-container restaurant-page__container">
            <div className="restaurant-page__container-top-line flex-container--space-between">
              <div className="restaurant-page__title">
                <h2 className="montserrat">{name}</h2>
                <h3 className="restaurant-page__subtitle montserrat">
                  {address || subtitle}
                </h3>
                <Chip label={`Best ${category} Nominee`} />
              </div>
              <div className="restaurant-page__vote-btns flex-container--column">
                <VoteButtons
                  restaurantId={restaurantId}
                  userDidLike={findIfUserDidLike.length}
                  likeId={likeId}
                />
                <span className="montserrat center">
                  {findIfUserDidLike.length
                    ? 'You upvoted this!'
                    : 'Click to upvote'}
                </span>
              </div>
            </div>
            <section className="restaurant-page__secondary-info flex-container--space-between">
              <span className="restaurant-page__secondary-info--votes">
                Votes:{' '}
                <span style={{ fontSize: '1.2em' }}>{voteTallies[id]}</span>
              </span>
              <span className="restaurant-page__secondary-info--date">
                Nominated on: {new Date(dateNominated).toDateString()}
              </span>
            </section>
            <section className="restaurant-page__comments">
              <h3 className="montserrat">Comments</h3>
              <div className="restaurant-page__btn-container flex-container--space-between">
                {!!likeId && !findIfUserDidLike[0].comment.length && (
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => setShowCommentsForm(true)}
                  >
                    Add Comment
                  </Button>
                )}
                {!!likeId && !!findIfUserDidLike[0].comment.length && (
                  <>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      onClick={() => setShowCommentsForm(true)}
                    >
                      Edit Comment
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      onClick={deleteComment}
                    >
                      Delete Comment
                    </Button>
                  </>
                )}
              </div>
              {mapComments().length ? (
                mapComments()
              ) : (
                <div className="center">No Comments Yet</div>
              )}
            </section>
          </section>
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
    </main>
  );
};

export default RestaurantPage;
