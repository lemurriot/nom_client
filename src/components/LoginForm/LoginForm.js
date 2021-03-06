import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import config from '../../config';
import './LoginForm.css';

const LoginForm = () => {
  const { goBack } = useHistory();

  return (
    <main className="page">
      <Button onClick={goBack} variant="contained" className="go-back-btn">
        Go Back
      </Button>
      <h2>You must be logged in to see this page</h2>
      <Button>
        <a href={`${config.API_ENDPOINT}/auth/google-oauth`}>
          Login with Google
        </a>
      </Button>
    </main>
  );
};

export default LoginForm;
