/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// set alias of component prop as 'Component' so it passes rendering criteria
// this is not a React.Component from the React library, it is a prop aliased
const ProtectedRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authenticated) {
          return <Component {...rest} {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                referrer: '/',
              },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
