import React from 'react';
import PropTypes from 'prop-types';
import './ScoreBoard.css';

const ScoreBoard = ({ score, togglePause, changePalette }) => (
  <div className="score-board">
    <h1 className="score-board__h1">Score: { score }</h1>
    <button onClick={ togglePause }>Pause</button>
    <button onClick={ changePalette }>Change Palette</button>
  </div>
);

ScoreBoard.propTypes = {
  score         : PropTypes.number.isRequired,
  togglePause   : PropTypes.func.isRequired,
  changePalette : PropTypes.func.isRequired
};

export default ScoreBoard;
