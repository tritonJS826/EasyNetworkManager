import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";


import Button from '../Button';

import PATH from '../../constants/path';

import style from './style.module.scss';

function MachineRow({
  machineData,
  setAddressOfcurrentMachine,
}) {
  const history = useHistory();

  const jumpToSingleMachine = () => {
    setAddressOfcurrentMachine(machineData.ip);
    history.push(PATH.SINGLE_MACHINE);
  };

  return (
    <div className={style.machineRow}>
      <div className={style.textBlock}>
        <span className={style.text}>{machineData.hostname}</span>
        <span className={style.text}>{machineData.ip}</span>
      </div>
      <Button
        text="jump"
        onClick={jumpToSingleMachine}
      />
    </div>
  );
}

MachineRow.defaultProps = {
};

MachineRow.propTypes = {
  machineData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MachineRow;
