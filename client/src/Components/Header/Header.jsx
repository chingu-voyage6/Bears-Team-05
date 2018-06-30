import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './Header.css';

// connect to redux and get action creators
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getUser from '../../Actions/authentiation';
// reads from store
const mapStateToProps = state => state;
// writes to store
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getUser,
  }, dispatch);
// end redux

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      loginStatus: 'Login',
    };
  }
  componentDidMount() {
    console.log('Header Mounted!');
    this.props.getUser();
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
        loginStatus: 'Profile',
      });
    } else {
      this.setState({
        ready: true,
        loginStatus: 'Login',
      });
    }
  }
  render() {
    if (this.state.ready) {
      return (
        <header>
          <div className="header">
            <div className="header__left">
              <NavLink to="/" exact><h1>Tetris Duel</h1></NavLink>
            </div>
            <div className="header__right">
              <NavLink activeClassName="is-active" to="/leaderboard">
              Leaderboard
              </NavLink>
              <NavLink activeClassName="is-active" to="/login">
                {this.state.loginStatus}
              </NavLink>
              <NavLink activeClassName="is-active" to="/register">
              Register
              </NavLink>
            </div>
          </div>
        </header>
      );
    }
    return null;
  }

}

Header.defaultProps = {
  user: null,
  getUser: null,
};

Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  getUser: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
