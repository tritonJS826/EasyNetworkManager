import { connect } from 'react-redux';

import WindowChangeTable from './WindowChangeTable';

import { setCurrentIpTable, setIpTables } from '../../redux/actions/creators/ipTables';

const mapStateToProps = ({ ipTables: { currentTable, tables } }) => ({ currentTable, tables });

const mapToDispatch = { setCurrentIpTable, setIpTables };

export default connect(mapStateToProps, mapToDispatch)(WindowChangeTable);
