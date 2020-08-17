import {
  RESET_TERMINAL,
  PUSH_STORY,
} from '../actions/types/action-types';

const initialTerminal = {
  history: [],
};

const currentMachineReducer = (state = initialTerminal, { type, payload }) => {
  switch (type) {
    case PUSH_STORY:
     return {
       ...state,
       history: [...state.history, payload],
     };
    case RESET_TERMINAL:
      return initialTerminal;
    default:
      return state;
  }
};

export default currentMachineReducer;
