const findUserDidLike = (likesAndCommentsArr, restaurantId, userId) => {
  return likesAndCommentsArr.filter(
    ({ restaurant_id, user_id }) =>
      restaurant_id === restaurantId && user_id === userId
  );
};

export default findUserDidLike;
