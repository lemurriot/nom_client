/* eslint-disable camelcase */
import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { putNewUsername } from '../../api/routes';
import FormDialog from '../Dialog/FormDialogue';
import NomsContext from '../../NomsContext';
import AddCommentForm from '../AddCommentForm/AddCommentForm';
import './ProfilePage.css';

const ProfilePage = () => {
  const {
    user,
    username,
    nominatedRestaurants,
    likesAndComments,
    addEditComment,
    changeUsernameLocally,
  } = useContext(NomsContext);
  const { goBack } = useHistory();
  const [commentsFormIsShown, setShowCommentsForm] = useState(false);
  const [changeUsernameFormIsShown, setChangeUsernameFormIsShown] = useState(
    false
  );

  const [commentsData, setCommentsData] = useState({});

  const closeCommentsForm = () => {
    setShowCommentsForm(false);
  };

  const deleteComment = (likeId, restaurantId) => {
    addEditComment(likeId, '', restaurantId);
    handleAddEditCommentSubmit('');
  };

  const handleAddEditCommentSubmit = () => {
    closeCommentsForm();
  };

  const userDidUpvoteStore = {};

  const handleShowCommentForm = (commentData) => {
    setCommentsData({ ...commentData });
    setShowCommentsForm(true);
  };

  const handleChangeUsername = (newUsername) => {
    handleAddEditCommentSubmit();
    localStorage.setItem('username', newUsername);
    putNewUsername(newUsername, user.id);
    changeUsernameLocally(newUsername);
    setChangeUsernameFormIsShown(false);
  };

  const userNominatedRestaurants = nominatedRestaurants.filter(
    ({ nominated_by_user }) => nominated_by_user === user.id
  );

  const userNominatedRestaurantsList = userNominatedRestaurants.map(
    ({ id, name, subtitle, food_category, vote_count }) => (
      <div key={id} style={{ borderBottom: '1px solid black' }}>
        <h5>
          <Link to={`/category/${food_category}/${id}`}>{name}</Link>
        </h5>
        <h6>{subtitle}</h6>
        <div>Nominated for best {food_category}</div>
        <span>Votes: {vote_count}</span>
      </div>
    )
  );

  likesAndComments
    .filter(({ user_id }) => user_id === user.id)
    .forEach((likeObject) => {
      userDidUpvoteStore[likeObject.restaurant_id] = likeObject;
    });

  nominatedRestaurants.forEach((restaurant) => {
    if (userDidUpvoteStore[restaurant.id]) {
      userDidUpvoteStore[restaurant.id].restaurantInfo = restaurant;
    }
  });
  // console.log(userDidUpvoteStore);
  const userDidUpvoteList = Object.keys(userDidUpvoteStore).map((key) => {
    if (userDidUpvoteStore[key].restaurantInfo) {
      const {
        id,
        comment,
        restaurantInfo: {
          name,
          subtitle,
          food_category,
          vote_count,
          id: restaurantId,
        },
      } = userDidUpvoteStore[key];
      const editFormText = comment.length ? 'Edit Comment' : 'Add Comment';
      return (
        <div key={id} style={{ borderBottom: '1px solid black' }}>
          <h5>
            <Link to={`/category/${food_category}/${restaurantId}`}>
              {name}
            </Link>
          </h5>
          <h5>{subtitle}</h5>
          <div>Nominated for Best {food_category}</div>
          <div>Total Votes: {vote_count}</div>
          <div>
            {!!comment.length && <span>Your comment: "{comment}"</span>}
            <Button
              variant="outlined"
              color="primary"
              href="#text-buttons"
              onClick={() =>
                handleShowCommentForm({
                  name,
                  comment,
                  id,
                  restaurantId,
                })
              }
            >
              {editFormText}
            </Button>
          </div>
        </div>
      );
    }
    return [];
  });

  return (
    <main className="profile-page--container" style={{ padding: '2%' }}>
      <Button onClick={goBack}>Go back</Button>
      <h2>Hello {username}</h2>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setChangeUsernameFormIsShown(true)}
      >
        Change username
      </Button>
      <section
        className="user-nominated-restaurants--list"
        style={{ padding: '2%' }}
      >
        <h4>Your Restaurant Nominations</h4>
        {userNominatedRestaurantsList.length
          ? userNominatedRestaurantsList
          : 'You have not nominated any restaurants'}
      </section>
      <section className="user-did-upvote--list" style={{ padding: '2%' }}>
        <h4>You Upvoted</h4>
        {userDidUpvoteList.length
          ? userDidUpvoteList
          : 'You have not upvoted any restaurants'}
      </section>
      {commentsFormIsShown && (
        <AddCommentForm
          restaurantName={commentsData.name}
          restaurantId={commentsData.restaurantId}
          commentId={commentsData.id}
          comment={commentsData.comment}
          handleSubmit={handleAddEditCommentSubmit}
          addEditComment={addEditComment}
          closeCommentsForm={closeCommentsForm}
          deleteComment={() =>
            deleteComment(commentsData.id, commentsData.restaurantId)
          }
        />
      )}
      {changeUsernameFormIsShown && (
        <FormDialog
          open
          handleClose={() => setChangeUsernameFormIsShown(false)}
          handleSubmit={(newUsername) => handleChangeUsername(newUsername)}
        />
      )}
    </main>
  );
};

export default ProfilePage;
