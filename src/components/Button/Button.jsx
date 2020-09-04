import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';

function Button({
  text,
  onClick,
  pressed,
  hidden,
}) {
  if (hidden) return null;
  return (
    <button
      className={`${pressed ? style.pressed : style.button}`}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: '',
  pressed: false,
  hidden: false,
};

Button.propTypes = {
  text: PropTypes.string,
  pressed: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  hidden: PropTypes.bool,
};

export default Button;
