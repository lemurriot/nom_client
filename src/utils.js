/* eslint-disable camelcase */
export const findUserDidLike = (likesAndCommentsArr, restaurantId, userId) => {
  return likesAndCommentsArr.filter(
    ({ restaurant_id, user_id }) =>
      restaurant_id === restaurantId && user_id === userId
  );
};

export const sortRestaurants = (restaurantArr, sortBy) => {
  const now = Date.now();
  // TO DO : this methodology can be easily ported to other time intervals
  const oneMonth = 1000 * 60 * 60 * 24 * 30;
  switch (sortBy) {
    case 'ALL_TIME':
      return restaurantArr.sort((a, b) => b.vote_count - a.vote_count);
    case 'MOST_RECENT':
      return restaurantArr.sort((a, b) => {
        const dateA = new Date(a.date_nominated);
        const dateB = new Date(b.date_nominated);
        return dateB - dateA;
      });
    case 'LAST_MONTH':
      return restaurantArr
        .filter(({ date_nominated }) => {
          // Date.parse parses the date string to milliseconds from 1970
          const date = Date.parse(date_nominated);
          // date_nominated must be larger than the calculated millisecond timestamp of 30 days ago
          return date > now - oneMonth;
        })
        .sort((a, b) => b.vote_count - a.vote_count);
    case 'ALPHABETICAL':
      return restaurantArr.sort((a, b) => {
        if (a.name > b.name) return 1;
        return -1;
      });
    default:
      return restaurantArr;
  }
};
