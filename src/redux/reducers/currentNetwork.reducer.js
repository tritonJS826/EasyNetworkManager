import {
  SET_SCAN_RANGE,
  SET_MACHINES_DATA,
} from '../actions/types/action-types';

const initialCurrentNetwork = {
  scanRange: '172.21.96.1-255',
  machines: [],
};

const currentMachineReducer = (state = initialCurrentNetwork, { type, payload }) => {
  switch (type) {
    case SET_MACHINES_DATA:
      return {
        ...state,
        machines: payload,
      };
    case SET_SCAN_RANGE:
     return {
       ...state,
       scanRange: payload,
     };
    default:
      return state;
  }
};

export default currentMachineReducer;
