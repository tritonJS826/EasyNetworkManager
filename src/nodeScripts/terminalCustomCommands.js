import { resetTerminal } from '../redux/actions/creators/terminal';
import store from '../redux/redux-store';

export const test = {
  exec: ({ structure, history, cwd }, command) => {
    console.log(cwd);
    history.push({ value: 'test1' });
    history.push({ value: 'test2' });
    alert('test');
    return { structure: '123', cwd, history };
  },
};

export const clean = {
  exec: ({ structure, history, cwd }, command) => {
    const clearHistory = [];
    store.dispatch(resetTerminal());
    return { structure, cwd, clearHistory };
  },
};
