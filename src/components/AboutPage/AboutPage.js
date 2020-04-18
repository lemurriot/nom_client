import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import './AboutPage.css';

export default function About() {
  const { goBack } = useHistory();
  return (
    <main className="page">
      <Button onClick={goBack} variant="contained" className="go-back-btn">
        Go Back
      </Button>
      <section className="page-content-container content-container about-page__content-container">
        <h2 className="montserrat center about-page__title">
          Welcome to NomsPDX
        </h2>
        <article className="about-page__content">
          <h3 className="montserrat center">What is NomsPDX?</h3>
          <p className="about-page__first-paragraph">
            NomsPDX is a voting app where you upvote your favorite
            burger/pizza/coffee, et al, in Portland. Do you love a
            restaurant&apos;s burger? Give it an upvote!
          </p>
          <p>
            NomsPDX is designed to foster a positive community. No downvotes,
            either upvote or leave it be. If you don&apos;t see a restaurant,
            you can nominate a new restaurant in any category.
          </p>
        </article>
        <h3 className="montserrat center">Basic Rules</h3>
        <ul>
          <li>
            You can give an upvote to as many restaurants as you like, but you
            only get one upvote per restaurant.
          </li>
          <li>
            You can leave a comment on a restaurant&apos;s page only if you have
            upvoted the restaurant. This is designed to maintain positive
            feedback.
          </li>
          <li>
            Comments that are off-topic, overtly disrespectful, or offensive
            will be deleted.
          </li>
          <li>
            A restaurant can only be nominated once per category. However, the
            same restaurant can be nominated in a different category.
          </li>
          <li>Duplicate nominations will be either deleted or consolidated.</li>
          <li>
            Once a user nominates a restaurant, that nomination cannot be
            deleted by the user. The user can undo their upvote, but the post
            itself will remain. This is because, in theory, a restaurant can
            have a hundred votes, and it would be unfair for a user to delete
            that collection of votes.
          </li>
        </ul>
        <h3 className="montserrat center">Contact</h3>
        <p>
          NomsPDX is the creation of Kevin Boyle, a web developer in Portland,
          OR.
        </p>
        <p>
          Please reach out to me at{' '}
          <a href="mailto:omnomnom.pdx@gmail.com?Subject=Hello%20From%20Noms">
            omnomnom.pdx@gmail.com
          </a>{' '}
          with any questions/feedback/concerns. Alternatively you can visit my
          personal webpage <a href="http://pdxwebdev.io">pdxwebdev.io</a>.
        </p>
      </section>
    </main>
  );
}
