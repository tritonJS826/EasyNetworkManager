import React from 'react';
import PropTypes from 'prop-types';

import './style.css';


function Button({
  className,
  text,
  onClick,
  pressed,
}) {
  return (
    <button
      className={`${className} ${pressed ? 'pressed' : ''}`}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  pressed: false,
  className: 'button',
};

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  pressed: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
