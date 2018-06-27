// test react component
import React from 'react';
import PropTypes from 'prop-types';

// connect to redux
import { connect } from 'react-redux';

function mapStateToProps(state) { // read store
  return state;
}

// end redux
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    if (this.props.user.authenticated) {
      return (
        <React.Fragment>
          <h1>Hello {this.props.user.displayName}</h1>
          <h4>{this.props.user.email}</h4>
          <a href="/auth/logout">Logout</a>
          <br />
          <a href="/">Back to App Page</a>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <h1>You are Not Logged In !</h1>
        <a href="/auth/google">Login</a>
        <br />
        <a href="/">Back to App Page</a>
      </React.Fragment>
    );
  }

}

Test.defaultProps = {
  user: null,
};

Test.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
};

export default connect(mapStateToProps)(Test);
