/* ================================= SETUP ================================= */

import React       from 'react';
import PropTypes   from 'prop-types';
import Mousetrap   from 'mousetrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { collides, calculateKick } from '../utils';

import {
  playerDrop,
  playerMove,
  playerReset,
  playerRotate,
  updateScore,
  resetScore,
  setPalette
} from '../store/actions/playerActions';

import {
  mergePlayerArena,
  resetArena,
  updateArena,
  togglePause,
  rowFlash
} from '../store/actions/gameActions';

import GameView   from './GameView/GameView';
import ScoreBoard from './ScoreBoard/ScoreBoard';


/* =========================== CLASS DEFINITION ============================ */

class App extends React.Component {

  // local component state for loop timing and palette variables
  state = {
    dropCounter  : 0,
    dropInterval : 1000,
    lastTime     : 0,
    paletteIndex : 0
  }
  
  componentDidMount() {
    /* === for testing dead row insertion === */
    Mousetrap.bind('x',     () => this.testInsertDeadRows(1));

    Mousetrap.bind('left',  () => this.playerMove(-1));
    Mousetrap.bind('right', () => this.playerMove(1));
    Mousetrap.bind('down',  () => this.playerDrop());
    Mousetrap.bind('a',     () => this.playerRotate(-1));
    Mousetrap.bind('d',     () => this.playerRotate(1));
    this.props.actions.playerReset();
    this.startLoop();
  }

  componentWillUnmount() {
    this.stopLoop();
    Mousetrap.unbind('left');
    Mousetrap.unbind('right');
    Mousetrap.unbind('a');
    Mousetrap.unbind('d');
    Mousetrap.unbind('s');
  }

  /* === for testing dead row insertion === */
  testInsertDeadRows = (qty) => {
    let newArena = this.props.arena.map(row => row.slice(0));
    for (let i = 0; i < qty; i++) {
      let removedRow = newArena.shift();
      newArena.push(removedRow.fill('X'));
    }
    this.props.actions.updateArena(newArena);
  }

  arenaSweep = () => {
    let rowCount = 1;
    let newArena = this.props.arena.map(row => row.slice(0));
    outer: for (let y = newArena.length - 1; y > 0; --y) {
      for (let x = 0; x < newArena[y].length; x++) {
        // if a row is NOT filled, or is filled with X's, continue
        if (newArena[y][x] === 0 || newArena[y][x] === 'X') {
          continue outer;
        }
      }

      this.props.actions.rowFlash(y);

      setTimeout(() => {
        // remove the row with all filled positions, return zero-filled row
        const row = newArena.splice(y, 1)[0].fill(0);
        // insert that zeroed row at the top of the arena
        newArena.unshift(row);
        // update actual arena
        this.props.actions.updateArena(newArena);
        // increment y since we removed a row
        y++;
        // update player score
        this.props.actions.updateScore(rowCount * 10);
        // make each additional filled row count 2x as much
        rowCount *= 2;

      }, 200);

    }
  }

  playerMove = (direction) => {
    if (!this.props.gameState.paused) {
      this.props.actions.playerMove(direction);
      if (collides(this.props.arena, this.props.player)) {
        this.props.actions.playerMove(-direction);
      }
    }
  }

  playerDrop = () => {
    if (!this.props.gameState.paused) {
      this.props.actions.playerDrop();
      if (collides(this.props.arena, this.props.player)) {
        this.props.actions.playerDrop(-1);
        this.props.actions.mergePlayerArena(this.props.player, this.props.arena);
        // check for filled rows
        this.arenaSweep();
        
        // reset player. Create new piece at top
        this.props.actions.playerReset(this.props.player);
        // if we collide immediately after resetting, it means we've filed
        // rubble to the top or the arena = game over
        if (collides(this.props.arena, this.props.player)) {
          this.props.actions.resetArena();
          this.props.actions.resetScore();
        }
      }
      // reset dropCounter to get a full 1 sec after each drop
      this.setState({ dropCounter: 0 });
    }
  }

  playerRotate = (direction) => {
    if (!this.props.gameState.paused) {
      this.props.actions.playerRotate(direction);
      // if we collide after rotating, try to kick left/right
      if (collides(this.props.arena, this.props.player)) {
        const kick = calculateKick(this.props.player, this.props.arena);
        if (kick === 0) {
          // cannot kick piece to a valid position; undo rotation
          this.props.actions.playerRotate(-direction);
        } else {
          // kick piece left/right by calculated offset
          this.props.actions.playerMove(kick);
        }
      }
    }
  }

  startLoop = () => {
    if (!this.frameId) {
      this.frameId = window.requestAnimationFrame(this.update);
    }
  }

  stopLoop = () => {
    window.cancelAnimationFrame(this.frameId);
  }

  update = (time = 0) => {
    if (!this.props.gameState.paused) {
      
      /* == perform loop work here == */
      
      const deltaTime = time - this.state.lastTime;
      
      this.setState(prevState => (
        { dropCounter: prevState.dropCounter + deltaTime }
      ));
  
      if(this.state.dropCounter > this.state.dropInterval) {
        this.playerDrop();
      }
  
      this.setState({ lastTime: time });
    }

    // set up next iteration of the loop
    this.frameId = window.requestAnimationFrame(this.update);
  }

  ontogglePause = () => {
    this.props.actions.togglePause();
  }

  onChangePalette = () => {
    this.setState(prevState => ({
      paletteIndex: ((prevState.paletteIndex + 1) % 6)
    }), () => {
      this.props.actions.setPalette(this.state.paletteIndex);
    });
  }

  render() {
    return (
      <div className="app-container">
        <ScoreBoard score={ this.props.player.score }
          changePalette={ this.onChangePalette }
          togglePause={ this.ontogglePause } />
        <GameView />
      </div>
    );
  }

}

App.propTypes = {
  arena : PropTypes.array.isRequired,
  gameState : PropTypes.shape({
    paused : PropTypes.bool
  }).isRequired,
  player : PropTypes.shape({
    matrix : PropTypes.array,
    pos : PropTypes.shape({
      x : PropTypes.number,
      y : PropTypes.number
    }),
    score : PropTypes.number
  }).isRequired,
  actions : PropTypes.shape({
    playerDrop       : PropTypes.func,
    playerMove       : PropTypes.func,
    playerReset      : PropTypes.func,
    playerRotate     : PropTypes.func,
    updateScore      : PropTypes.func,
    resetScore       : PropTypes.func,
    setPalette       : PropTypes.func,
    mergePlayerArena : PropTypes.func,
    resetArena       : PropTypes.func,
    updateArena      : PropTypes.func,
    togglePause      : PropTypes.func,
    rowFlash         : PropTypes.func
  }).isRequired
};

/* ====================== CONNECT COMPONENT TO STORE ======================= */

const mapStateToProps = (state) => ({
  arena     : state.game.arena,
  gameState : state.game.gameState,
  player    : state.game.player
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    playerDrop, 
    playerMove,
    playerReset,
    playerRotate,
    updateScore,
    resetScore,
    setPalette,
    mergePlayerArena,
    resetArena,
    updateArena,
    togglePause,
    rowFlash
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
