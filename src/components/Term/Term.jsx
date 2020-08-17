import React from 'react';
import PropTypes from 'prop-types';

import Terminal from 'react-bash';
import { test, clean } from '../../nodeScripts/terminalCustomCommands';
import './style.css';


function Term({
  pushStory,
  history,
  className,
  hidden,
}) {
  const extensions = { test, clean };
  
  return (
    <wrapper
      className={className}
      hidden={hidden}
    >
    <Terminal
      theme={Terminal.Themes.DARK}
      extensions={extensions}
      history={history}
    />
    </wrapper>
  );
}

Term.defaultProps = {
  className: 'terminal',
};

Term.propTypes = {
  className: PropTypes.string,
  // history: PropTypes.array,
};

export default Term;
