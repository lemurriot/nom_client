import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import findUserDidLike from '../../utils';
import NomsContext from '../../NomsContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Comments from '../Comments/Comments';
import VoteButtons from '../VoteButtons/VoteButtons';
import './NominatedRestaurantPage.css';
import { fetchLikesAndComments } from '../../api/routes';
import AddCommentForm from '../AddCommentForm/AddCommentForm';

const NominatedRestaurantPage = props => {
  const [restaurantInfo, setrestaurantInfo] = useState([]);
  const [commentsFormIsShown, showCommentsForm] = useState(false);
  const [error, setError] = useState({});
  const { restaurant_id } = props.match.params;
  const restaurantId = Number(restaurant_id);

  const getrestaurantInfo = useCallback(async () => {
    const response = await fetchLikesAndComments(restaurantId);
    setrestaurantInfo(response);
  }, [restaurantId]);

  useEffect(() => {
    getrestaurantInfo();
  }, [getrestaurantInfo]);

  return (
    <NomsContext.Consumer>
      {context => {
        const { likesAndComments, voteTallies, user, addEditComment } = context;
        const findIfUserDidLike = findUserDidLike(
          likesAndComments,
          restaurantId,
          user.id
        );
        const likeId = findIfUserDidLike.length
          ? findIfUserDidLike[0].id
          : null;

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

        const handleAddEditCommentSubmit = async updatedComment => {
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
            <Header
              {...props}
              loggedIn
              // loggedIn={props.loggedIn}
              // onLogout={props.onLogout}
            />
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
                {likeId && !findIfUserDidLike[0].comment.length && (
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
                {likeId && !!findIfUserDidLike[0].comment.length && (
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
            <Footer />
          </>
        );
      }}
    </NomsContext.Consumer>
  );
};

NominatedRestaurantPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      food_category: PropTypes.string.isRequired,
      restaurantId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default NominatedRestaurantPage;
