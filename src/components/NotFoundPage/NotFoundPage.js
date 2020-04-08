import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const NotFoundPage = () => {
  const { goBack } = useHistory();
  return (
    <main className="page">
      <Button onClick={goBack}>Go Back</Button>
      <div>Oops page not found.</div>
    </main>
  );
};

export default NotFoundPage;
