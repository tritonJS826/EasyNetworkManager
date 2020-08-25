import React from 'react';
import PropTypes from 'prop-types';

import Term from '../../components/Term';
import Input from '../../components/Input';
import Button from '../../components/Button';
import './style.css';

function SingleMachine({
  address,
  port,
  login,
  password,
  command,
  setAddressOfcurrentMachine,
  setPortOfcurrentMachine,
  setLoginOfcurrentMachine,
  setPasswordOfcurrentMachine,
  setCommandToCurrentMachine,
  ping,
  sshExecuteCommand,
  detailedScan,
}) {
  const onChangeAddress = ({ target: { value } }) => {
    setAddressOfcurrentMachine(value);
  };
  const onChangePort = ({ target: { value } }) => {
    setPortOfcurrentMachine(value);
  };
  const onChangeLogin = ({ target: { value } }) => {
    setLoginOfcurrentMachine(value);
  };
  const onChangePassword = ({ target: { value } }) => {
    setPasswordOfcurrentMachine(value);
  };
  const onChangeCommandToCurrentMachine = ({ target: { value } }) => {
    setCommandToCurrentMachine(value);
  };

  const onPingButton = () => {
    ping([address]);
  };
  const onExecuteCommandButton = () => {
    sshExecuteCommand(command, address, port, login, password);
  };

  const onExternalStatisticButton = () => {
    detailedScan(address);
  };

  const onInternalStatistic = () => {
    const internalStatisticCommand = `id ${login} && uname -a`;
    sshExecuteCommand(internalStatisticCommand, address, port, login, password);
  };

  return (
    <>
      <br />
      <div className="flex-row">
        <Input value={address} placeholder="172.21.96.50, google.com" onChange={onChangeAddress} />
        <Input value={port} placeholder="port (22)" onChange={onChangePort} />
      </div>
      <div className="flex-row">
        <Input value={login} placeholder="login" onChange={onChangeLogin} />
        <Input value={password} placeholder="password" onChange={onChangePassword} />
      </div>
      <div className="flex-row">
        <Input
          value={command}
          placeholder="command (ls)"
          onChange={onChangeCommandToCurrentMachine}
        />
      </div>
      <div className="flex-row">
        <Button text="ping" onClick={onPingButton} />
        <Button text="external statistic" onClick={onExternalStatisticButton} />
        <Button text="SSH connect" onClick={() => {}} />
        <Button text="internal statistic (via SSH)" onClick={onInternalStatistic} />
        <Button text="execute command" onClick={onExecuteCommandButton} />
      </div>
      <Term />
    </>
  );
}

SingleMachine.defaultProps = {
  address: '172.168.21.100',
  port: '22',
  login: 'admin',
  password: '',
};

SingleMachine.propTypes = {
  address: PropTypes.string,
  port: PropTypes.string,
  login: PropTypes.string,
  password: PropTypes.string,
  command: PropTypes.string.isRequired,
  setAddressOfcurrentMachine: PropTypes.func.isRequired,
  setPortOfcurrentMachine: PropTypes.func.isRequired,
  setLoginOfcurrentMachine: PropTypes.func.isRequired,
  setPasswordOfcurrentMachine: PropTypes.func.isRequired,
  setCommandToCurrentMachine: PropTypes.func.isRequired,
  ping: PropTypes.func.isRequired,
  sshExecuteCommand: PropTypes.func.isRequired,
  detailedScan: PropTypes.func.isRequired,
};

export default SingleMachine;
