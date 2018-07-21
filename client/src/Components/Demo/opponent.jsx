import React from 'react';
import PropTypes from 'prop-types';
import './opponent.css';

// connect to redux
import { connect } from 'react-redux';

import { clearCanvas, drawRuble, drawBoundary, drawCells } from './scripts/canvas';

// reads from store
const mapStateToProps = state => state;

class Opponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { };
    this.canvasOpponent = React.createRef();
  }
  componentDidMount() {
    console.log('Opponent Mounted!!');
    this.counter = 0;
    this.simulateTick();
  }

  componentWillUnmount() {
    clearInterval(this.simulationInterval);
  }


  setGame = () => {
    // full deep copy of game state needed as object mutation becomes a problem
    const copyOfState = JSON.parse(JSON.stringify(this.props.game));
    if (this.canvasOpponent.current) {
      const canvasOpponent = this.canvasOpponent.current;
      canvasOpponent.style.backgroundColor = 'black';
      this.canvasOpponentContext = canvasOpponent.getContext('2d');
      copyOfState.activeShape.unitBlockSize = this.props.game.activeShape.unitBlockSize / 2;
      clearCanvas(this.canvasOpponentContext, copyOfState);
      drawBoundary(this.canvasOpponentContext, copyOfState);
      drawCells(this.canvasOpponentContext, copyOfState.activeShape, true);
      drawRuble(this.canvasOpponentContext, copyOfState, true);
    }
  };

  simulateTick = () => {
    this.simulationInterval = setInterval(() => {
      this.setGame();
    }, this.props.game.timerInterval);
  }

  render() {
    if (this.props.game.activeShape.cells.length) {
      return (
        <div className="opponentContainer">
          <div className="opponentDescription">
            <h2>Opponent</h2>
            <p>Name: William</p>
            <p>Location: Papua New Guinea</p>
            <p>Rank: 56</p>
          </div>
          <canvas
            ref={this.canvasOpponent}
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

Opponent.defaultProps = {
  game: {},
};
Opponent.propTypes = {
  game: PropTypes.objectOf(PropTypes.any),
};

export default connect(mapStateToProps)(Opponent);
