import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';
import Button from '../Button';
import style from './style.module.scss';

const WindowChangeRow = ({
  hidden, machineData, cancel, setCurrentMachines, machines,
}) => {
  const [input, setInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    ip: machineData.ip,
    hostname: machineData.hostname,
    description: machineData.description,
    login: machineData.login,
    password: machineData.password,
    port: machineData.port,
    customCommands: machineData.customCommands,
    newCommandName: 'newCommandName',
    newCommandScript: 'newCommandScript',
  });

  const handleChange = ({ target }) => {
    const { name } = target;
    const newValue = target.value;

    if (name === 'customCommands') {
      const { id } = target;

      if (newValue === '!!!') {
        const newCustomCommands = input.customCommands.filter((command) => command.id !== id);
        return setInput({ [name]: newCustomCommands });
      }

      const newCustomCommands = input.customCommands.map((command) => {
        if (command.id === id) {
          return {
            ...command,
            command: newValue,
          };
        }
        return command;
      });
      return setInput({ [name]: newCustomCommands });
    }
    return setInput({ [name]: newValue });
  };

  const onAcceptBtn = () => {
    const newCurrentMachines = machines.map((machine) => {
      if (machine.id === machineData.id) {
        return {
          id: machine.id,
          ip: input.ip,
          hostname: input.hostname,
          description: input.description,
          login: input.login,
          password: input.password,
          port: input.port,
          customCommands: input.customCommands,
        };
      }
      return machine;
    });

    setCurrentMachines(newCurrentMachines);
  };

  const onNewCommandBtn = () => {
    const newCustomCommands = [...input.customCommands, {
      id: String(input.customCommands.length),
      name: input.newCommandName,
      command: input.newCommandScript,
    }];
    setInput({ customCommands: newCustomCommands });
  };

  return (
    <div className={hidden ? style.WindowChangeRowHidden : style.WindowChangeRow}>
      <div className={style.tableRow}>
        ip:
        <Input value={input.ip} name="ip" placeholder={machineData.ip} onChange={handleChange} />
      </div>
      <div className={style.tableRow}>
        hostname:
        <Input
          value={input?.hostname ?? ''}
          name="hostname"
          placeholder={machineData.hostname}
          onChange={handleChange}
        />
      </div>
      <div className={style.tableRow}>
        description:
        <Input
          value={input.description}
          name="description"
          placeholder={machineData?.description}
          onChange={handleChange}
        />
      </div>
      <div className={style.tableRow}>
        login:
        <Input
          value={input.login}
          name="login"
          placeholder={machineData.login}
          onChange={handleChange}
        />
      </div>
      <div className={style.tableRow}>
        password:
        <Input
          value={input.password}
          name="password"
          placeholder={machineData.password}
          onChange={handleChange}
        />
      </div>
      <div className={style.tableRow}>
        port:
        <Input
          value={input.port}
          name="port"
          placeholder={machineData.port}
          onChange={handleChange}
        />
      </div>
      <div className={style.tableRow}>scripts (print &#34;!!!&#34; to del script ):</div>
      {input.customCommands?.map((command, i) => (
        <div className={style.tableRow} key={command.id}>
          {command.name}
          <Input
            value={command.command}
            name="customCommands"
            id={command.id}
            placeholder={machineData.customCommands[i]?.command}
            onChange={handleChange}
          />
        </div>
      ))}
      <div className={style.tableRow}>
        <Input value={input.newCommandName} name="newCommandName" placeholder={input.newCommandName} onChange={handleChange} />
        <Input value={input.newCommandScript} name="newCommandScript" placeholder={input.newCommandScript} onChange={handleChange} />
      </div>
      <div className={style.tableRow}>
        <Button text="accept" onClick={onAcceptBtn} />
        <Button text="create new command" onClick={onNewCommandBtn} />
        <Button text="cancel" onClick={cancel} />
      </div>
    </div>
  );
};

WindowChangeRow.defaultProps = {
  // machines: [],
  hidden: true,
};

WindowChangeRow.propTypes = {
  hidden: PropTypes.bool,
  machineData: PropTypes.objectOf(PropTypes.any).isRequired,
  cancel: PropTypes.func.isRequired,
  machines: PropTypes.arrayOf(PropTypes.object).isRequired,
  setCurrentMachines: PropTypes.func.isRequired,
};

export default WindowChangeRow;
