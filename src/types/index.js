import PropTypes from 'prop-types';

const { number, string } = PropTypes;

const restaurantType = {
  id: number.isRequired,
  address: string.isRequired,
  date_nominated: string.isRequired,
  food_category: string.isRequired,
  name: string.isRequired,
  nominated_by_user: number.isRequired,
  subtitle: string.isRequired,
  vote_count: number.isRequired,
};

export default restaurantType;
