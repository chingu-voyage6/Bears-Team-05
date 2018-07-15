import { INITIALIZE_GAME } from '../constants/index';


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
    boundaryCells: [],
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

const gameReset = () => (
  {
    type: INITIALIZE_GAME,
    payload: initialState,
  }
);
export default gameReset;
