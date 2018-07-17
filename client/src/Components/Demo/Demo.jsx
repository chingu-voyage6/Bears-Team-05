import React from 'react';
import PropTypes from 'prop-types';
import './Demo.css';

// connect to redux and get action creators
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gameReset, nextShape, updateScreen,
  locateShape, collide, speedUp, pause } from '../../Actions/tetris';

// custom functions
import tetrisShapes from './scripts/shapes';
import shapeLocator from './scripts/locateShape';
import runCollision from './scripts//collision';
import { clearCanvas, drawShape, winRubble, drawNextShape } from './scripts/canvas';

// reads from store
const mapStateToProps = state => state;

// writes to store
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    gameReset,
    nextShape,
    updateScreen,
    locateShape,
    collide,
    speedUp,
    pause,
  }, dispatch),
});

// end redux

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.canvasMajor = React.createRef();
    this.canvasMinor = React.createRef();
  }
  componentDidMount() {
    this.resetBoard();
  }
  componentDidUpdate(prevProps) {
    if (Object.keys(prevProps.game).length) {
      if ((this.props.game.points.level !== prevProps.game.points.level) &&
          (this.props.game.timerInterval > 250)) {
        this.endTick('Level Change');
        this.speedUp();
      }
    }
  }

  componentWillUnmount() {
    this.endTick('componentWillUnmount');
  }
  getSideBlock = (direction) => {
    const cellCheck = this.props.game.activeShape.cells.map((c) => {
      if (direction === 'L') {
        return [c[0] - 1, c[1]].join('-');
      }
      return [c[0] + 1, c[1]].join('-');
    });
    const occupiedCellLocations = this.props.game.rubble.occupiedCells.map(c => c[0]);
    const blocked = cellCheck.filter(c => occupiedCellLocations.includes(c));
    return !!blocked.length;
  }

  getRandShapeName = () => {
    const shapeList = ['shapeL', 'shapeZ', 'shapeT', 'shapeI', 'shapeJ', 'shapeO', 'shapeS'];
    const randNum = Math.floor(Math.random() * (shapeList.length));
    return shapeList[randNum];
  }
  speedUp = async () => {
    await this.props.actions.speedUp();
    this.startTick();
  }
  resetBoard =async () => { // clear and restart
    await this.props.actions.gameReset();
    const canvasMajor = this.canvasMajor.current;
    const canvasMinor = this.canvasMinor.current;
    canvasMajor.focus();
    canvasMajor.style.backgroundColor = 'black';
    canvasMinor.style.backgroundColor = 'black';
    // setting context so it can be accesible everywhere in the class , maybe a better way ?
    this.canvasContextMajor = canvasMajor.getContext('2d');
    this.canvasContextMinor = canvasMinor.getContext('2d');
    if (this.downInterval) this.endTick('reset Board');
    this.startTick();
  }

  newShape = async () => {
    const randomShape = this.props.game.nextShape ?
      this.initializeShape(this.props.game.nextShape) :
      this.initializeShape(this.getRandShapeName());
    const newShape = this.getRandShapeName();
    const nextShapeInfo = this.initializeShape(newShape);
    await this.props.actions.nextShape(newShape);
    drawNextShape(this.canvasContextMinor, nextShapeInfo, this.props.game);

    let copyOfActiveShape = Object.assign({}, this.props.game.activeShape);
    // I and O shapes need right offset
    if (randomShape[0] !== 'shapeI' && randomShape[0] !== 'shapeO') {
      copyOfActiveShape.xPosition = (this.props.game.canvas.canvasMajor.width / 2) +
      (this.props.game.activeShape.unitBlockSize / 2);
    } else {
      copyOfActiveShape.xPosition = (this.props.game.canvas.canvasMajor.width / 2);
    }
    copyOfActiveShape = randomShape;
    copyOfActiveShape.yPosition = -1 * randomShape.boundingBox[2];

    this.updateScreen(copyOfActiveShape);
  }
  startTick = () => {
    this.abortCounter = 0;
    if (this.downInterval)clearInterval(this.downInterval);
    this.newShape();
    this.downInterval = setInterval(() => {
      this.tick();
    }, this.props.game.timerInterval);
  }
  endTick = async (c) => {
    this.abortCounter += 1;
    console.log(`Called by ${c} , attempts = ${this.abortCounter}`);
    clearInterval(this.downInterval);
    await this.props.actions.pause(true);
  }
  tick = () => {
    if (this.props.game.paused) return;
    // handle y direction movements
    const copyOfActiveShape = Object.assign({}, this.props.game.activeShape);
    // console.log(`bbox @ tick ${this.props.game.activeShape.boundingBox}`)
    copyOfActiveShape.yPosition += this.props.game.activeShape.unitBlockSize;
    this.updateScreen(copyOfActiveShape);
  }

  updateScreen = async (updatedShape) => {
    clearCanvas(this.canvasContextMajor, this.props.game); // clear canvasMajor
    const drawReturn = drawShape(this.canvasContextMajor, updatedShape, this.props.game);
    const copyOfRubble = Object.assign({}, this.props.game.rubble);
    copyOfRubble.winRows = null; // need to reset back to null incase of previous win
    const data = {
      activeShape: drawReturn,
      rubble: copyOfRubble,
      paused: false,
    };
    await this.props.actions.updateScreen(data);
    this.screenMatrix();
  }

  screenMatrix = () => { // sweep playable area
    const locatedShape = shapeLocator(
      this.canvasContextMajor,
      this.props.game.canvas.canvasMajor.width,
      this.props.game.canvas.canvasMajor.height,
      this.props.game.activeShape, false,
    );
    this.collisionCheck(locatedShape);
  }


  initializeShape = (shapeName) => {
    // finding intital y bound so it does not get cutoff
    const x = (shapeName !== 'shapeI' && shapeName !== 'shapeO') ?
      (this.props.game.canvas.canvasMajor.width / 2) +
      (this.props.game.activeShape.unitBlockSize / 2) :
      this.props.game.canvas.canvasMajor.width / 2;

    const initialAbsoluteVertices = tetrisShapes.getAbsoluteVertices(
      this.props.game.activeShape.unitBlockSize,
      x,
      0,
      tetrisShapes[shapeName].vertices,
    );

    const initialBoundingBox = tetrisShapes.onBoundingBox(initialAbsoluteVertices);
    const activeShape = {
      name: shapeName,
      unitBlockSize: 30,
      xPosition: x,
      yPosition: 0,
      unitVertices: tetrisShapes[shapeName].vertices,
      absoluteVertices: initialAbsoluteVertices,
      boundingBox: initialBoundingBox,
      rotationStage: 0,
      cells: [],
    };
    return activeShape;
  }

  collisionCheck = async (testShape) => {
    const copyOfPoints = Object.assign({}, this.props.game.points);
    const copyOfRubble = Object.assign({}, this.props.game.rubble);
    const collisionResult = runCollision(this.props.game, testShape);

    if (collisionResult) { // found collision
      // check if game space is all occupied
      if (collisionResult === 'done') {
        this.endTick('collision check - game done');
        return 'done';
      }
      // retreive total rows cleared (if any) and test for time interval reduction
      const rowsCleared = collisionResult[1] ? collisionResult[1].length : 0;
      // assign points if winner found
      copyOfPoints.totalLinesCleared = this.props.game.points.totalLinesCleared + rowsCleared;
      copyOfPoints.level = Math.floor(copyOfPoints.totalLinesCleared /
         (this.props.game.points.levelUp));
      // assign new rubble coordinates
      [copyOfRubble.occupiedCells, copyOfRubble.winRows] = collisionResult;
      const collisionData = {
        rubble: copyOfRubble,
        points: copyOfPoints,
      };
      if (rowsCleared) { // winner found
        // end tick to play animation and start tick back after animation is over
        this.endTick('collision check - winning row');
        clearCanvas(this.canvasContextMajor, this.props.game); // clear canvasMajor
        winRubble(
          this.canvasContextMajor,
          this.props.game.activeShape,
          this.props.game,
          collisionResult[1],
        );
        await this.props.actions.collide(collisionData);
        const inter = setTimeout(() => {
          this.startTick();
          clearInterval(inter);
        }, 250);
      } else { // no winner found just set state with current rubble
        await this.props.actions.collide(collisionData);
        this.newShape();
      }
    } else {
      await this.props.actions.locateShape(testShape);
    }
    return null;
  }
  handlePause = async () => {
    this.canvasMajor.current.focus();
    await this.props.actions.pause(!this.props.game.paused);
  }
  /* handle all player movements below */
  playerMoves = (e) => {
    if (this.props.game.paused) return;
    const left = e.keyCode === 37;
    const right = e.keyCode === 39;
    const up = e.keyCode === 38;
    const down = e.keyCode === 40;


    if (!(left || right || up || down)) return; // do nothing for any other keypress

    // check X boundaries
    const leftOutOfBound = left && (this.props.game.activeShape.boundingBox[0] -
       this.props.game.activeShape.unitBlockSize) < 0;
    const rightOutOfBound = right && (this.props.game.activeShape.boundingBox[1] +
      this.props.game.activeShape.unitBlockSize) > this.props.game.canvas.canvasMajor.width;
    if (leftOutOfBound || rightOutOfBound) return;

    const copyOfActiveShape = Object.assign({}, this.props.game.activeShape);
    if (left) {
      if (this.getSideBlock('L')) return;
      copyOfActiveShape.xPosition -= this.props.game.activeShape.unitBlockSize;
      this.updateScreen(copyOfActiveShape);
    } else if (right) {
      if (this.getSideBlock('R')) return;
      copyOfActiveShape.xPosition += this.props.game.activeShape.unitBlockSize;
      this.updateScreen(copyOfActiveShape);
    } else if (down) this.tick();
    else this.rotation(this.props.game.activeShape);
  }

  rotation = (active) => {
    const unitVerticesAfterRotation = tetrisShapes.onRotate(active.unitVertices);
    const boundingBox = tetrisShapes.onBoundingBox(tetrisShapes.getAbsoluteVertices(
      this.props.game.activeShape.unitBlockSize,
      this.props.game.activeShape.xPosition,
      this.props.game.activeShape.yPosition,
      unitVerticesAfterRotation,
    ));
    const absoluteVertices = tetrisShapes.getAbsoluteVertices(
      this.props.game.activeShape.unitBlockSize,
      this.props.game.activeShape.xPosition,
      this.props.game.activeShape.yPosition,
      unitVerticesAfterRotation,
    );

    const rotatedShape = Object.assign({}, this.props.game.activeShape);
    rotatedShape.unitVertices = unitVerticesAfterRotation;
    rotatedShape.rotationStage = rotatedShape.rotationStage > 2 ?
      0 :
      rotatedShape.rotationStage + 1;
    rotatedShape.cells = [];
    rotatedShape.absoluteVertices = absoluteVertices;
    rotatedShape.boundingBox = boundingBox;

    // crude wall kicks, ideally should translate with a recursive function
    if (
      boundingBox[0] < 0 ||
      boundingBox[1] > this.props.game.canvas.canvasMajor.width
    ) { // side wall kicks
      const translateUnits = this.props.game.activeShape.name === 'shapeI' ? 2 : 1;
      if (boundingBox[0] < 0) { // translate to the left
        rotatedShape.xPosition += (translateUnits * this.props.game.activeShape.unitBlockSize);
      } else { // translate to the right
        rotatedShape.xPosition -= (translateUnits * this.props.game.activeShape.unitBlockSize);
      }
    }
    // locate shape to check collision on rotation, if collision detected do not rotate shape
    const locatedShape = shapeLocator(
      this.canvasContextMajor,
      this.props.game.canvas.canvasMajor.width,
      this.props.game.canvas.canvasMajor.height,
      rotatedShape, false,
    );
    if (!runCollision(this.props.game, locatedShape)) this.updateScreen(rotatedShape);
  }


  render() {
    if (Object.keys(this.props.game).length) {
      return (
        <div className="democontainer">
          <div className="controls">
            <canvas
              ref={this.canvasMinor}
              width={this.props.game.canvas.canvasMinor.width}
              height={this.props.game.canvas.canvasMinor.height}
              tabIndex="0"
            />
            <button className="reset" onClick={() => this.resetBoard()}>
              Reset
            </button>
            <label htmlFor="test">Lines Cleared = {this.props.game.points.totalLinesCleared}</label>
            <label htmlFor="test">Level = {this.props.game.points.level}</label>
            <label htmlFor="test">
              Pause:
              <input
                name="Pausing"
                type="checkbox"
                checked={this.props.game.paused}
                onChange={this.handlePause}
              />
            </label>
          </div>
          <canvas
            ref={this.canvasMajor}
            width={this.props.game.canvas.canvasMajor.width}
            height={this.props.game.canvas.canvasMajor.height}
            tabIndex="0"
            onKeyDown={e => this.playerMoves(e)}
          />
        </div>
      );
    }

    return null;
  }

}

Demo.defaultProps = {
  actions: {},
  game: {},
};

Demo.propTypes = {
  actions: PropTypes.shape({
    gameReset: PropTypes.func,
    nextShape: PropTypes.func,
    updateScreen: PropTypes.func,
    locateShape: PropTypes.func,
    collide: PropTypes.func,
    speedUp: PropTypes.func,
    pause: PropTypes.func,
  }),
  game: PropTypes.objectOf(PropTypes.any),
};
export default connect(mapStateToProps, mapDispatchToProps)(Demo);
