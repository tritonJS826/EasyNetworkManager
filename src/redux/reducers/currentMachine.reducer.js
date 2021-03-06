import {
  RESET_INITIAL_CURRENT_MACHINE,
  SET_CURRENT_MACHINE,
  SET_ADDRESS_OF_CURRENT_MACHINE,
  SET_PORT_OF_CURRENT_MACHINE,
  SET_LOGIN_OF_CURRENT_MACHINE,
  SET_PASSWORD_OF_CURRENT_MACHINE,
  SET_COMMAND_TO_CURRENT_MACHINE,
  DECREASE_PROCESS_COUNTER,
  INCREASE_PROCESS_COUNTER,
} from '../actions/types/action-types';

const initialCurrentMachine = {
  processCounter: 0,
  address: '172.21.96.50',
  port: '22',
  login: 'admin',
  password: 'admin',
  command: 'cat index_default.html',
};

const currentMachineReducer = (state = initialCurrentMachine, { type, payload }) => {
  switch (type) {
    case DECREASE_PROCESS_COUNTER:
      return {
        ...state,
        processCounter: state.processCounter - 1,
      };
    case INCREASE_PROCESS_COUNTER:
      return {
        ...state,
        processCounter: state.processCounter + 1,
      };
    case SET_CURRENT_MACHINE:
      return {
        ...state,
        address: payload.address,
        port: payload.port,
        login: payload.login,
        password: payload.password,
      };
    case SET_ADDRESS_OF_CURRENT_MACHINE:
      return {
        ...state,
        address: payload,
      };
    case SET_PORT_OF_CURRENT_MACHINE:
      return {
        ...state,
        port: payload,
      };
    case SET_LOGIN_OF_CURRENT_MACHINE:
      return {
        ...state,
        login: payload,
      };
    case SET_PASSWORD_OF_CURRENT_MACHINE:
      return {
        ...state,
        password: payload,
      };
    case SET_COMMAND_TO_CURRENT_MACHINE:
      return {
        ...state,
        command: payload,
      };
    case RESET_INITIAL_CURRENT_MACHINE:
      return initialCurrentMachine;
    default:
      return state;
  }
};

export default currentMachineReducer;
