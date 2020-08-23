import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import style from './style.module.scss';
import Button from '../../components/Button';
import MachinesTable from '../../components/MachinesTable';
import WindowChangeTable from '../../components/WindowChangeTable';
import {
  readFileSync, delFile, rewriteFile, appendFile,
} from '../../nodeScripts/tables';
import newDataId from '../../helpers/newDataId';
import sortMachines from '../../helpers/sortMachines';

function IPTablesPage({
  tables,
  currentTable,
  setIpTables,
  setCurrentIpTable,
  setCurrentMachines,
  resetTables,
}) {
  const [isWindowChangeTableHidden, setIsWindowChangeTableHidden] = useState(true);
  const toggleWindowChangeTableHidden = (
  ) => setIsWindowChangeTableHidden(!isWindowChangeTableHidden);

  const [sortBy, setSortBy] = useState('ip');

  const sortByIp = () => {
    if (sortBy === 'ip') return setSortBy('ipReverse');
    return setSortBy('ip');
  };
  const sortByHostName = () => {
    if (sortBy === 'hostName') return setSortBy('hostNameReverse');
    return setSortBy('hostName');
  };
  const sortByAccess = () => {
    if (sortBy === 'access') return setSortBy('accessReverse');
    return setSortBy('access');
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

  const isMachineExist = () => currentTable.machines.length !== 0;

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
        </>
      )}
      <MachinesTable machines={currentTable.machines} />
      {isMachineExist() && (
        <>
          <Button text="save changes" onClick={onSaveChangesBtn} />
          <Button text="check table" onClick={() => {}} />
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
};

export default IPTablesPage;
