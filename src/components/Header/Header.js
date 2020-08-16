import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import isEmpty from 'lodash.isempty';
import { useSpring, animated } from 'react-spring';
import FlyoutMenu from '../FlyoutMenu/FlyoutMenu';
import config from '../../config';
import NomsContext from '../../NomsContext';
import './Header.css';

const Header = () => {
  const logoAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    duration: 500,
  });
  const { user, username } = useContext(NomsContext);
  const { pathname } = useLocation();
  const linkStyles = { textDecoration: 'none', color: 'white' };

  const logoutLink = (
    <a style={linkStyles} href={`${config.API_ENDPOINT}/auth/logout`}>
      Logout
    </a>
  );

  return (
    <header className="header">
      <div className="header-top">
        <animated.div style={logoAnimation}>
          <div className="brand">
            <div className="logo">
              <FlyoutMenu />
            </div>
            <Link to="/" style={{ textDecoration: 'none', height: '100%' }}>
              <h1>NomsPDX</h1>
            </Link>
          </div>
        </animated.div>
        <span className="header-top__greeting">
          {!isEmpty(user) && `Hi ${username}`}
        </span>
      </div>
      <div className="header-bottom">
        <nav>
          <ul className="nav__links ul-reset roboto">
            <li
              className={
                pathname === '/' ? 'nav__link nav__link--active' : 'nav__link'
              }
            >
              <Link to="/" style={linkStyles}>
                Home
              </Link>
            </li>
            <li
              className={
                pathname === '/about'
                  ? 'nav__link nav__link--active'
                  : 'nav__link'
              }
            >
              <Link to="/about" style={linkStyles}>
                About
              </Link>
            </li>
            {!isEmpty(user) && (
              <>
                <li
                  className={
                    pathname === '/profile'
                      ? 'nav__link nav__link--active'
                      : 'nav__link'
                  }
                >
                  <Link to="/profile" style={linkStyles}>
                    Profile
                  </Link>
                </li>
                <li className="nav__link">{logoutLink}</li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
