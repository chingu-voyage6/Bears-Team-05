import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsersOwnStats } from '../../Actions/authentication';

import './Profile.css';

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.actions.getUsersOwnStats();
  }

  renderStats() {
    return Object.keys(this.props.user.stats).map(key => (
      <div key={key}>
        <h4>{key}</h4>
        <p>{this.props.user.stats[key]}</p>
      </div>
    ));
  }

  render() {
    return (
      <div className="profile">
        { this.props.user.authenticated ?
          <div className="profile__content">
            <h1 className="profile__heading">Profile</h1>
            <h3>{ this.props.user.displayName }</h3>
            <h4>Some stats!</h4>
            <pre>{ JSON.stringify(this.props.user.stats, null, 2) }</pre>
          </div>
          :
          <div className="profile__content">
            <h1 className="profile__heading">
              You must authenticate to access this resource
            </h1>
          </div>
        }
      </div>
    );
  }

}

Profile.defaultProps = {
  user: null,
  actions: {},
};

Profile.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  actions: PropTypes.shape({
    getUsersOwnStats: PropTypes.func,
  }),
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getUsersOwnStats,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
