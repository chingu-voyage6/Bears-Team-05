import { INITIALIZE_GAME, LEVEL_UP, PAUSE,
  GET_NEXT_SHAPE, SCREEN_UPDATE, LOCATE_SHAPE, COLLISION } from '../constants/index';


const initializeBoundry = (unitBlockSize, width, height) => {
  const initialBoundry = [];
  const blocksPerRow = width / unitBlockSize;
  const blocksPerColumn = height / unitBlockSize;
  for (let i = 0; i < blocksPerRow; i += 1) {
    initialBoundry.push(`${i}-${blocksPerColumn}`);
  }
  return initialBoundry;
};
const initialState = { // determine what needs to go into state, a very small portion here
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
  rubble: {// all screen info of rubble
    occupiedCells: [],
    winRows: null,
  },
  activeShape: {// all geometric info of active shape
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


export const gameReset = () => {
  initialState.rubble.boundaryCells = initializeBoundry(
    initialState.activeShape.unitBlockSize,
    initialState.canvas.canvasMajor.width,
    initialState.canvas.canvasMajor.height,
  );
  return (
    {
      type: INITIALIZE_GAME,
      payload: initialState,
    }
  );
};

export const speedUp = () => (
  {
    type: LEVEL_UP,
    payload: 150,
  }
);

export const pause = status => (
  {
    type: PAUSE,
    payload: status,
  }
);

export const nextShape = shape => (
  {
    type: GET_NEXT_SHAPE,
    payload: shape,
  }
);

export const updateScreen = data => (
  {
    type: SCREEN_UPDATE,
    payload: data,
  }
);

export const locateShape = locatedShape => (
  {
    type: LOCATE_SHAPE,
    payload: locatedShape,
  }
);

export const collide = data => (
  {
    type: COLLISION,
    payload: data,
  }
);
