import { pushStory } from '../redux/actions/creators/terminal';
import { setMachinesData } from '../redux/actions/creators/currentNetwork';

const nmap = require('node-nmap');

nmap.nmapLocation = 'nmap';

export const detailedScan = (address) => (dispatch) => {
  const scan = new nmap.OsAndPortScan(address);
  let secondsLate = 5;
  const loader = setInterval(() => {
    dispatch(pushStory(`Scanning...${secondsLate} seconds late...`));
    secondsLate += 5;
  }, 5000);

  scan.on('complete', (data) => {
    clearInterval(loader);
    if (!data[0]) {
      dispatch(pushStory('Error'));
      return null;
    }
    data.forEach((machine) => {
      const {
        ip, mac, osNmap, vendor, openPorts,
      } = machine;
      const portsData = openPorts.map((el, ind) => `${ind}: ${el.port} ${el.protocol} ${el.service} (${el.method})`);
      dispatch(
        pushStory(`
          -------------detailedScan started---------------------

          vendor: ${vendor}
          mac: ${mac}
          ip: ${ip}
          osNmap: ${osNmap}
          openPorts: ${portsData.join('\u000A\n')}
          -------------detailedScan completed-------------------
          `),
      );
    });
    return null;
  });

  scan.on('error', (error) => {
    dispatch(pushStory('quickscan error'));
    dispatch(pushStory(error));
    clearInterval(loader);
  });
};

export const quickScan = (address) => (dispatch) => {
  const scan = new nmap.QuickScan(address);
  let secondsLate = 5;
  const loader = setInterval(() => {
    dispatch(pushStory(`Scanning...${secondsLate} seconds late...`));
    secondsLate += 5;
  }, 5000);

  scan.on('complete', (data) => {
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
          hostname: ${hostname}
          ip: ${ip}
          `),
      );
    });
    dispatch(setMachinesData(data));
    dispatch(pushStory('-------------quickScan completed-------------------'));
    return null;
  });

  scan.on('error', (error) => {
    dispatch(pushStory('quickscan error!!'));
    dispatch(pushStory(error));
    clearInterval(loader);
  });
};
