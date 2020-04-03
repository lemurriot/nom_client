import React from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { makeStyles } from '@material-ui/core/styles';

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
];

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   paper: {
//     marginRight: theme.spacing(2),
//   },
// }));

const FlyoutMenu = () => {
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

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
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <FontAwesomeIcon
          icon="hamburger"
          color="#bc47ca"
          style={{ fontSize: 50 }}
        />
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
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {linksList.map((link, index) => (
                    <MenuItem key={link.id} onClick={handleClose}>
                      <Link to={linksList[index].path}>
                        {linksList[index].text}
                      </Link>
                    </MenuItem>
                  ))}
                  <MenuItem key="new" onClick={handleClose}>
                    <Button variant="contained" color="primary">
                      <Link to="/add-new-nom">Nominate a New Restaurant</Link>
                    </Button>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default FlyoutMenu;
