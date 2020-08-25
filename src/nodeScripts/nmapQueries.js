import { pushStory, rewriteLastStory } from '../redux/actions/creators/terminal';
import { setMachinesData } from '../redux/actions/creators/currentNetwork';

const nmap = require('node-nmap');

nmap.nmapLocation = 'nmap';

export const detailedScan = (address) => (dispatch) => {
  const scan = new nmap.OsAndPortScan(address);
  let secondsLate = 5;
  dispatch(pushStory('Scanning...'));
  const loader = setInterval(() => {
    dispatch(rewriteLastStory(`Scanning...${secondsLate} seconds late...`));
    secondsLate += 5;
  }, 5000);

  scan.on('complete', async (data) => {
    clearInterval(loader);
    if (!data[0]) {
      dispatch(pushStory('Error'));
      return null;
    }
    data.forEach((machine) => {
      const {
        ip, mac, osNmap, vendor, openPorts,
      } = machine;
      const portsData = openPorts.map(
        (el, ind) => `${ind}: ${el.port} ${el.protocol} ${el.service} (${el.method})`,
      );
      dispatch(pushStory('-------------detailedScan started---------------------'));
      dispatch(pushStory(`vendor: ${vendor}`));
      dispatch(pushStory(`mac: ${mac}`));
      dispatch(pushStory(`ip: ${ip}`));
      dispatch(pushStory(`osNmap: ${osNmap}`));
      dispatch(pushStory('openPorts:'));
      portsData.forEach((port) => {
        dispatch(pushStory(port));
      });
      dispatch(pushStory('-------------detailedScan completed-------------------'));
    });
    await dispatch(setMachinesData(data));
    return null;
  });

  scan.on('error', (error) => {
    dispatch(pushStory('quickscan error'));
    dispatch(pushStory(error));
    clearInterval(loader);
  });
};

export const quickScan = (address, callback) => async (dispatch) => {
  const scan = new nmap.QuickScan(address);
  let secondsLate = 5;
  const loader = setInterval(() => {
    dispatch(rewriteLastStory(`Scanning...${secondsLate} seconds late...`));
    secondsLate += 5;
  }, 5000);

  scan.on('complete', async (data) => {
    clearInterval(loader);
    if (!data[0]) {
      dispatch(pushStory('Error'));
      return null;
    }
    dispatch(pushStory('-------------quickScan started---------------------'));
    data.forEach((machine) => {
      const { hostname, ip } = machine;
      dispatch(
        pushStory(`
          hostname: ${hostname || 'nknown'}
          ip: ${ip}
          `),
      );
    });
    await dispatch(setMachinesData(data));
    dispatch(pushStory('-------------quickScan completed-------------------'));
    if (callback) callback(data);
    return null;
  });

  scan.on('error', (error) => {
    dispatch(pushStory('quickscan error!!'));
    dispatch(pushStory(error));
    clearInterval(loader);
  });
};
