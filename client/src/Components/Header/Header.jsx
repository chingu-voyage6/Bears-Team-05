import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

import './Header.css';

// connect to redux and get action creators
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../../Actions/authentication';

// reads from store
const mapStateToProps = state => state;

// writes to store
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getUser,
  }, dispatch),
});

// end redux

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      profileRoute: 'Login',
      profileRoutePath: '/login',
    };
  }
  componentDidMount() {
    console.log('Header Mounted!');
    this.props.actions.getUser();
  }
  componentDidUpdate(prevProps) {
    // once user info comes from cdm proceed to rendering
    if (prevProps.user !== this.props.user) {
      this.setReady();
    }
  }
  setReady = () => {
    if (this.props.user.authenticated) {
      this.setState({
        ready: true,
        profileRoute: 'Profile',
        profileRoutePath: '/profile',
      });
    } else {
      this.setState({
        ready: true,
        profileRoute: 'Login',
        profileRoutePath: '/login',
      });
    }
  }
  render() {
    const { profileRoutePath, profileRoute } = this.state;
    return this.state.ready && (
      <header>
        <div className="header">
          <div className="header__left">
            <NavLink to="/" exact><h1>Tetris Duel</h1></NavLink>
          </div>
          <div className="header__right">
            <NavLink activeClassName="is-active" to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink activeClassName="is-active" to={profileRoutePath} >
              {profileRoute}
            </NavLink>
          </div>
        </div>
      </header>
    );
  }

}

Header.defaultProps = {
  user: null,
  actions: {},
};

Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  actions: PropTypes.shape({
    getUser: PropTypes.func,
  }),
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
