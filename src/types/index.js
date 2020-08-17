import { number, string, arrayOf, shape, object, array } from 'prop-types';

export const restaurantType = {
  id: number.isRequired,
  address: string.isRequired,
  date_nominated: string.isRequired,
  food_category: string.isRequired,
  name: string.isRequired,
  nominated_by_user: number.isRequired,
  subtitle: string.isRequired,
  vote_count: number.isRequired,
};

export const googleSearchResultsShape = {
  description: string.isRequired,
  matched_substrings: arrayOf(
    shape({
      length: number.isRequired,
      offset: number.isRequired,
    })
  ),
  place_id: string.isRequired,
  reference: string.isRequired,
  structured_formatting: object,
  terms: array,
  types: arrayOf(string.isRequired).isRequired,
};
