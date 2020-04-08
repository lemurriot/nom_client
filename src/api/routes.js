/* eslint-disable camelcase */
import config from '../config';

export const fetchUserData = () => {
  const userData = fetch(`${config.API_ENDPOINT}/users`, {
    method: 'GET',
    credentials: 'include',
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(`${res.status} Error. Could not fetch user data`);
    })
    .catch((err) => ({
      error: true,
      message: err.message,
    }));
  return userData;
};

export const fetchRestaurantsData = () => {
  const restaurants = fetch(`${config.API_ENDPOINT}/restaurants`, {
    method: 'GET',
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(`${res.status} Error. Could not fetch restaurant data`);
    })
    .catch((err) => ({
      error: true,
      message: err.message,
    }));
  return restaurants;
};

export const fetchAllLikesAndComments = () => {
  const likesAndComments = fetch(`${config.API_ENDPOINT}/restaurants/likes`, {
    method: 'Get',
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(
        `${res.status} Error. Could not retrieve restaurant data`
      );
    })
    .catch((err) => ({
      error: true,
      message: err.message,
    }));
  return likesAndComments;
};

export const fetchLikesAndComments = (restaurantId) => {
  const likesAndComments = fetch(
    `${config.API_ENDPOINT}/restaurants/likes/${restaurantId}`,
    {
      method: 'GET',
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(
        `${res.status} Error. Could not retrieve restaurant data`
      );
    })
    .catch((err) => ({
      error: true,
      message: err.message,
    }));
  return likesAndComments;
};

export const postNewUpvote = (userId, restaurantId) => {
  const upvoteConfirmation = fetch(`${config.API_ENDPOINT}/upvotes`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      restaurantId,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Something went wrong. Upvote did not post');
    })
    .catch((err) => ({
      error: true,
      message: err.message,
    }));
  return upvoteConfirmation;
};

export const deleteUpvote = (userId, restaurantId) => {
  const deleteConfirmation = fetch(`${config.API_ENDPOINT}/upvotes`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      restaurantId,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Oops, something went wrong');
    })
    .catch((err) => ({
      error: true,
      message: err.message,
    }));
  return deleteConfirmation;
};

export const patchComment = (
  commentId,
  updatedComment,
  userId,
  restaurantId
) => {
  const addEditCommentConfirmation = fetch(`${config.API_ENDPOINT}/comments`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      restaurantId,
      commentId,
      updatedComment,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(`${res.status} Error. Could not post comment`);
    })
    .catch((err) => ({
      error: true,
      message: err.message,
    }));
  return addEditCommentConfirmation;
};

export const postNewRestaurant = (
  restaurant_name,
  food_category,
  subtitle,
  address,
  googleid,
  nominated_by_user,
  comment = ''
) => {
  const postNewRestaurantConfirmation = fetch(
    `${config.API_ENDPOINT}/restaurants`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        restaurant_name,
        food_category,
        subtitle,
        address,
        googleid,
        nominated_by_user,
        comment,
      }),
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Something went wrong. Could not post new restaurant');
    })
    .catch((err) => ({
      error: true,
      message: err.message,
    }));
  return postNewRestaurantConfirmation;
};

export const putNewUsername = (newUsername, userId) => {
  const putNewUsernameConfirmation = fetch(
    `${config.API_ENDPOINT}/users/edit-username`,
    {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        new_username: newUsername,
      }),
    }
  )
    .then((res) => {
      if (!res.ok) {
        return res.json();
      }
      return { message: 'Username updated!' };
    })
    .then((res) => res);
  return putNewUsernameConfirmation;
};
