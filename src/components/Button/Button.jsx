import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

function Button({
  className,
  text,
  onClick,
  pressed,
  hidden,
}) {
  if (hidden) return null;
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
  hidden: false,
};

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  pressed: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  hidden: PropTypes.bool,
};

export default Button;
