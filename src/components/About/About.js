import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./About.css";

export default function About(props) {
  return (
    <>
      <Header {...props} loggedIn={props.loggedIn} onLogout={props.onLogout} />
      <Link to="/">Go back</Link>
      <main className="about-main-container">
        <h2>Hello! Welcome to NomsPDX</h2>
        <article>
          <p>
            This is a very basic static version of what will, over time, become
            a bigger better app.
          </p>
          <p>
            The idea is: You, the user, can nominate a new restaurant for being
            really really awesome in a category. You can also vote on someone
            else's nomination.
          </p>
          <p>
            Right now, there's only three categories - Burgers, Burritos and
            Falafels. Also, the vision of the app will be for it to be
            city-centric. I live in Portland, Oregon, so the first version
            intends on being a voting platform for the best of these restaurants
            in Portland. A later implementation will to expand this to other
            cities, and maybe even just base itself on "10 miles of your
            location" or something! A wild future awaits.
          </p>
          <p>
            Because this is the 'static' version, please don't take it too
            seriously. The information you put in is not saved anywhere, and if
            you refresh the page, the information will be lost forever! This is
            just the test version, the next stage is to wire it up to a database
            and implement features for authorized users.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
