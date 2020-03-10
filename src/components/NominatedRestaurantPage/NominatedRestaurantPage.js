import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Comments from "../Comments/Comments";
import VoteButtons from "../VoteButtons/VoteButtons";
import "./NominatedRestaurantPage.css";
import { fetchLikesAndComments } from "../../api/routes";

export default function NominatedRestaurantPage(props) {
  const { restaurant_id } = props.match.params;
  const [likesAndComments, setLikesAndComments] = useState([]);

  const getLikesAndComments = useCallback(async () => {
    const response = await fetchLikesAndComments(restaurant_id)
    setLikesAndComments(response)
  }, [restaurant_id])

  useEffect(() => {
    getLikesAndComments();
  }, [getLikesAndComments]);

  console.log(likesAndComments);

  const {
    name,
    subtitle,
    address,
    category,
    comments,
    date_nominated,
    vote_count,
    // id: restaurantId
  } = likesAndComments;

  const getComments = () =>
    comments.map(({ user_name, comment, date_commented, id: commentId }) => (
      <Comments
        key={commentId}
        id={commentId}
        comment={comment}
        username={user_name}
        dateCommented={date_commented}
      />
    ));

  return (
    <>
      <Header
        {...props}
        loggedIn
        // loggedIn={props.loggedIn}
        // onLogout={props.onLogout}
      />
      {likesAndComments.id && (
        <article className="restaurant-page-main-container">
          <Link to="/">Go back</Link>
          <h2>{name}</h2>
          {subtitle && <h3>{subtitle}</h3>}
          {address && <h3>{address}</h3>}
          <VoteButtons id={restaurant_id} />
          <p>
            <span className="restaurant-page-label">Current Votes: </span>
            {vote_count}
          </p>
          <p>
            <span className="restaurant-page-label">
              Nominated for Best {category} on: {new Date(date_nominated).toDateString()}
            </span>
          </p>
          <section className="comment-section">
            <h3>Comments</h3>
            {getComments()}
          </section>
        </article>
      )};
      <Footer />
    </>
  );
}
