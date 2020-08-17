import { connect } from 'react-redux';

import MachinesTable from './MachinesTable';

// import { pushStory } from '../../redux/actions/creators/terminal';

const mapStateToProps = ({ terminal: { history }, currentNetwork: { machines } }) => ({ history, machines });

// const mapToDispatch = { pushStory };

export default connect(mapStateToProps)(MachinesTable);
