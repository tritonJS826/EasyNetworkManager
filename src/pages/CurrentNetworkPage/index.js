import { connect } from 'react-redux';

import CurrentNetworkPage from './CurrentNetworkPage';
import { setScanRange, setMachinesData } from '../../redux/actions/creators/currentNetwork';
import { setIpTables, setCurrentIpTable } from '../../redux/actions/creators/ipTables';
import { quickScan, detailedScan } from '../../nodeScripts/nmapQueries';
import autodetectionIP from '../../nodeScripts/autodetectionIP';

const mapStateToProps = ({
  currentNetwork: { scanRange, machines },
  ipTables: { tables, currentTable },
}) => ({
  scanRange,
  machines,
  tables,
  currentTable,
});

const actionCreators = {
  quickScan,
  detailedScan,
  autodetectionIP,
  setScanRange,
  setMachinesData,
  setIpTables,
  setCurrentIpTable,
};

export default connect(mapStateToProps, actionCreators)(CurrentNetworkPage);
