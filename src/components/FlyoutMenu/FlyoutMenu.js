import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSpring, useTrail, animated } from 'react-spring';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../node_modules/gestalt/dist/gestalt.css';
import { Box, Button, Flyout, Text, Layer } from 'gestalt';
// import NomsContext from '../../NomsContext';
import './FlyoutMenu.css';

const FlyoutMenu = ({ anchorRef, setMenuIsOpen }) => {
  const menuAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    duration: 4000,
  });

  const linksList = [
    <Link to="/">Home</Link>,
    <Link to="/">Profile</Link>,
    <Link to="/about">About</Link>,
    <Link to="/termsandconditions">Terms and Conditions</Link>,
    <Link to="/privacypolicy">Privacy Policy</Link>,
  ];
  const config = { mass: 5, tension: 2000, friction: 200 };
  const trail = useTrail(linksList.length, {
    config,
    opacity: 1,
    x: 0,
    height: 40,
    from: { opacity: 0, x: 20, height: 0 },
  });

  return (
    <Layer className="flyout-menu--body">
      <animated.div style={menuAnimation}>
        <Flyout
          anchor={anchorRef}
          idealDirection="down"
          onDismiss={() => setMenuIsOpen(false)}
          positionRelativeToAnchor={false}
          size="lg"
        >
          <Box
            padding={3}
            display="flex"
            alignItems="center"
            direction="column"
            column={12}
          >
            <Text align="center" weight="bold">
              Lorem ipsum dolorum squeegie.
            </Text>
            <ul>
              {trail.map(({ x, height, ...rest }, index) => (
                <animated.li
                  key={linksList[index]}
                  className="flyout-menu-links--list-item"
                  onClick={() => setMenuIsOpen(false)}
                  style={{
                    ...rest,
                    transform: x.interpolate((x) => `translate3d(0,${x}px,0)`),
                  }}
                >
                  <animated.li style={{ height }}>
                    {linksList[index]}
                  </animated.li>
                </animated.li>
              ))}
            </ul>
            <Link to="/add-new-nom">
              <Button
                color="blue"
                text="Nominate a New Restaurant"
                size="sm"
                onClick={() => setMenuIsOpen(false)}
              />
            </Link>
            {/* <Box paddingX={2} marginTop={3}>
              <Button color="blue" text="Nominate a New Restaurant" size="sm" />
            </Box> */}
          </Box>
        </Flyout>
      </animated.div>
    </Layer>
  );
};

export default FlyoutMenu;
