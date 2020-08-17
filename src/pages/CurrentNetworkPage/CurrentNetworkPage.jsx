import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Term from '../../components/Term';
import Input from '../../components/Input';
import Button from '../../components/Button';
import MachinesTable from '../../components/MachinesTable';

import './style.css';


function CurrentNetworkPage({
  quickScan,
  detailedScan,
  autodetectionIP,
  setScanRange,
  scanRange,
  setMachinesData,
}) {
  const [ tableName, setTableName ] = useState("table name");
  const [ isTermVisible, setTermVisible] = useState(true);
  const [ isTableVisible, setTableVisible] = useState(false)

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
    setTableVisible(!isTableVisible)
  };


  const onInputChange = ({target: { value } }) => {
    setScanRange(value);
  };

  const onQuickScanButton = () => {
    console.log('started');
    quickScan(scanRange);
    console.log('ended');
  };

  const onDetailedScanButton = () => {
    detailedScan(scanRange);
  };

  const onAutodetectionButton = async () => {
    autodetectionIP();
    };



  return (
  <>
  <Button
    text="autodetection"
    onClick={onAutodetectionButton}
  />
  <Input
    value={scanRange}
    placeholder="scan range (172.21.96.1-255)"
    onChange={onInputChange}
  />
  <Button
    text="quick scan"
    onClick={onQuickScanButton}
  />
  <Button
    text="detailed scan"
    onClick={onDetailedScanButton}
  />
  <Button
    text="terminal"
    onClick={onTermVisibleChange}
    pressed={isTermVisible}
  />
  <Button
  text="table"
  onClick={onTableVisibleChange}
  pressed={isTableVisible}
  />
  <Term
    className="terminal"
    hidden={isTermVisible}
  />
  <div
    hidden={isTableVisible}
  >
    <MachinesTable/>
  <div>
  <Button
    text="clean table"
    onClick={onPressMachinesData}
  />
  <Input
    value={tableName}
    placeholder="table name"
    onChange={onChangeTableName}
  />
  <Button
    text="save table"
    onClick={()=> alert('save')}
  />
  </div>

  </div>
  </>
  );
}

CurrentNetworkPage.defaultProps = {
  // pressed: false,
  // children: '',
};

CurrentNetworkPage.propTypes = {
  quickScan: PropTypes.func.isRequired,
  detailedScan: PropTypes.func.isRequired,
  autodetectionIP: PropTypes.func.isRequired,
  // name: PropTypes.string.isRequired,
  // children: PropTypes.element,
  // pressed: PropTypes.bool,
  // onClick: PropTypes.func.isRequired,
};

export default CurrentNetworkPage;
