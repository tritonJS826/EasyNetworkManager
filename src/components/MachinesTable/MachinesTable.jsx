import React from 'react';
import PropTypes from 'prop-types';

// import { test, clean } from '../../nodeScripts/terminalCustomCommands';
import MachineRow from '../MachineRow'
import style from './style.module.css';

function MachinesTable({
  machines,
}) {
  const machinesTable = machines.map((machineData, ind)=>{
    return (
      <MachineRow
        machineData={machineData}
        key={ind}
      />
    )
  });

  return (
    <div className={style.machinesTable}>
      <span>total machines in table: {machines.length}</span>
      {machinesTable}
    </div>
  );
}

MachinesTable.defaultProps = {
  className: 'terminal',
};

MachinesTable.propTypes = {
  className: PropTypes.string,
  machines: PropTypes.arrayOf(PropTypes.object),
  // history: PropTypes.array,
};

export default MachinesTable;
