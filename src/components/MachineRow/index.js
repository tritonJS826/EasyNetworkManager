import { connect } from 'react-redux';

import MachineRow from './MachineRow';

import {
  setAddressOfcurrentMachine,
  setPortOfcurrentMachine,
  setLoginOfcurrentMachine,
  setPasswordOfcurrentMachine,
  setCommandToCurrentMachine,
} from '../../redux/actions/creators/currentMachine';

import { delMachine, resetMachineStatusById } from '../../redux/actions/creators/ipTables';

const mapStateToProps = ({ terminal: { history } }) => ({ history });

const mapDispatchToProps = {
  setAddressOfcurrentMachine,
  setPortOfcurrentMachine,
  setLoginOfcurrentMachine,
  setPasswordOfcurrentMachine,
  setCommandToCurrentMachine,
  delMachine,
  resetMachineStatusById,
};

export default connect(mapStateToProps, mapDispatchToProps)(MachineRow);
