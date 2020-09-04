import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';
import Button from '../Button';
import style from './style.module.scss';

import { rewriteFile, renameFile } from '../../nodeScripts/tables';

const WindowChangeTable = ({
  tables,
  currentTable,
  setCurrentIpTable,
  setIpTables,
  hidden,
  cancel,
}) => {
  const [input, setInput] = useReducer((state, newState) => ({ ...state, ...newState }), {});

  useEffect(() => {
    setInput({
      id: currentTable.id,
      name: currentTable.name,
      description: currentTable.description,
      ipRange: currentTable.ipRange,
      machines: currentTable.machines,
    });
  }, [currentTable]);

  const handleChange = ({ target }) => {
    const { name } = target;
    const newValue = target.value;

    return setInput({ [name]: newValue });
  };

  const onAcceptBtn = () => {
    const newTables = tables.map((table) => {
      setCurrentIpTable({
        ...currentTable,
        id: input.id,
        name: input.name,
        description: input.description,
        ipRange: input.ipRange,
        machines: input.machines,
      });

      if (table.id === currentTable.id) {
        const newFileName = table.file.replace(table.name, input.name);

        renameFile(table.file, newFileName);
        rewriteFile(newFileName, JSON.stringify({ ...currentTable, ...input }));

        return {
          ...table,
          name: input.name,
          file: newFileName,
        };
      }

      return table;
    });

    rewriteFile('./tables.json', JSON.stringify({ tables: newTables }));
    setIpTables(newTables);

    cancel();
  };

  return (
    <div className={hidden ? style.WindowChangeTableHidden : style.WindowChangeTable}>
      <div className={style.tableRow}>
        name:
        <Input
          value={input.name}
          name="name"
          placeholder={currentTable.name}
          onChange={handleChange}
        />
      </div>
      <div className={style.tableRow}>
        description:
        <Input
          value={input.description}
          name="description"
          placeholder={currentTable.description}
          onChange={handleChange}
        />
      </div>
      <div className={style.tableRow}>
        ipRange:
        <Input
          value={input.ipRange}
          name="ipRange"
          placeholder={currentTable.ipRange}
          onChange={handleChange}
        />
      </div>

      <div className={style.tableRow}>
        <Button text="accept" onClick={onAcceptBtn} />
        <Button text="cancel" onClick={cancel} />
      </div>
    </div>
  );
};

WindowChangeTable.defaultProps = {
  hidden: true,
};

WindowChangeTable.propTypes = {
  tables: PropTypes.arrayOf(PropTypes.any).isRequired,
  cancel: PropTypes.func.isRequired,
  hidden: PropTypes.bool,
  currentTable: PropTypes.objectOf(PropTypes.any).isRequired,
  setCurrentIpTable: PropTypes.func.isRequired,
  setIpTables: PropTypes.func.isRequired,
};

export default WindowChangeTable;
