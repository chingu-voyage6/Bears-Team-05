import React from 'react';
import './Demo.css';

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

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log('Demo Mounted!');
  }

  render() {
    return (
      <div>Hello!</div>
    );
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(Demo);
