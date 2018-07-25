import {
  COLLISION,
  GET_NEXT_SHAPE,
  LEVEL_UP,
  PAUSE,
  RAISE_FLOOR,
  RESET_GAME,
  SCREEN_UPDATE,
} from '../constants';

export const gameReset = () => ({
  type: RESET_GAME,
});

export const speedUp = () => ({
  type: LEVEL_UP,
  payload: 150,
});

export const pause = status => ({
  type: PAUSE,
  payload: status,
});

export const nextShape = shape => ({
  type: GET_NEXT_SHAPE,
  payload: shape,
});

export const updateScreen = data => ({
  type: SCREEN_UPDATE,
  payload: data,
});

export const raiseFloor = oldRubble => ({
  type: RAISE_FLOOR,
  payload: oldRubble,
});

export const collide = data => ({
  type: COLLISION,
  payload: data,
});
