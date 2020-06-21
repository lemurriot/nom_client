# Noms PDX

React frontend for fullstack PERN application.

Visit the site at: https://www.nomspdx.com

## About

NomsPDX is a voting app where users upvote their favorite burger/gyro/coffee, et al. It is designed to foster a positive community and ease of use. Users can nominate new restaurants for best in category, and add comments to restaurants they upvote. New users searching for, for example, the Best Burger in Portland will find this app to be an up-to-date, dynamic, reliably crowd-sourced resource. While this iteration focuses on the PDX metro area, a future version of this app will support multiple locales.

## Tech Stack

This app utilizes the PERN stack (Postgres - Express - React - Node).  
The server repo is located at https://www.github.com/lemurriot/noms-server.  
It utilizes elements from Material-UI, authentication with Google OAuth2.0, and Google Places API.
The client is hosted on now.sh, and the server is hosted on Heroku.

### Documentation

- On load, the page pings the server, which calls the database and populates the page based on the returning json.

- User authentication is handled by Google OAuth 2.0. When the user clicks to log in, they are redirected to the Google Auth URL, and the user is directed back to the site after clicking to agree. The user object that is returned to the client is composed of the user's email, display name, and user id. Authentication token is stored as a 4-hour session cookie.

- Authenticated users can interact with the page by: upvoting restaurants, removing previous upvotes, commenting on restaurants they have upvoted, changing their display name, and nominating new restaurants to available categories. Authenticated users also have access to a 'Profile' page which displays their nominations and upvotes.

- The nomination of new restaurants involves a series of controlled forms. After selecting a category, a user can search for restaurants which returns a list of restaurants within a 10-mile radius of Portland, Oregon. The list is populated by the Google Places API, which is filtered for eatery types only. If a user does not see their desired restaurant they have the option to custom add a restaurant.

- The forms are made via the Formik library with validation by Yup. Much UI utilizes Material UI components. State management is handled by the Context API.

### Contact

Please contact Kevin Boyle with any feedback at boyle.kevin.michael@gmail.com.

#### Copyright

Copyright Kevin Boyle 2020
