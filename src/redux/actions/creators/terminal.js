import {
  PUSH_STORY,
  RESET_TERMINAL,
} from '../types/action-types';

export const resetTerminal = () => ({
  type: RESET_TERMINAL,
});

export const pushStory = (story) => ({
  type: PUSH_STORY,
  payload: { value: story },
});
