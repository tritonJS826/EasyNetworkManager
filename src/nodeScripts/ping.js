import { pushStory } from '../redux/actions/creators/terminal';

const ping = require('ping');

const myPing = (hosts = ['172.21.96.144']) => async (dispatch) => {
  dispatch(pushStory('Ping...'));
  const config = {
    timeout: 5,
    min_reply: 5,
  };
  hosts.forEach(async (host) => {
    const probe = await ping.promise.probe(host, config);
    dispatch(
      pushStory(`
          В сети: ${probe.alive ? 'да' : 'нет'}
          -------------------
          ${probe.output}`),
    );
  });
};

export default myPing;
