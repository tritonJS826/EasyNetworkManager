import { connect } from 'react-redux';

import NavMenu from './NavMenu';
import { setIpTables } from '../../redux/actions/creators/ipTables';

const mapStateToProps = () => ({});

const mapToDispatch = { setIpTables };

export default connect(mapStateToProps, mapToDispatch)(NavMenu);
