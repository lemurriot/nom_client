import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../node_modules/gestalt/dist/gestalt.css';
import { Box, Button, Flyout, Text, Layer } from 'gestalt';
// import NomsContext from '../../NomsContext';
import './FlyoutMenu.css';

const FlyoutMenu = ({ anchorRef, setOpenMenu }) => (
  <Layer>
    <Flyout
      anchor={anchorRef}
      idealDirection="down"
      onDismiss={() => setOpenMenu(false)}
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
        <Box paddingX={2} marginTop={3}>
          <Button color="blue" text="Nominate a New Restaurant" size="sm" />
        </Box>
      </Box>
    </Flyout>
  </Layer>
);

export default FlyoutMenu;
