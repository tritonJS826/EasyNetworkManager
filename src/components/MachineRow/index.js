import { connect } from 'react-redux';

import MachineRow from './MachineRow';

// import { pushStory } from '../../redux/actions/creators/terminal';
import { setAddressOfcurrentMachine } from '../../redux/actions/creators/currentMachine';

const mapStateToProps = ({ terminal: { history } }) => ({ history });

const mapDispatchToProps = { setAddressOfcurrentMachine };

export default connect(mapStateToProps, mapDispatchToProps)(MachineRow);
