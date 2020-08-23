import { connect } from 'react-redux';

import MachineRow from './MachineRow';

// import { pushStory } from '../../redux/actions/creators/terminal';
import {
  setAddressOfcurrentMachine,
  setPortOfcurrentMachine,
  setLoginOfcurrentMachine,
  setPasswordOfcurrentMachine,
  setCommandToCurrentMachine,
} from '../../redux/actions/creators/currentMachine';

import { delMachine } from '../../redux/actions/creators/ipTables';

const mapStateToProps = ({ terminal: { history } }) => ({ history });

const mapDispatchToProps = {
  setAddressOfcurrentMachine,
  setPortOfcurrentMachine,
  setLoginOfcurrentMachine,
  setPasswordOfcurrentMachine,
  setCommandToCurrentMachine,
  delMachine,
};

export default connect(mapStateToProps, mapDispatchToProps)(MachineRow);
