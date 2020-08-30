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
} from '../types/action-types';

export const decreaseProcessCounter = () => ({
  type: DECREASE_PROCESS_COUNTER,
});
export const increaseProcessCounter = () => ({
  type: INCREASE_PROCESS_COUNTER,
});

export const setCommandToCurrentMachine = (command) => ({
  type: SET_COMMAND_TO_CURRENT_MACHINE,
  payload: command,
});
export const resetCurrentMachine = () => ({
  type: RESET_INITIAL_CURRENT_MACHINE,
});

export const setCurrentMachine = () => ({
  type: SET_CURRENT_MACHINE,
});

export const setAddressOfcurrentMachine = (address) => ({
  type: SET_ADDRESS_OF_CURRENT_MACHINE,
  payload: address,
});

export const setPortOfcurrentMachine = (port) => ({
  type: SET_PORT_OF_CURRENT_MACHINE,
  payload: port,
});

export const setLoginOfcurrentMachine = (login) => ({
  type: SET_LOGIN_OF_CURRENT_MACHINE,
  payload: login,
});

export const setPasswordOfcurrentMachine = (password) => ({
  type: SET_PASSWORD_OF_CURRENT_MACHINE,
  payload: password,
});
