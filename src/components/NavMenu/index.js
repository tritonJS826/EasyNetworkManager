import { connect } from 'react-redux';

import NavMenu from './NavMenu';
import { setIpTables } from '../../redux/actions/creators/ipTables';

const mapStateToProps = ({ currentMachine: { processCounter } }) => ({ processCounter });

const mapToDispatch = { setIpTables };

export default connect(mapStateToProps, mapToDispatch)(NavMenu);
