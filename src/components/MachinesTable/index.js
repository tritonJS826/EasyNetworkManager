import { connect } from 'react-redux';

import MachinesTable from './MachinesTable';

import { setCurrentMachines } from '../../redux/actions/creators/ipTables';

const mapStateToProps = ({ terminal: { history } }) => ({ history });

const mapToDispatch = { setCurrentMachines };

export default connect(mapStateToProps, mapToDispatch)(MachinesTable);
