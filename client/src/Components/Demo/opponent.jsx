import React from 'react';
import PropTypes from 'prop-types';
import './oponent.css';

// connect to redux
import { connect } from 'react-redux';

import { clearCanvas, drawRuble, drawBoundary, drawCells } from './scripts/canvas';

// reads from store
const mapStateToProps = state => state;

class Oponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { };
    this.canvasOponent = React.createRef();
  }
  componentDidMount() {
    console.log('Oponent Mounted!!');
    this.counter = 0;
    this.simulateTick();
  }

  componentWillUnmount() {
    clearInterval(this.simulationInterval);
  }


  setGame = () => {
    const copyofState = JSON.parse(JSON.stringify(this.props.game));
    if (this.canvasOponent.current) {
      const canvasOponent = this.canvasOponent.current;
      canvasOponent.style.backgroundColor = 'black';
      this.canvasOponentContext = canvasOponent.getContext('2d');
      copyofState.activeShape.unitBlockSize = this.props.game.activeShape.unitBlockSize / 2;
      copyofState.canvas.canvasMajor.width = this.props.game.canvas.canvasMajor.width / 2;
      copyofState.canvas.canvasMajor.height = this.props.game.canvas.canvasMajor.height / 2;
      clearCanvas(this.canvasOponentContext, copyofState);
      drawBoundary(this.canvasOponentContext, copyofState);
      drawCells(this.canvasOponentContext, copyofState.activeShape, true);
      drawRuble(this.canvasOponentContext, copyofState, true);
    }
  };

  simulateTick = () => {
    this.simulationInterval = setInterval(() => {
      this.setGame();
    }, this.props.game.timerInterval);
  }

  render() {
    if (this.props.user.authenticated && this.props.game.activeShape.cells.length) {
      return (
        <div className="oponentContainer">
          <div className="oponentDescription">
            <h2>Oponent</h2>
            <p>Name: William</p>
            <p>Location: Papua New Guinea</p>
            <p>Rank: 56</p>
          </div>
          <canvas
            ref={this.canvasOponent}
            width={this.props.game.canvas.canvasMajor.width / 2}
            height={this.props.game.canvas.canvasMajor.height / 2}
            tabIndex="0"
            onKeyDown={e => this.gamePlay(e)}
          />
        </div>
      );
    }
    return null;
  }

}

Oponent.defaultProps = {
  game: {},
  user: {},
};
Oponent.propTypes = {
  game: PropTypes.objectOf(PropTypes.any),
  user: PropTypes.objectOf(PropTypes.any),
};

export default connect(mapStateToProps)(Oponent);
