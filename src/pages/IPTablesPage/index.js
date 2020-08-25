import { connect } from 'react-redux';

import IPTablesPage from './IPTablesPage';

import {
  resetTables,
  setIpTables,
  setCurrentIpTable,
  setCurrentMachines,
} from '../../redux/actions/creators/ipTables';
import { quickScan } from '../../nodeScripts/nmapQueries';

const mapStateToProps = ({ ipTables: { tables, currentTable }, currentNetwork }) => ({
  currentNetwork,
  tables,
  currentTable,
});

const mapDispatchToProps = {
  quickScan,
  resetTables,
  setIpTables,
  setCurrentIpTable,
  setCurrentMachines,
};

export default connect(mapStateToProps, mapDispatchToProps)(IPTablesPage);
