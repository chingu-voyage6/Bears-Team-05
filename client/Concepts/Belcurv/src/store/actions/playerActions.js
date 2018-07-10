export const PLAYER_ROTATE = 'PLAYER_ROTATE';
export const PLAYER_MOVE   = 'PLAYER_MOVE';
export const PLAYER_DROP   = 'PLAYER_DROP';
export const PLAYER_RESET  = 'PLAYER_RESET';
export const UPDATE_SCORE  = 'UPDATE_SCORE';
export const RESET_SCORE   = 'RESET_SCORE';
export const SET_PALETTE   = 'SET_PALETTE';

export function playerRotate(direction) {
  return {
    type: PLAYER_ROTATE,
    direction
  };
}

export function playerMove(offset) {
  return {
    type: PLAYER_MOVE,
    offset
  };
}

export function playerDrop(direction = 1) {
  return {
    type: PLAYER_DROP,
    direction
  };
}

export function playerReset() {
  return {
    type: PLAYER_RESET
  };
}

export function updateScore(value) {
  return {
    type: UPDATE_SCORE,
    value
  };
}

export function resetScore() {
  return {
    type: RESET_SCORE
  };
}

export function setPalette(index) {
  return {
    type: SET_PALETTE,
    index
  };
}
