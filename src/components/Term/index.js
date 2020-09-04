import { connect } from 'react-redux';

import Term from './Term';

import { pushStory } from '../../redux/actions/creators/terminal';

const mapStateToProps = ({ terminal: { history } }) => ({ history });

const mapToDispatch = { pushStory };

export default connect(mapStateToProps, mapToDispatch)(Term);
