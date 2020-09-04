import { connect } from 'react-redux';

import IPTablesPage from './IPTablesPage';

import {
  resetTables,
  setIpTables,
  setCurrentIpTable,
  setCurrentMachines,
  toogleIsRtsWork,
} from '../../redux/actions/creators/ipTables';
import { quickScan } from '../../nodeScripts/nmapQueries';

const mapStateToProps = ({ ipTables: { tables, currentTable, isRTSWork }, currentNetwork }) => ({
  currentNetwork,
  tables,
  currentTable,
  isRTSWork,
});

const mapDispatchToProps = {
  quickScan,
  resetTables,
  setIpTables,
  setCurrentIpTable,
  setCurrentMachines,
  toogleIsRtsWork,
};

export default connect(mapStateToProps, mapDispatchToProps)(IPTablesPage);
