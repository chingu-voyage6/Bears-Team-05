import tetrisShapes from './shapes';
import shapeLocator from './locateShape';
import floorPattern from '../../../assets/pattern.bmp';

export const drawGrid = (x, y, occupied, b, ctx) => {
  const canvasContext = ctx;
  const col = occupied ? 'grey' : 'white';
  canvasContext.beginPath();
  canvasContext.lineWidth = '3';
  canvasContext.strokeStyle = col;
  canvasContext.rect(x, y, b, b);
  canvasContext.stroke();
};
export const drawGridSpecial = (x, y, occupied, b, ctx) => {
  const canvasContext = ctx;
  if (x === 0) {
    canvasContext.beginPath();
    canvasContext.lineWidth = '3';
    canvasContext.strokeStyle = 'black';
    canvasContext.rect(x, y, b, b);
    canvasContext.stroke();
    canvasContext.fillStyle = 'black';
    canvasContext.rect(x, y, b, b);
    canvasContext.fill();
  }
};

const drawRuble = (ctx, activeShape, state) => {
  const canvasContext = ctx;
  const b = activeShape.unitBlockSize;

  state.rubble.occupiedCells.forEach((cell) => {
    const [cellString, color] = cell;

    const x = Number(cellString.split('-')[0]);
    const y = Number(cellString.split('-')[1]);
    // filled rects

    canvasContext.fillStyle = color;
    canvasContext.fillRect(x * b, y * b, b, b);
    // draw borders for rubble
    canvasContext.beginPath();
    canvasContext.lineWidth = '3';
    canvasContext.strokeStyle = 'grey';
    canvasContext.rect(x * b, y * b, b, b);
    canvasContext.stroke();
  });
};

export const drawBoundary = (ctx, state) => {
  const yBoundary = state.rubble.boundaryCells.map(c => Number(c.split('-')[1]));
  const boundaryHeight = (Array.from(new Set(yBoundary)).length - 1) *
   state.activeShape.unitBlockSize;
  const yStart = state.canvas.canvasMajor.height - boundaryHeight;
  const img = new Image();
  img.src = floorPattern;
  img.onload = () => {
    const pattern = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, yStart, state.canvas.canvasMajor.width, boundaryHeight);
  };
};

export const drawShape = (ctx, shapeToDraw, state) => {
  const canvasContext = ctx;
  canvasContext.beginPath();
  canvasContext.fillStyle = tetrisShapes[shapeToDraw.name].color;
  canvasContext.moveTo(shapeToDraw.xPosition, shapeToDraw.yPosition);
  shapeToDraw.absoluteVertices.forEach((v) => {
    canvasContext.lineTo(v[0], v[1]);
  });
  canvasContext.lineTo(shapeToDraw.xPosition, shapeToDraw.yPosition);
  canvasContext.fill();
  if (state && state.rubble.occupiedCells.length) {
    drawRuble(canvasContext, shapeToDraw, state);
  }
};

// clear canvas
export const clearCanvas = (canvasContext, state) => {
  const yBoundary = state.rubble.boundaryCells.map(c => Number(c.split('-')[1]));
  const boundaryHeight = (Array.from(new Set(yBoundary)).length - 1) *
   state.activeShape.unitBlockSize;
  const yStart = state.canvas.canvasMajor.height - boundaryHeight;
  canvasContext.clearRect(0, 0, state.canvas.canvasMajor.width, yStart);
};

export const drawNextShape = (ctx, newShape, state) => {
  clearCanvas(ctx, state);
  const initiailizedShape = newShape;
  const canvasWidth = state.canvas.canvasMinor.width;
  const canvasHeight = state.canvas.canvasMinor.height;
  let specialshapes = false;
  if (initiailizedShape.name !== 'shapeI' && initiailizedShape.name !== 'shapeO') {
    initiailizedShape.xPosition = canvasWidth / 2;
    initiailizedShape.yPosition = canvasHeight / 2;
  } else {
    specialshapes = true;
    initiailizedShape.xPosition = (canvasWidth / 2) + (initiailizedShape.unitBlockSize / 2);
    initiailizedShape.yPosition += (canvasHeight / 2);
    initiailizedShape.yPosition -= (initiailizedShape.unitBlockSize / 2);
  }

  [initiailizedShape.boundingBox, initiailizedShape.absoluteVertices] =
   tetrisShapes.getDims(initiailizedShape);
  drawShape(ctx, initiailizedShape);
  shapeLocator(ctx, canvasWidth, canvasHeight, initiailizedShape, false, specialshapes);
};


export const winRubble = (ctx, state, winners) => {
  const canvasContext = ctx;
  const b = state.activeShape.unitBlockSize;
  state.rubble.occupiedCells.forEach((cell) => {
    const [cellString, color] = cell;
    const x = Number(cellString.split('-')[0]);
    const y = Number(cellString.split('-')[1]);
    // filled rects
    if (!winners.includes(y)) {
      // filled rects
      canvasContext.fillStyle = color;
      canvasContext.fillRect(x * b, y * b, b, b);
      // draw borders for rubble
      canvasContext.beginPath();
      canvasContext.lineWidth = '3';
      canvasContext.strokeStyle = 'grey';
      canvasContext.rect(x * b, y * b, b, b);
      canvasContext.stroke();
    }
  });
  const blocksPerRow = state.canvas.canvasMajor.width / b;
  winners.forEach((y) => {
    for (let x = 0; x < blocksPerRow; x += 1) {
      // filled rects
      canvasContext.fillStyle = 'white';
      canvasContext.fillRect(x * b, y * b, b, b);
      // draw borders for rubble
      canvasContext.beginPath();
      canvasContext.lineWidth = '3';
      canvasContext.strokeStyle = 'grey';
      canvasContext.rect(x * b, y * b, b, b);
      canvasContext.stroke();
    }
  });
};
