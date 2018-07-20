import React from 'react';
import PropTypes from 'prop-types';
import './controls.css';

const Controls = props => (
  <div className="controls">
    <canvas
      ref={props.onCanvas}
      width={props.game.canvas.canvasMinor.width}
      height={props.game.canvas.canvasMinor.height}
      tabIndex="0"
    />
    <button className="reset" onClick={() => props.onReset()}>
            Reset
    </button>
    <label htmlFor="test">Lines Cleared = {props.game.points.totalLinesCleared}</label>
    <label htmlFor="test">Level = {props.game.points.level}</label>
    <label htmlFor="test">
    Pause:
      <input
        name="Pausing"
        type="checkbox"
        checked={props.game.paused}
        onChange={props.onhandlePause()}
      />
    </label>
    <button className="reset" onClick={() => props.onFloorRaise()}>
        Raise Floor
    </button>
  </div>

);
Controls.defaultProps = {
  onReset: null,
  onFloorRaise: null,
  onhandlePause: null,
  game: {},
  onCanvas: null,
};
Controls.propTypes = {
  onReset: PropTypes.func,
  onFloorRaise: PropTypes.func,
  onhandlePause: PropTypes.func,
  game: PropTypes.objectOf(PropTypes.any),
  onCanvas: PropTypes.objectOf(PropTypes.any),
};
export default Controls;
