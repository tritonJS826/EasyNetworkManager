import { pushStory } from '../redux/actions/creators/terminal';
import { setScanRange } from '../redux/actions/creators/currentNetwork';

const autodetectionIP = () => async (dispatch) => {
  const os = await require('os');
  const networkInterfaces = os.networkInterfaces();
  const ip = networkInterfaces.wlp3s0[0].address;
  const mask = networkInterfaces.wlp3s0[0].netmask;
  dispatch(pushStory(`autodetection ip: ${ip}, netmask: ${mask}`));
  const splittedIP = ip.split('.');
  splittedIP[3] = '0-255';
  const range = splittedIP.join('.');
  dispatch(setScanRange(range));
};

export default autodetectionIP;
