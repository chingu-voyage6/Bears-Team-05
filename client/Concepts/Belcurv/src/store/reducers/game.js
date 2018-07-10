import {
  createMatrix,
  merge,
  resetPlayer,
  rotate,
  getPalette
} from '../../utils/';

import {
  PLAYER_ROTATE,
  PLAYER_MOVE,
  PLAYER_DROP,
  PLAYER_RESET,
  UPDATE_SCORE,
  RESET_SCORE,
  SET_PALETTE
} from '../actions/playerActions';

import {
  MERGE_PLAYER_ARENA,
  RESET_ARENA,
  UPDATE_ARENA,
  TOGGLE_PAUSE,
  ROW_FLASH
} from '../actions/gameActions';

const initialGameState = {
  player : {
    score   : 0,
    matrix  : [],
    palette : getPalette(0),
    pos     : { x : 0, y : 0 }
  },
  arena : createMatrix(12, 20),
  canvas : {
    width  : 240,
    height : 400,
    scale  : 20
  },
  gameState : {
    paused : false
  }
};

export default (state = initialGameState, action) => {

  switch (action.type) {

    case PLAYER_ROTATE:
      return {
        ...state,
        player: {
          ...state.player,
          matrix: rotate(state.player.matrix, action.direction)
        }
      };

    case PLAYER_MOVE:
      return {
        ...state,
        player: {
          ...state.player,
          pos: {
            ...state.player.pos,
            x: state.player.pos.x += action.offset
          }          
        }
      };

    case PLAYER_DROP:
      return {
        ...state,
        player: {
          ...state.player,
          pos: {
            ...state.player.pos,
            y: state.player.pos.y += action.direction
          }          
        }
      };

    case PLAYER_RESET:
      return {
        ...state,
        player: (resetPlayer(state.player, state.arena))
      };

    case MERGE_PLAYER_ARENA:
      return {
        ...state,
        arena: merge(action.player, action.arena)
      };

    case UPDATE_SCORE:
      return {
        ...state,
        player: {
          ...state.player,
          score: state.player.score += action.value
        }
      };

    case RESET_SCORE:
      return {
        ...state,
        player: {
          ...state.player,
          score: 0
        }
      };

    case RESET_ARENA:
      return {
        ...state,
        arena: createMatrix(12, 20)
      };

    case SET_PALETTE:
      return {
        ...state,
        player: {
          ...state.player,
          palette: getPalette(action.index)
        }
      };

    case UPDATE_ARENA:
      return {
        ...state,
        arena: action.newArena
      };

    case TOGGLE_PAUSE:
      return {
        ...state,
        gameState: {
          ...state.gameState,
          paused: !state.gameState.paused
        }
      };

    case ROW_FLASH:
      return {
        ...state,
        arena: state.arena.map((row, y) => {
          return (y === action.row) ? row.fill('F') : row;
        })
      };

    default:
      return state;
  }

};
