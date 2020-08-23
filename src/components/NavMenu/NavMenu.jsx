import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import PATH from '../../constants/path';
import Button from '../Button';
import {
  readFileSync,
  initialization,
} from '../../nodeScripts/tables';

const NavMenu = ({ setIpTables }) => {
  useEffect(() => {
    initialization();
    const readingTables = readFileSync('tables.json');
    setIpTables(readingTables.tables);
  }, [setIpTables]);

  return (
    <div className="nav-menu">
      <NavLink to={PATH.SINGLE_MACHINE}>
        <Button text="SINGLE_MACHINE" onClick={() => {}} />
      </NavLink>

      <NavLink to={PATH.CURRENT_NETWORK}>
        <Button text="CURRENT_NETWORK" onClick={() => {}} />
      </NavLink>

      <NavLink to={PATH.IP_TABLES}>
        <Button text="IP_TABLES" onClick={() => {}} />
      </NavLink>
    </div>
  );
};

NavMenu.defaultProps = {
  // navBarState: false,
};

NavMenu.propTypes = {
  setIpTables: PropTypes.func.isRequired,
  // toggleNav: PropTypes.func.isRequired,
  // navBarState: PropTypes.bool,
  // setGameName: PropTypes.func.isRequired,
};

export default NavMenu;
