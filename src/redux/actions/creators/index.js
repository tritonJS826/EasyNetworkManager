import { connect } from 'react-redux';

import SingleMachine from './SingleMachine';
import {
  setAddressOfcurrentMachine,
  setPortOfcurrentMachine,
  setLoginOfcurrentMachine,
  setPasswordOfcurrentMachine,
  setCommandToCurrentMachine,
 } from '../../redux/actions/creators/currentMachine';
import ping from '../../nodeScripts/ping';
import sshExecuteCommand from '../../nodeScripts/sshExecuteCommand';
import quickscan from '../../nodeScripts/nmapQueries';


const mapStateToProps = ({ currentMachine: { address, port, login, password, command} }) => ({
  address,
  port,
  login,
  password,
  command,
});

const actionCreators = {
   setAddressOfcurrentMachine,
   setPortOfcurrentMachine,
   setLoginOfcurrentMachine,
   setPasswordOfcurrentMachine,
   setCommandToCurrentMachine,
   ping,
   sshExecuteCommand,
   quickscan,
 };

export default connect(mapStateToProps, actionCreators)(SingleMachine);
