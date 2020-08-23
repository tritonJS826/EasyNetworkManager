import React from 'react';
import PropTypes from 'prop-types';

import Terminal from 'react-bash';
import { test, clean } from '../../nodeScripts/terminalCustomCommands';
import './style.css';

function Term({
  history, className, hidden,
}) {
  const extensions = { test, clean };

  return (
    <div className={className} hidden={hidden}>
      <Terminal theme={Terminal.Themes.DARK} extensions={extensions} history={history} />
    </div>
  );
}

Term.defaultProps = {
  className: 'terminal',
  hidden: false,
};

Term.propTypes = {
  className: PropTypes.string,
  history: PropTypes.arrayOf(PropTypes.any).isRequired,
  hidden: PropTypes.bool,
};

export default Term;
