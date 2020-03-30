import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../node_modules/gestalt/dist/gestalt.css';
import FlyoutMenu from '../FlyoutMenu/FlyoutMenu';
import { Box, Button, Flyout, Text, Layer } from 'gestalt';
import config from '../../config';
import NomsContext from '../../NomsContext';
import './Header.css';

const Header = () => {
  const linkStyles = { textDecoration: 'none', color: 'white' };
  const [openMenu, setOpenMenu] = React.useState(false);
  const anchorRef = React.useRef();

  return (
    <NomsContext.Consumer>
      {(context) => {
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
                <Box className="logo" display="inlineBlock" ref={anchorRef}>
                  <span
                    accessibilityExpanded={!!openMenu}
                    accessibilityHaspopup
                    onClick={() => setOpenMenu(!openMenu)}
                  >
                    <FontAwesomeIcon icon="hamburger" color="#bc47ca" />
                  </span>
                  {openMenu && (
                    <FlyoutMenu
                      anchorRef={anchorRef.current}
                      setOpenMenu={setOpenMenu}
                    />
                  )}
                </Box>
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
