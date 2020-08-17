import React from 'react';
// import PropTypes from 'prop-types';

import PATH from '../../constants/path';
import Button from '../Button';

import { NavLink } from 'react-router-dom';


const NavMenu = () => {
  return (
    <div className="nav-menu">
    <NavLink
      to={PATH.SINGLE_MACHINE}
    >
    <Button text="SINGLE_MACHINE" />
    </NavLink>

    <NavLink
      to={PATH.CURRENT_NETWORK}
    >
    <Button text="CURRENT_NETWORK" />
    </NavLink>

    <NavLink
      to={PATH.IP_TABLES}
    >
    <Button text="IP_TABLES" />
    </NavLink>
    </div>
  )


};

NavMenu.defaultProps = {
  // navBarState: false,
};

NavMenu.propTypes = {
  // toggleNav: PropTypes.func.isRequired,
  // navBarState: PropTypes.bool,
  // setGameName: PropTypes.func.isRequired,
};

export default NavMenu;
