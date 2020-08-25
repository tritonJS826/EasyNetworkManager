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

export const pingMachines = async (hosts) => {
  const config = {
    timeout: 5,
    min_reply: 5,
  };

  const promises = hosts.map(async (host) => {
    const probe = await ping.promise.probe(host, config);
    // console.log(host.ip, probe.alive, await ping.promise.probe(host, config));
    return probe.alive;
  });

  const respond = await Promise.all(promises);
  return respond;
};

export default myPing;
