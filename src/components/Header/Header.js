import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '../../config';
import NomsContext from '../../NomsContext';
import './Header.css';

const Header = () => {
  const linkStyles = { textDecoration: 'none', color: 'white' };
  return (
    <NomsContext.Consumer>
      {context => {
        const { user } = context;

        const loginLink = (
          <a
            style={linkStyles}
            href={`${config.API_ENDPOINT}/auth/google-oauth`}
            className="login-btn google-oauth-btn"
          >
            Login with Google
          </a>
        );

        const logoutLink = (
          <a style={linkStyles} href={`${config.API_ENDPOINT}/auth/logout`}>
            Logout
          </a>
        );

        const navLinks = user.id ? (
          <nav>
            {logoutLink}
            <Link to="/about" style={linkStyles}>
              About
            </Link>
          </nav>
        ) : (
          <nav>
            {loginLink}
            <Link to="/about" style={linkStyles}>
              About
            </Link>
          </nav>
        );

        return (
          <header className="header">
            <div>
              <div className="brand">
                <span className="logo">
                  <FontAwesomeIcon icon="hamburger" color="#bc47ca" />
                </span>
                <Link to="/" style={{ textDecoration: 'none', height: '100%' }}>
                  <h1>NomsPDX</h1>
                </Link>
              </div>
            </div>
            {/* <Link to="/"><FontAwesomeIcon icon="home" size="lg"/></Link> */}
            {navLinks}
          </header>
        );
      }}
    </NomsContext.Consumer>
  );
};

export default Header;
