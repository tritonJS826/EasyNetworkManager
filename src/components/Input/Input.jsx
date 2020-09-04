import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';

function Input({
  name,
  id,
  value,
  onChange,
  placeholder,
}) {
  return (
    <input
      className={style.input}
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

Input.defaultProps = {
  name: '',
  id: '',
  value: '',
  placeholder: '',
  onChange: () => {},
};

Input.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
