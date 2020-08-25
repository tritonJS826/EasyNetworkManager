import { RESET_TERMINAL, PUSH_STORY, REWRITE_LAST_STORY } from '../actions/types/action-types';

const initialTerminal = {
  history: [],
};

const currentMachineReducer = (state = initialTerminal, { type, payload }) => {
  switch (type) {
    case REWRITE_LAST_STORY:
      return {
        ...state,
        history: [...state.history.slice(0, -1), payload],
      };
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
