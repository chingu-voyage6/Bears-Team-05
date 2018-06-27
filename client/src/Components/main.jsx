// root component, can handle authentication here
import React from 'react';
import PropTypes from 'prop-types';

// connect to redux and get action creators
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getUser from '../Actions/authentiation';

function mapStateToProps(state) { // read store
  return state;
}
function mapDispatchToProps(dispatch) { // write to store
  return bindActionCreators({
    getUser,
  }, dispatch);
}
// end redux

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false, // only proceed after communication with the store
    };
  }
  componentDidMount() {
    console.log('CDM Mounted for Main');
    this.props.getUser();
  }
  componentDidUpdate(prevProps) {
    // once user info comes from cdm proceed to rendering
    if (prevProps.user !== this.props.user) {
      this.setReady()
    }
  }
  setReady = () => {
    this.setState({ ready: true });
  }
  render() {
    // send current route from router to menu
    if (this.state.ready) {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
    return null;
  }

}

Main.defaultProps = {
  children: <div>defaultProps to satisfy ESLint Airbnb rules</div>,
  user: null,
  getUser: null,
};

Main.propTypes = {
  children: PropTypes.element,
  user: PropTypes.objectOf(PropTypes.any),
  getUser: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
