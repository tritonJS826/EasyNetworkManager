import {
  PUSH_STORY,
  RESET_TERMINAL,
  REWRITE_LAST_STORY,
} from '../types/action-types';

export const rewriteLastStory = (story) => ({
  type: REWRITE_LAST_STORY,
  payload: { value: story },
});

export const resetTerminal = () => ({
  type: RESET_TERMINAL,
});

export const pushStory = (story) => ({
  type: PUSH_STORY,
  payload: { value: story },
});
