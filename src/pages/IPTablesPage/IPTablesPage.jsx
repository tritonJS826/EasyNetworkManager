import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import machineStatus from '../../constants/machineStatus';

import style from './style.module.scss';
import Button from '../../components/Button';
import MachinesTable from '../../components/MachinesTable';
import WindowChangeTable from '../../components/WindowChangeTable';
import {
  readFileSync, delFile, rewriteFile, appendFile,
} from '../../nodeScripts/tables';
import newDataId from '../../helpers/newDataId';
import sortMachines from '../../helpers/sortMachines';
import {
  checkMachinesStatus,
  setMachineStatus,
  machineMergeByIp,
  machineCanonization,
} from '../../helpers/machineMethods';

function IPTablesPage({
  tables,
  currentTable,
  setIpTables,
  setCurrentIpTable,
  setCurrentMachines,
  resetTables,
  quickScan,
  // currentNetwork,
}) {
  const [isWindowChangeTableHidden, setIsWindowChangeTableHidden] = useState(true);
  const toggleWindowChangeTableHidden = () => setIsWindowChangeTableHidden(!isWindowChangeTableHidden);

  const [sortBy, setSortBy] = useState('ip');

  const sortByIp = () => {
    if (sortBy === 'ip') return setSortBy('reverse');
    return setSortBy('ip');
  };
  const sortByHostName = () => {
    if (sortBy === 'hostName') return setSortBy('reverse');
    return setSortBy('hostName');
  };
  const sortByAccess = () => {
    if (sortBy === 'access') return setSortBy('reverse');
    return setSortBy('access');
  };
  const sortByStatus = () => {
    if (sortBy === 'status') return setSortBy('reverse');
    return setSortBy('status');
  };

  useEffect(() => {
    const sortedMachines = sortMachines(currentTable.machines, sortBy);
    setCurrentMachines(sortedMachines);
  }, [sortBy, setCurrentMachines]);

  useEffect(() => {
    const readingTables = readFileSync('tables.json');
    setIpTables(readingTables.tables);
  }, [setIpTables]);

  const onSetCurrentTable = (tableFile) => {
    const newCurrentTable = readFileSync(tableFile);
    setCurrentIpTable(newCurrentTable);
  };

  const isTablesExist = tables.length;

  const tablesNavigation = tables.map((table) => (
    <Button
      key={`${table.name}`}
      text={table.name}
      onClick={() => onSetCurrentTable(table.file)}
      pressed={table.name === currentTable.name}
    />
  ));

  const isMachineExist = () => currentTable?.machines?.length !== 0;

  const onAddMachineBtn = () => {
    const newMachine = {
      id: newDataId(),
      ip: '',
      login: '',
      password: '',
      port: '',
      customCommands: [],
    };
    setCurrentMachines([...currentTable.machines, newMachine]);
  };

  const onSaveChangesBtn = () => {
    const currentTableFile = tables.find((table) => table.id === currentTable.id).file;
    rewriteFile(currentTableFile, JSON.stringify({ ...currentTable }));
  };

  const onDelTableBtn = () => {
    const newTables = tables.filter(({ id }) => id !== currentTable.id);
    const table = tables.find(({ id }) => id === currentTable.id);
    const { file } = table;
    resetTables();
    setIpTables(newTables);
    rewriteFile('tables.json', JSON.stringify({ tables: newTables }));
    delFile(file);
  };

  const onAddTableBtn = () => {
    const id = newDataId();
    const newTables = [
      ...tables,
      {
        id,
        file: `./new${id}.json`,
        name: `new${id}`,
      },
    ];
    rewriteFile('tables.json', JSON.stringify({ tables: newTables }));

    appendFile(
      `./new${id}.json`,
      JSON.stringify({
        name: `new${id}`,
        id,
        description: 'select the table you want',
        ipRange: '',
        machines: [],
      }),
    );

    setIpTables(newTables);
  };

  const onCheckTable = async () => {
    const { machines } = currentTable;

    // const machinesIp = machines.map(({ ip }) => ip);
    const statuses = await checkMachinesStatus(machines);

    console.log(statuses);
    const newMachines = machines.map((machine, i) => setMachineStatus(machine, statuses[i]));

    setCurrentMachines(newMachines);
  };

  const onCheckTableWithinNetwork = () => {
    const scanCallback = async (machines) => {
      const machinesTable = currentTable.machines;
      const machinesScanerRaw = machineCanonization(machines);

      const machinesScaner = machinesScanerRaw
        .map((el) => setMachineStatus(el, machineStatus.newOnline));
      const allMachines = machineMergeByIp(machinesTable, machinesScaner);

      const statuses = await checkMachinesStatus(allMachines);
      const newMachines = allMachines.map((machine, i) => setMachineStatus(machine, statuses[i]));

      setCurrentIpTable({ ...currentTable, machines: [...newMachines] });
    };

    quickScan(currentTable.ipRange, scanCallback);
  };

  return (
    <>
      {tablesNavigation}
      <Button text="+" onClick={onAddTableBtn} />
      <br />
      <span className={style.text}>{currentTable.name}</span>
      <br />
      <span className={style.text}>{currentTable.description}</span>
      <br />
      <span className={style.text}>{currentTable.ipRange}</span>
      <br />
      {isMachineExist() && (
        <>
          <Button text="sort by ip" onClick={sortByIp} />
          <Button text="sort by hostName" onClick={sortByHostName} />
          <Button text="sort by access" onClick={sortByAccess} />
          <Button text="sort by status" onClick={sortByStatus} />
        </>
      )}
      <MachinesTable machines={currentTable.machines} />
      {isMachineExist() && (
        <>
          <Button text="save changes" onClick={onSaveChangesBtn} />
          <Button text="check table" onClick={onCheckTable} />
          <Button text="check table within network" onClick={onCheckTableWithinNetwork} />
        </>
      )}
      <br />
      {isTablesExist && (
        <>
          <Button text="add machine" onClick={onAddMachineBtn} />
          <Button text="change table data" onClick={toggleWindowChangeTableHidden} />
          <Button text="del table" onClick={onDelTableBtn} />
          <WindowChangeTable
            hidden={isWindowChangeTableHidden}
            cancel={toggleWindowChangeTableHidden}
          />
        </>
      )}
    </>
  );
}

IPTablesPage.defaultProps = {};

IPTablesPage.propTypes = {
  tables: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentTable: PropTypes.objectOf(PropTypes.any).isRequired,
  setIpTables: PropTypes.func.isRequired,
  setCurrentIpTable: PropTypes.func.isRequired,
  setCurrentMachines: PropTypes.func.isRequired,
  resetTables: PropTypes.func.isRequired,
  quickScan: PropTypes.func.isRequired,
  currentNetwork: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default IPTablesPage;
