import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header(props) {
  const handleLogoutClick = e => {
    e.preventDefault();
    console.log("form submitted");
    props.onLogout(e);
    props.history.push("/");
  };
  const linkStyles = { textDecoration: "none", color: "white" };
  const isLoggedIn = props.loggedIn;
  const navLinks = isLoggedIn ? (
    <nav>
      <Link to="/about" style={linkStyles}>
        About
      </Link>
      <a href="/" style={linkStyles} onClick={e => handleLogoutClick(e)}>
        Log Out
      </a>
    </nav>
  ) : (
    <nav>
      <Link to="/login" style={linkStyles}>
        Login
      </Link>
      <Link to="/register" style={linkStyles}>
        Register
      </Link>
    </nav>
  );

  return (
    <header className="header">
      <div>
        <Link to="/" style={{ textDecoration: "none", height: "0" }}>
          <div className="brand">
            <span className="logo">
              <FontAwesomeIcon icon="hamburger" color="#bc47ca" />
            </span>
            <h1>NomsPDX</h1>
          </div>
        </Link>
      </div>
      {/* <Link to="/"><FontAwesomeIcon icon="home" size="lg"/></Link> */}
      {navLinks}
    </header>
  );
}
