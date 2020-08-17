import { connect } from 'react-redux';

import NavMenu from './NavMenu';
// import { setNavMenuState } from '../../redux/actions/creators/navBar-creator';
// import { setGameName } from '../../redux/actions/creators/game-mode';

// const mapStateToProps = ({ navBar: { navBarState } }) => ({ navBarState });

// const mapToDispatch = (dispatch) => ({
  // toggleNav: (state) => dispatch(setNavMenuState(state)),
  // setGameName: (state) => dispatch(setGameName(state)),
// });

export default connect(/* mapStateToProps, mapToDispatch */)(NavMenu);
