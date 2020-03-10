import config from "../config";

export const fetchUserData = async () => {
  const userData = await fetch(`${config.API_ENDPOINT}/users`, {
    method: "GET",
    credentials: "include"
  }).then(res => res.json());
  return userData;
};

export const fetchRestaurantsData = async () => {
  const restaurants = await fetch(`${config.API_ENDPOINT}/restaurants`, {
    method: "GET"
    // credentials: "include"
  }).then(res => res.json());
  return restaurants;
};

export const fetchLikesAndComments = async restaurantId => {
  const likesAndComments = await fetch(`${config.API_ENDPOINT}/restaurants/${restaurantId}`, {
    method: "GET",
    // credentials: "include"
  }).then(res => res.json());
  return likesAndComments;
};
