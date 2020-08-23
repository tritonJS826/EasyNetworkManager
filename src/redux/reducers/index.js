import { combineReducers } from 'redux';

import currentMachineReducer from './currentMachine.reducer';
import terminalReducer from './terminal.reducer';
import currentNetworkReducer from './currentNetwork.reducer';
import ipTablesReducer from './ipTables.reducer';


const reducers = combineReducers({
  currentMachine: currentMachineReducer,
  terminal: terminalReducer,
  currentNetwork: currentNetworkReducer,
  ipTables: ipTablesReducer,
});

export default reducers;
