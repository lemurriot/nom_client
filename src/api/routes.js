import config from '../config';

export const fetchUserData = async () => {
  const userData = await fetch(`${config.API_ENDPOINT}/users`, {
    method: 'GET',
    credentials: 'include',
  }).then((res) => res.json());
  return userData;
};

export const fetchRestaurantsData = async () => {
  const restaurants = await fetch(`${config.API_ENDPOINT}/restaurants`, {
    method: 'GET',
    // credentials: "include"
  }).then((res) => res.json());
  return restaurants;
};

export const fetchAllLikesAndComments = async () => {
  const likesAndComments = await fetch(
    `${config.API_ENDPOINT}/restaurants/likes`,
    {
      method: 'Get',
    }
  ).then((res) => res.json());
  return likesAndComments;
};

export const fetchLikesAndComments = async (restaurantId) => {
  const likesAndComments = await fetch(
    `${config.API_ENDPOINT}/restaurants/likes/${restaurantId}`,
    {
      method: 'GET',
      // credentials: "include"
    }
  ).then((res) => res.json());
  return likesAndComments;
};

export const postNewUpvote = async (userId, restaurantId) => {
  const upvoteConfirmation = await fetch(`${config.API_ENDPOINT}/upvotes`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      restaurantId,
    }),
  }).then((res) => res.json());
  return upvoteConfirmation.newUpvoteObject[0];
};

export const deleteUpvote = async (userId, restaurantId) => {
  const deleteConfirmation = await fetch(`${config.API_ENDPOINT}/upvotes`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      restaurantId,
    }),
  }).then((res) => res.json());
  return deleteConfirmation;
};

export const patchComment = async (
  commentId,
  updatedComment,
  userId,
  restaurantId
) => {
  const addEditCommentConfirmation = await fetch(
    `${config.API_ENDPOINT}/comments`,
    {
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
    }
  ).then((res) => res.json());
  return addEditCommentConfirmation;
};

export const postNewRestaurant = async (
  restaurant_name,
  food_category,
  subtitle,
  address,
  googleid,
  nominated_by_user,
  comment = ''
) => {
  const postNewRestaurantConfirmation = await fetch(
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
  ).then((res) => res.json());
  console.log(postNewRestaurantConfirmation);
  return postNewRestaurantConfirmation;
};
