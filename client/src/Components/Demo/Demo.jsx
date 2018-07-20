import React from 'react';
import PropTypes from 'prop-types';
import './Demo.css';

// connect to redux and get action creators
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gameReset, nextShape, updateScreen,
  raiseFloor, collide, speedUp, pause } from '../../Actions/tetris';

// custom functions
import tetrisShapes from './scripts/shapes';
import shapeLocator from './scripts/locateShape';
import { runCollision } from './scripts/collision';
import { clearCanvas, drawShape, drawRuble, winRubble, drawNextShape, drawBoundary } from './scripts/canvas';
import playerMoves from './scripts/player';
// react Components
import Controls from './controls';

// reads from store
const mapStateToProps = state => state;

// writes to store
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    gameReset,
    nextShape,
    updateScreen,
    raiseFloor,
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
        const l = setTimeout(() => {
          this.endTick('Level Change');
          this.speedUp();
          clearTimeout(l);
        }, 250);
      }
      if (this.props.game.rubble.boundaryCells.length !==
        prevProps.game.rubble.boundaryCells.length) {
        this.drawFloor();
      }
    }
  }

  componentWillUnmount() {
    this.endTick('componentWillUnmount');
  }

  resetBoard =async () => {
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

  startTick = (floorRedraw = false) => {
    this.abortCounter = 0;
    if (this.downInterval)clearInterval(this.downInterval);
    this.newShape(floorRedraw);
    this.downInterval = setInterval(() => {
      this.tick();
    }, this.props.game.timerInterval);
  }

  tick = () => {
    if (this.props.game.paused) return;
    // handle y direction movements
    const copyOfActiveShape = Object.assign({}, this.props.game.activeShape);
    // console.log(`bbox @ tick ${this.props.game.activeShape.boundingBox}`)
    copyOfActiveShape.yPosition += this.props.game.activeShape.unitBlockSize;
    this.drawScreen(copyOfActiveShape);
  }

  endTick = async (c) => {
    this.abortCounter += 1;
    console.log(`Called by ${c} , attempts = ${this.abortCounter}`);
    clearInterval(this.downInterval);
    await this.props.actions.pause(true);
  }

  speedUp = async () => {
    await this.props.actions.speedUp();
    this.startTick();
  }

  newShape = async (floorRedraw = false) => {
    const randomShape = this.props.game.nextShape ?
      this.initializeShape(this.props.game.nextShape) :
      this.initializeShape(tetrisShapes.getRandShapeName());
    const newShapeName = tetrisShapes.getRandShapeName();
    const nextShapeInfo = this.initializeShape(newShapeName);
    await this.props.actions.nextShape(newShapeName);
    drawNextShape(this.canvasContextMinor, nextShapeInfo, this.props.game);

    this.drawScreen(randomShape, floorRedraw);
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
      yPosition: -1 * initialBoundingBox[2],
      unitVertices: tetrisShapes[shapeName].vertices,
      absoluteVertices: initialAbsoluteVertices,
      boundingBox: initialBoundingBox,
      rotationStage: 0,
      cells: [],
    };
    return activeShape;
  }

  drawFloor = async () => {
    await this.props.actions.pause(true);
    const yBoundary = this.props.game.rubble.boundaryCells.map(c => Number(c.split('-')[1]));
    const yUnique = Array.from(new Set(yBoundary));
    if (yUnique.length > 1) {
      drawBoundary(this.canvasContextMajor, this.props.game);
    }
    drawRuble(this.canvasContextMajor, this.props.game);
    await this.props.actions.pause(false);
  }

  drawScreen = async (updatedShape, floorRedraw) => {
    clearCanvas(this.canvasContextMajor, this.props.game); // clear canvasMajor
    const shapeToDraw = updatedShape;
    [shapeToDraw.boundingBox, shapeToDraw.absoluteVertices] = tetrisShapes.getDims(updatedShape);
    drawShape(this.canvasContextMajor, shapeToDraw, this.props.game);
    if (this.props.game && this.props.game.rubble.occupiedCells.length) {
      drawRuble(this.canvasContextMajor, this.props.game);
    }
    if (floorRedraw) {
      this.drawFloor();
    }
    const copyOfRubble = Object.assign({}, this.props.game.rubble);
    copyOfRubble.winRows = null; // need to reset back to null incase of previous win

    // Locate Shape on screen and then set .cell prop of activeShape
    const locatedShape = shapeLocator(
      this.canvasContextMajor,
      this.props.game.canvas.canvasMajor.width,
      this.props.game.canvas.canvasMajor.height,
      shapeToDraw, false,
    );

    const data = {
      activeShape: locatedShape,
      rubble: copyOfRubble,
      paused: false,
    };
    // test for collision and update shape
    const collisionVal = await this.collisionCheck(locatedShape);

    if (!collisionVal) await this.props.actions.updateScreen(data);
    // need to redraw the floor if there is a collision with the floor
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
      // retreive total rows cleared (if any)
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
      // checks if collision is with lower boundary and sends parameter to start tick
      const floorRedraw = (collisionResult[2] > 0);
      if (rowsCleared) { // winner found
        // end tick to play animation and start tick back after animation is over
        this.endTick('collision check - Win');
        clearCanvas(this.canvasContextMajor, this.props.game); // clear canvasMajor
        winRubble(
          this.canvasContextMajor,
          this.props.game,
          collisionResult[1],
        );
        await this.props.actions.collide(collisionData);
        const inter = setTimeout(() => {
          this.startTick(floorRedraw);
          clearInterval(inter);
        }, 250);
      } else { // no winner found just set state with current rubble
        this.endTick('collision check - No Win');
        await this.props.actions.collide(collisionData);
        this.startTick(floorRedraw);
      }
    }
    return collisionResult;
  }

  /* Handle Player Events Below */
  handlePause = async () => {
    this.canvasMajor.current.focus();
    await this.props.actions.pause(!this.props.game.paused);
  }

  manualFloorRaise = async () => {
    this.canvasMajor.current.focus();
    clearCanvas(this.canvasContextMajor, this.props.game, true); // clear canvasMajor
    await this.props.actions.raiseFloor(this.props.game.rubble);
  }

  gamePlay = (e) => {
    const ans = (playerMoves(e, this.props.game, this.canvasContextMajor));
    if (ans) {
      if (ans === 'tick') this.tick();
      else this.drawScreen(ans);
    }
  }

  render() {
    if (Object.keys(this.props.game).length) {
      return (
        <div className="democontainer">
          <Controls
            onCanvas={this.canvasMinor}
            onReset={() => this.resetBoard()}
            game={this.props.game}
            onhandlePause={() => this.handlePause}
            onfloorRaise={() => this.manualFloorRaise()}
          />
          <canvas
            ref={this.canvasMajor}
            width={this.props.game.canvas.canvasMajor.width}
            height={this.props.game.canvas.canvasMajor.height}
            tabIndex="0"
            onKeyDown={e => this.gamePlay(e)}
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
    raiseFloor: PropTypes.func,
    collide: PropTypes.func,
    speedUp: PropTypes.func,
    pause: PropTypes.func,
  }),
  game: PropTypes.objectOf(PropTypes.any),
};
export default connect(mapStateToProps, mapDispatchToProps)(Demo);
