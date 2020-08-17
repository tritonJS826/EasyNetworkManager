import { combineReducers } from 'redux';

import currentMachineReducer from './currentMachine.reducer';
import terminalReducer from './terminal.reducer';
import currentNetworkReducer from './currentNetwork.reducer';


const reducers = combineReducers({
  currentMachine: currentMachineReducer,
  terminal: terminalReducer,
  currentNetwork: currentNetworkReducer,
});

export default reducers;
