import { connect } from 'react-redux';

import CurrentNetworkPage from './CurrentNetworkPage';
import {
  setScanRange,
  setMachinesData,
} from '../../redux/actions/creators/currentNetwork';
import { quickScan, detailedScan } from '../../nodeScripts/nmapQueries';
import autodetectionIP from '../../nodeScripts/autodetectionIP';


const mapStateToProps = ({ currentNetwork: { scanRange } }) => ({
  scanRange,
});

const actionCreators = {
  quickScan,
  detailedScan,
  autodetectionIP,
  setScanRange,
  setMachinesData,
 };

export default connect(mapStateToProps, actionCreators)(CurrentNetworkPage);
