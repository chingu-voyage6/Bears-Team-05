import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  //Added constructor and componenDidMount to test server response
  constructor(props){
    super(props)
    this.state={
      fromServer:''
    }
  }
  componentDidMount(){
    fetch('/api')
    .then((response)=>{
      return response.json()
    })
    .then((serverMessage)=>{
      this.setState({
        fromServer:serverMessage
      })
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.fromServer}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <a href="/test">Go To Test Route</a>
      </div>
    );
  }
}

export default App;
