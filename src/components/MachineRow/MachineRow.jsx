import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Button from '../Button';
import WindowChangeRow from '../WindowChangeRow';

import PATH from '../../constants/path';
import statuses, { colorByStatus } from '../../constants/machineStatus';
import { checkMachinesStatus } from '../../helpers/machineMethods';
import turnOnByMAC from '../../helpers/turnOnByMAC';

import store from '../../redux/redux-store';

import style from './style.module.scss';

function MachineRow({
  machineData,
  delMachine,
  resetMachineStatusById,
  setAddressOfcurrentMachine,
  setPortOfcurrentMachine,
  setLoginOfcurrentMachine,
  setPasswordOfcurrentMachine,
  setCommandToCurrentMachine,
  isDelBtnHidden,
  isSelectHidden,
  isChangeBtnHidden,
}) {
  const history = useHistory();
  const isScriptsExist = machineData?.customCommands?.length;
  const [script, setScript] = useState(
    isScriptsExist && (machineData.customCommands[0]?.script ?? ''),
  );
  const [isChangeRowHidden, setIsChangeRowHidden] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState(colorByStatus[machineData?.status] ?? 'black');

  const onSelect = ({ target: { value } }) => {
    setScript(value);
  };

  const jumpToSingleMachine = () => {
    setAddressOfcurrentMachine(machineData.ip);
    if (machineData?.port) setPortOfcurrentMachine(machineData.port);
    if (machineData?.login) setLoginOfcurrentMachine(machineData.login);
    if (machineData?.password) setPasswordOfcurrentMachine(machineData.password);
    if (machineData) setCommandToCurrentMachine(script);
    history.push(PATH.SINGLE_MACHINE);
  };

  const onDelButtun = () => {
    delMachine(machineData.id);
  };

  const onChangeBtn = () => {
    setIsChangeRowHidden(!isChangeRowHidden);
  };

  const onCheckMachineStatus = async () => {
    const status = await checkMachinesStatus([machineData]);
    resetMachineStatusById(machineData.id, status);
  };

  const onResetStatus = () => {
    resetMachineStatusById(machineData.id, statuses.unknown);
  };

  useEffect(() => {
    const subscribe = store.subscribe(() => {
      const storeMachine = store
        .getState()
        .ipTables.currentTable.machines.find((el) => el.id === machineData.id);
      setBackgroundColor(colorByStatus[storeMachine?.status] ?? 'black');
    });
    return subscribe;
  }, []);

  const onTurnOn = () => {
    turnOnByMAC(machineData?.mac);
  };

  return (
    <div className={style.machineRow} style={{ backgroundColor }}>
      <div className={style.textBlock}>
        <span className={style.text}>{machineData.hostname}</span>
        <span className={style.text}>{machineData.ip}</span>
        <span className={style.text}>{machineData.description}</span>
      </div>
      <span className={style.text}>
        {machineData?.login && machineData?.password ? 'ssh' : '- - -'}
      </span>
      <Button text="jump" onClick={jumpToSingleMachine} />
      <Button text="check" onClick={onCheckMachineStatus} hidden={isDelBtnHidden} />
      <Button text="turnOn" onClick={onTurnOn} hidden={!machineData?.mac && machineData.status !== statuses.offLine} />
      <Button text="del" onClick={onDelButtun} hidden={isDelBtnHidden} />
      <Button text="reset" onClick={onResetStatus} hidden={isDelBtnHidden} />
      {!isSelectHidden && (
        <select className={style.select} onChange={onSelect}>
          {isScriptsExist
            && machineData.customCommands.map((command) => (
              <option value={command.script} key={command.id}>
                {command.name}
              </option>
            ))}
        </select>
      )}
      <Button text="change" onClick={onChangeBtn} hidden={isChangeBtnHidden} />
      <WindowChangeRow machineData={machineData} hidden={isChangeRowHidden} cancel={onChangeBtn} />
    </div>
  );
}

MachineRow.defaultProps = {
  isDelBtnHidden: false,
  isSelectHidden: false,
  isChangeBtnHidden: false,
};

MachineRow.propTypes = {
  machineData: PropTypes.objectOf(PropTypes.any).isRequired,
  delMachine: PropTypes.func.isRequired,
  setAddressOfcurrentMachine: PropTypes.func.isRequired,
  setPortOfcurrentMachine: PropTypes.func.isRequired,
  setLoginOfcurrentMachine: PropTypes.func.isRequired,
  setPasswordOfcurrentMachine: PropTypes.func.isRequired,
  setCommandToCurrentMachine: PropTypes.func.isRequired,
  isDelBtnHidden: PropTypes.bool,
  isSelectHidden: PropTypes.bool,
  isChangeBtnHidden: PropTypes.bool,
  resetMachineStatusById: PropTypes.func.isRequired,
};

export default MachineRow;
