import React from 'react';
import PropTypes from 'prop-types';

import MachineRow from '../MachineRow';
import style from './style.module.css';

const MachinesTable = ({
  machines, isDelBtnHidden, isSelectHidden, isChangeBtnHidden,
}) => {
  const machinesTable = machines.map((machineData) => (
    <MachineRow
      machineData={machineData}
      key={machineData.id}
      isDelBtnHidden={isDelBtnHidden}
      isSelectHidden={isSelectHidden}
      isChangeBtnHidden={isChangeBtnHidden}
    />
  ));

  return (
    <div className={style.machinesTable}>
      <span>
        total machines in table:
        {machines.length}
      </span>
      {machinesTable}
    </div>
  );
};

MachinesTable.defaultProps = {
  machines: [],
  isDelBtnHidden: false,
  isSelectHidden: false,
  isChangeBtnHidden: false,
};

MachinesTable.propTypes = {
  machines: PropTypes.arrayOf(PropTypes.object),
  isDelBtnHidden: PropTypes.bool,
  isSelectHidden: PropTypes.bool,
  isChangeBtnHidden: PropTypes.bool,
};

export default MachinesTable;
