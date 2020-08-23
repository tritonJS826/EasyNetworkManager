import { connect } from 'react-redux';

import WindowChangeRow from './WindowChangeRow';

import { setCurrentMachines } from '../../redux/actions/creators/ipTables';

const mapStateToProps = ({ ipTables: { currentTable: { machines } } }) => ({ machines });

const mapToDispatch = { setCurrentMachines };

export default connect(mapStateToProps, mapToDispatch)(WindowChangeRow);
