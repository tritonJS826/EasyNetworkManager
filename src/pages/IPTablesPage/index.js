import { connect } from 'react-redux';

import IPTablesPage from './IPTablesPage';

import {
  resetTables,
  setIpTables,
  setCurrentIpTable,
  setCurrentMachines,
} from '../../redux/actions/creators/ipTables';

const mapStateToProps = ({ ipTables: { tables, currentTable } }) => ({
  tables,
  currentTable,
});

const mapDispatchToProps = {
  // createNewFile,
  resetTables,
  setIpTables,
  setCurrentIpTable,
  setCurrentMachines,
};

export default connect(mapStateToProps, mapDispatchToProps)(IPTablesPage);
