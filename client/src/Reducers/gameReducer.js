import {
  COLLISION,
  GET_NEXT_SHAPE,
  LEVEL_UP,
  PAUSE,
  RAISE_FLOOR,
  RESET_GAME,
  SCREEN_UPDATE,
} from '../constants';

import { setBoundry, getNewOccupiedCells, getNewBoundary } from '../utils';

const initialState = {
  timerInterval: 700,
  paused: false,
  nextShape: '',
  canvas: {
    canvasMajor: {
      width: 300,
      height: 600,
    },
    canvasMinor: {
      width: 210,
      height: 150,
    },
  },
  points: {
    totalLinesCleared: 0,
    level: 0,
    levelUp: 5,
  },
  rubble: {
    occupiedCells: [],
    winRows: null,
    boundaryCells: [],
  },
  activeShape: {
    name: 'shapeZ',
    unitBlockSize: 30,
    xPosition: 0,
    yPosition: 0,
    unitVertices: [],
    absoluteVertices: [],
    boundingBox: [],
    rotationStage: 0,
    cells: [],
  },
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_GAME:
      return {
        ...initialState,
        rubble: {
          ...initialState.rubble,
          boundaryCells: setBoundry(state.activeShape, initialState.canvas.canvasMajor),
        },
      };

    case LEVEL_UP:
      return {
        ...state,
        timerInterval: state.timerInterval - action.payload,
      };

    case PAUSE:
      return {
        ...state,
        paused: action.payload,
      };

    case GET_NEXT_SHAPE:
      return {
        ...state,
        nextShape: action.payload,
      };

    case SCREEN_UPDATE:
      return {
        ...state,
        activeShape: action.payload.activeShape,
        rubble: action.payload.rubble,
        paused: action.payload.paused,
      };

    case RAISE_FLOOR:
      return {
        ...state,
        rubble: {
          ...state.rubble,
          occupiedCells: getNewOccupiedCells(action.payload),
          boundaryCells: getNewBoundary(action.payload, state),
          winRows: null,
        },
      };

    case COLLISION:
      return {
        ...state,
        rubble: action.payload.rubble,
        points: action.payload.points,
      };

    default:
      return state;
  }
};

export default gameReducer;
