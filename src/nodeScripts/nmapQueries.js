import { pushStory } from "../redux/actions/creators/terminal";
import { setMachinesData } from "../redux/actions/creators/currentNetwork";

const nmap = require("node-nmap");

nmap.nmapLocation = "nmap";

export const detailedScan = (address) => {
  return dispatch => {
    const detailedScan = new nmap.OsAndPortScan(address);
    let secondsLate = 5;
    const loader = setInterval(() => {
      dispatch(pushStory(`Scanning...${secondsLate} seconds late...`));
      secondsLate += 5;
    }, 5000);

    detailedScan.on("complete", function(data) {
      clearInterval(loader);
      if (!data[0]) {
        dispatch(pushStory("Error"));
        return null;
      }
      console.log(data);
      data.forEach((machine, i) => {
        const { ip, mac, osNmap, vendor, openPorts } = machine;
        const portsData = openPorts.map((el, ind) => {
          return `${ind}: ${el.port} ${el.protocol} ${el.service} (${el.method})`;
        });
        dispatch(
          pushStory(`
          -------------detailedScan started---------------------

          vendor: ${vendor}
          mac: ${mac}
          ip: ${ip}
          osNmap: ${osNmap}
          openPorts: ${portsData.join("\u000A\n")}
          -------------detailedScan completed-------------------
          `)
        );
      });
    });

    detailedScan.on("error", function(error) {
      dispatch(pushStory("quickscan error"));
      clearInterval(loader);
      console.log(error);
    });
  };
};

export const quickScan = (address) => {
  return dispatch => {
    const detailedScan = new nmap.QuickScan(address);
    let secondsLate = 5;
    const loader = setInterval(() => {
      dispatch(pushStory(`Scanning...${secondsLate} seconds late...`));
      secondsLate += 5;
    }, 5000);

    detailedScan.on("complete", function(data) {
      clearInterval(loader);
      if (!data[0]) {
        dispatch(pushStory("Error"));
        return null;
      }
      console.log(data);
      dispatch(pushStory('-------------quickScan started---------------------'));
      data.forEach((machine, i) => {
        const { hostname, ip } = machine;
        dispatch(
          pushStory(`
          hostname: ${hostname}
          ip: ${ip}
          `)
        );
      });
      dispatch(setMachinesData(data));
      console.log(data);
      console.log('!!!!!!!!');
      dispatch(pushStory('-------------quickScan completed-------------------'));
    });

    detailedScan.on("error", function(error) {
      dispatch(pushStory("quickscan error"));
      clearInterval(loader);
      console.log(error);
    });
  };
};
