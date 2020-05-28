import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NomsContext from '../../NomsContext';
import './FlyoutMenu.css';

const linksList = [
  {
    id: 1,
    path: '/',
    text: 'Home',
  },
  {
    id: 2,
    path: '/profile',
    text: 'Profile',
  },
  {
    id: 3,
    path: '/about',
    text: 'About',
  },
  {
    id: 4,
    path: '/termsandconditions',
    text: 'Terms and Conditions',
  },
  {
    id: 5,
    path: '/privacypolicy',
    text: 'Privacy Policy',
  },
];

const linkStyles = {
  textDecoration: 'none',
};

const FlyoutMenu = () => {
  const [open, setOpen] = useState(false);
  const { uniqueCategories } = useContext(NomsContext);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <div className="burger flex-container--centered">
          <FontAwesomeIcon icon={faHamburger} color="white" />
        </div>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal={false}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <div className="menuList-container">
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <h4 className="roboto">Pages</h4>
                    {linksList.map((link, index) => (
                      <MenuItem key={link.id} onClick={handleClose}>
                        <Link style={linkStyles} to={linksList[index].path}>
                          {linksList[index].text}
                        </Link>
                      </MenuItem>
                    ))}
                    <h4 className="roboto">Categories</h4>
                    {uniqueCategories.map((category) => (
                      <MenuItem key={category} onClick={handleClose}>
                        <Link style={linkStyles} to={`/category/${category}`}>
                          {category}
                        </Link>
                      </MenuItem>
                    ))}
                    <MenuItem key="new" onClick={handleClose}>
                      <Button variant="contained" color="primary">
                        <Link
                          size="small"
                          style={{
                            ...linkStyles,
                            color: 'white',
                            padding: '0 3%',
                          }}
                          to="/add-new-nom"
                        >
                          Nominate a New Restaurant
                        </Link>
                      </Button>
                    </MenuItem>
                  </MenuList>
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default FlyoutMenu;
