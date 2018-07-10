/* ================================= SETUP ================================= */

import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';

import Canvas from '../Canvas/Canvas';


/* =========================== CLASS DEFINITION ============================ */

class GameView extends React.Component {

  state  = { context : null };

  draw() {
    const { context } = this.state;
    context.fillStyle = '#000';
    context.fillRect(0, 0, this.props.arena.width, this.props.arena.height);
    this.drawMatrix(this.props.arena, { x : 0, y : 0 });
    this.drawMatrix(this.props.player.matrix, this.props.player.pos);
  }

  drawMatrix(matrix, offset) {
    const { context } = this.state;
    const colors = this.props.player.palette;
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 'X') {
          context.fillStyle = '#555555';
          context.fillRect(x + offset.x, y + offset.y, 1, 1);
        } else if (value === 'F') {
          context.fillStyle = '#FFFFFF';
          context.fillRect(x + offset.x, y + offset.y, 1, 1);
        } else if (value !== 0 && value !== 'X') {
          context.fillStyle = colors[value];
          context.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  }

  render() {
    const { width, height, scale } = this.props.canvas;
    const { context } = this.state;
    if (context) {
      context.clearRect(0, 0, width, height);
      this.draw();
    }
    return (
      <Canvas className="game-canvas"
        width={ width } height={ height } scale={ scale }
        onContext={ context => this.setState({ context })}
      />
    );
  }

}

GameView.propTypes = {
  arena : PropTypes.array.isRequired,
  canvas : PropTypes.shape({
    width  : PropTypes.number,
    height : PropTypes.number,
    scale  : PropTypes.number
  }).isRequired,
  player : PropTypes.shape({
    matrix  : PropTypes.array,
    palette : PropTypes.array,
    pos     : PropTypes.shape({
      x : PropTypes.number,
      y : PropTypes.number
    })
  }).isRequired
};


/* ====================== CONNECT COMPONENT TO STORE ======================= */

const mapStateToProps = (state) => ({
  arena  : state.game.arena,
  canvas : state.game.canvas,
  player : state.game.player
});

export default connect(mapStateToProps, null)(GameView);
