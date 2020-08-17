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
import { detailedScan } from '../../nodeScripts/nmapQueries';


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
   detailedScan,
 };

export default connect(mapStateToProps, actionCreators)(SingleMachine);
