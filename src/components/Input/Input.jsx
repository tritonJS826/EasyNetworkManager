import React from 'react';
import PropTypes from 'prop-types';

import './style.css';


function Input({
  value,
  onChange,
  placeholder,
  className,
}) {
  return (
    <input
      className={className}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

Input.defaultProps = {
  pressed: false,
  className: 'input',
};

Input.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
