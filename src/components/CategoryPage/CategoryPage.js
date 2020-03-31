import React from 'react';
import NomsContext from '../../NomsContext';
import NominatedRestaurantPreview from '../NominatedRestaurantPreview/NominatedRestaurantPreview';
import { string, arrayOf, shape } from 'prop-types';

const CategoryPage = ({ match }) => {
  return (
    <NomsContext.Consumer>
      {({ nominatedRestaurants, voteTallies }) => {
        const category = match.params.food_category;
        const categoryRestaurants = nominatedRestaurants.filter(
          ({ food_category }) => food_category === category
        );
        const CategoryRestaurantList = categoryRestaurants.map((restaurant) => (
          <NominatedRestaurantPreview
            key={restaurant.id}
            id={restaurant.id}
            voteCount={voteTallies[restaurant.id]}
            category={restaurant.food_category}
            name={restaurant.name}
            loggedIn
            // likesAndComments={context}
          />
        ));
        return (
          <div>
            <h3>Nominated for Best {category}</h3>
            <div className="restaurant-review-preview-box">
              {CategoryRestaurantList}
            </div>
          </div>
        );
      }}
    </NomsContext.Consumer>
  );
};

export default CategoryPage;

// const CategoryReviewPreview = ({ categoryRestaurants, category }) => {
//   const [sortRestaurantsBy, setSortRestaurantsBy] = useState('ALL_TIME');
//   const sortedCategoryRestaurants = sortRestaurants(
//     categoryRestaurants,
//     sortRestaurantsBy,
//   );
//   useEffect(() => {
//     sortRestaurants(categoryRestaurants, sortRestaurantsBy);
//   }, [sortedCategoryRestaurants]);
//   return (
//     <NomsContext.Consumer>
//       {({ voteTallies }) => {
//         const sortReducers = [
//           { value: 'ALL_TIME', label: 'All Time' },
//           { value: 'MOST_RECENT', label: 'Most Recent' },
//           { value: 'LAST_MONTH', label: 'Last Month' },
//           { value: 'ALPHABETICAL', label: 'Alphabetical' },
//         ];
//         // const { voteTallies } = context;
//         const CategoryRestaurantList = sortedCategoryRestaurants
//           .slice(0, 5)
//           .map((restaurant) => (
//             <NominatedRestaurantPreview
//               key={restaurant.id}
//               id={restaurant.id}
//               voteCount={voteTallies[restaurant.id]}
//               category={restaurant.food_category}
//               name={restaurant.name}
//               loggedIn
//               // likesAndComments={context}
//             />
//           ));
//         return (
//           <section className="category-card">
//             <h3>{category} - Top 5</h3>
//             <Link to={`/category/${category}`}>See All</Link>
//             <SelectList
//               id="sort-options"
//               name="sort-options"
//               onChange={({ value }) => setSortRestaurantsBy(value)}
//               options={sortReducers}
//               placeholder="Select Sort Method"
//               label="Sort Restaurants"
//               // helperText="Sort Restaurants"
//               value={sortRestaurantsBy}
//             />
//             <div className="restaurant-review-preview-box">
//               {CategoryRestaurantList}
//             </div>
//           </section>
//         );
//       }}
//     </NomsContext.Consumer>
//   );
// };

// CategoryReviewPreview.propTypes = {
//   category: string.isRequired,
//   categoryRestaurants: arrayOf(shape(restaurantType)).isRequired,
// };

// export default CategoryReviewPreview;
