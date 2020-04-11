/* eslint-disable camelcase */
import { portlandZipCodes } from './constants/portlandGeoConstants';

export const findUserDidLike = (likesAndCommentsArr, restaurantId, userId) => {
  return likesAndCommentsArr.filter(
    ({ restaurant_id, user_id }) =>
      restaurant_id === restaurantId && user_id === userId
  );
};

export const generateUniqueCategoriesArray = (restaurantArr) => {
  const categoryList = restaurantArr.map(
    (restaurant) => restaurant.food_category
  );
  const uniqueCategories = new Set(categoryList);
  return Array.from(uniqueCategories);
};

export const generateVoteTallies = (restaurantArr) => {
  const voteTallyObj = {};
  restaurantArr.forEach((restaurant) => {
    voteTallyObj[restaurant.id] = Number(restaurant.vote_count);
  });
  return voteTallyObj;
};

export const sortRestaurants = (restaurantArr, voteTallies, sortBy) => {
  const now = Date.now();
  // TO DO : this methodology can be easily ported to other time intervals
  // As the app develops over time, currently there is no need for 'past year' 'past week' intervals, et al
  const oneMonth = 1000 * 60 * 60 * 24 * 30;
  switch (sortBy) {
    case 'All Time':
      return restaurantArr.sort((a, b) => {
        if (voteTallies[b.id] > voteTallies[a.id]) return 1;
        return -1;
      });
    case 'Most Recent':
      return restaurantArr.sort((a, b) => {
        const dateA = new Date(a.date_nominated);
        const dateB = new Date(b.date_nominated);
        return dateB - dateA;
      });
    case 'Last Month':
      return restaurantArr
        .filter(({ date_nominated }) => {
          // Date.parse parses the date string to milliseconds from 1970
          const date = Date.parse(date_nominated);
          // date_nominated must be larger than the calculated millisecond timestamp of 30 days ago
          return date > now - oneMonth;
        })
        .sort((a, b) => {
          if (voteTallies[b.id] > voteTallies[a.id]) return 1;
          return -1;
        });
    case 'Alphabetical':
      return restaurantArr.sort((a, b) => {
        if (a.name > b.name) return 1;
        return -1;
      });
    default:
      return restaurantArr;
  }
};

export const validateZipCode = (zipCode) => {
  if (Number(zipCode) < 99000 && Number(zipCode > 96999)) {
    return true;
  }
  return false;
};
