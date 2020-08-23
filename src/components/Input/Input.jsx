import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

function Input({
  name,
  id,
  value,
  onChange,
  placeholder,
  className,
}) {
  return (
    <input
      className={className}
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

Input.defaultProps = {
  className: 'input',
  name: '',
  id: '',
  value: '',
  placeholder: '',
  onChange: () => {},
};

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
