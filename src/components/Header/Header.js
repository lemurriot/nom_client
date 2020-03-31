import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../node_modules/gestalt/dist/gestalt.css';
import { Box } from 'gestalt';
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
  const linkStyles = { textDecoration: 'none', color: 'white' };
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
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
            <div className="brand">
              <animated.div style={logoAnimation}>
                <Box className="logo" display="inlineBlock" ref={anchorRef}>
                  <span
                    accessibilityexpanded={menuIsOpen ? 'true' : 'false'}
                    accessibilityhaspopup="true"
                    onClick={() => setMenuIsOpen(!menuIsOpen)}
                  >
                    <FontAwesomeIcon icon="hamburger" color="#bc47ca" />
                  </span>
                  {menuIsOpen && (
                    <FlyoutMenu
                      anchorRef={anchorRef.current}
                      setMenuIsOpen={setMenuIsOpen}
                      // menuIsOpen={menuIsOpen}
                    />
                  )}
                </Box>
              </animated.div>
              <Link to="/" style={{ textDecoration: 'none', height: '100%' }}>
                <h1>NomsPDX</h1>
              </Link>
            </div>
            {navLinks}
          </header>
        );
      }}
    </NomsContext.Consumer>
  );
};

export default Header;
