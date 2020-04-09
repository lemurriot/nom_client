import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useSpring, animated } from 'react-spring';
import FlyoutMenu from '../FlyoutMenu/FlyoutMenu';
import config from '../../config';
import NomsContext from '../../NomsContext';
import './Header.css';

const Header = () => {
  const logoAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    // duration: 4000,
  });
  const { user } = useContext(NomsContext);
  const linkStyles = { textDecoration: 'none', color: 'white' };
  const loginLink = (
    <a
      style={linkStyles}
      href={`${config.API_ENDPOINT}/auth/google-oauth`}
      className="login-btn google-oauth-btn"
    >
      <Button variant="contained" color="primary">
        Login with Google
      </Button>
    </a>
  );

  const logoutLink = (
    <a style={linkStyles} href={`${config.API_ENDPOINT}/auth/logout`}>
      <Button>Logout</Button>
    </a>
  );

  const navLinks = user.id ? logoutLink : loginLink;

  return (
    <header className="header">
      <div className="brand">
        <animated.div style={logoAnimation}>
          <div className="logo">
            <FlyoutMenu />
          </div>
        </animated.div>
        <Link to="/" style={{ textDecoration: 'none', height: '100%' }}>
          <h1>NomsPDX</h1>
        </Link>
      </div>
      <nav>{navLinks}</nav>
    </header>
  );
};

export default Header;
