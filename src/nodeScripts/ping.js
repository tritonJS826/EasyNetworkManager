import { pushStory } from '../redux/actions/creators/terminal';

const ping = require('ping');


const myPing = (hosts = ['172.21.96.144']) => {
  return async (dispatch) => {
    dispatch(pushStory('Ping...'));
    let config = {
      timeout: 5,
      min_reply: 5
    };
    hosts.forEach(async (host) => {
      console.log(host,'test1!');
      const probe = await ping.promise.probe(host, config);
      console.log(probe, 'test2!!');
      dispatch(pushStory(`
          В сети: ${probe.alive ? 'да' : 'нет'}
          -------------------
          ${probe.output}`));
      });
    }
}

export default myPing;
