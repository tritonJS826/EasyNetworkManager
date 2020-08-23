import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Term from '../../components/Term';
import Input from '../../components/Input';
import Button from '../../components/Button';
import MachinesTable from '../../components/MachinesTable';

import newDataId from '../../helpers/newDataId';
import { rewriteFile, appendFile, readFileSync } from '../../nodeScripts/tables';

import PATH from '../../constants/path';

import './style.css';

function CurrentNetworkPage({
  quickScan,
  detailedScan,
  autodetectionIP,
  tables,
  setScanRange,
  setMachinesData,
  scanRange,
  machines,
  setIpTables,
  setCurrentIpTable,
}) {
  const history = useHistory();
  const [tableName, setTableName] = useState('table name');
  const [isTermVisible, setTermVisible] = useState(true);
  const [isTableVisible, setTableVisible] = useState(false);

  const onPressMachinesData = () => {
    setMachinesData([]);
  };

  const onChangeTableName = ({ target: { value } }) => {
    setTableName(value);
  };

  const onTermVisibleChange = () => {
    setTermVisible(!isTermVisible);
  };

  const onTableVisibleChange = () => {
    setTableVisible(!isTableVisible);
  };

  const onInputChange = ({ target: { value } }) => {
    setScanRange(value);
  };

  const onQuickScanButton = () => {
    quickScan(scanRange);
  };

  const onDetailedScanButton = () => {
    detailedScan(scanRange);
  };

  const onAutodetectionButton = () => {
    autodetectionIP();
  };

  const onSaveBtn = () => {
    const readingTables = readFileSync('tables.json');
    setIpTables(readingTables.tables);

    const id = newDataId();
    const newTables = [
      ...tables,
      {
        id,
        file: `./${tableName}.json`,
        name: `${tableName}`,
      },
    ];

    rewriteFile('tables.json', JSON.stringify({ tables: newTables }));

    const canonicMachines = machines.map((machine, i) => ({
      id: `${tableName}${i}`,
      ip: machine.ip,
      hostname: machine?.hostname,
      description: '',
      login: '',
      password: '',
      port: '',
      customCommands: [
        {
          id: '0',
          name: 'example',
          command: 'ls',
        },
      ],
    }));

    const newCurrentTable = {
      id,
      name: `${tableName}`,
      description: 'select the table you want',
      ipRange: scanRange,
      machines: [...canonicMachines],
    };

    setCurrentIpTable(newCurrentTable);

    appendFile(
      `./${tableName}.json`,
      JSON.stringify(newCurrentTable),
    );

    setIpTables(newTables);

    history.push(PATH.IP_TABLES);
  };

  return (
    <>
      <Button text="autodetection" onClick={onAutodetectionButton} />
      <Input
        value={scanRange}
        placeholder="scan range (172.21.96.1-255)"
        onChange={onInputChange}
      />
      <Button text="quick scan" onClick={onQuickScanButton} />
      <Button text="detailed scan" onClick={onDetailedScanButton} />
      <br />
      <Button text="terminal" onClick={onTermVisibleChange} pressed={isTermVisible} />
      <Button text="table" onClick={onTableVisibleChange} pressed={isTableVisible} />
      <br />
      <Term className="terminal" hidden={isTermVisible} />
      <div hidden={isTableVisible}>
        <MachinesTable
          machines={machines}
          isDelBtnHidden
          isSelectHidden
          isChangeBtnHidden
        />
        <div>
          <Button text="clean table" onClick={onPressMachinesData} />
          <Input value={tableName} placeholder="table name" onChange={onChangeTableName} />
          <Button text="save table" onClick={onSaveBtn} />
        </div>
      </div>
    </>
  );
}

CurrentNetworkPage.defaultProps = {};

CurrentNetworkPage.propTypes = {
  quickScan: PropTypes.func.isRequired,
  detailedScan: PropTypes.func.isRequired,
  autodetectionIP: PropTypes.func.isRequired,
  tables: PropTypes.arrayOf(PropTypes.any).isRequired,
  setScanRange: PropTypes.func.isRequired,
  setMachinesData: PropTypes.func.isRequired,
  scanRange: PropTypes.string.isRequired,
  machines: PropTypes.arrayOf(PropTypes.any).isRequired,
  setIpTables: PropTypes.func.isRequired,
  setCurrentIpTable: PropTypes.func.isRequired,
};

export default CurrentNetworkPage;
