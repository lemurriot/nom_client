import React from 'react';
import { Link } from 'react-router-dom';

export default function MyReviews() {
  return (
    <>
      <main className="my-reviews-main-container">
        <Link to="/add-new-nom">
          <button className="add-new-nom btn">
            Nominate a New Restaurant!
          </button>
        </Link>
        <section className="my-noms"></section>
        <section className="my-upvotes"></section>
      </main>
    </>
  );
}
