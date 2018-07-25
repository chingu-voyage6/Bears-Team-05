/**
 * Generate boundary cells for rubble
 * @param    {Object}   unitBlockSize   Block size from state.activeShape
 * @param    {Number}   width           Width from state.canvas.canvasMajor
 * @param    {Number}   height          Height from state.canvas.canvasMajor
 * @param    {Number}   rowHeight       Row height; defaults to 1
 * @returns  {Array}
*/
export const setBoundry = ({ unitBlockSize }, { width, height }, rowHeight = 1) => {
  const boundry = [];
  const blocksPerRow = width / unitBlockSize;
  const blocksPerColumn = height / unitBlockSize;
  for (let j = 0; j < rowHeight; j += 1) {
    for (let i = 0; i < blocksPerRow; i += 1) {
      boundry.push(`${i}-${blocksPerColumn - j}`);
    }
  }
  return boundry;
};


/**
 * Creates a deep copy of an object. Fails when properties are methods or dates
 * @param    {Object}   object   Input object to copy
 * @returns  {Object}            The copy
*/
export const deepCopy = object => JSON.parse(JSON.stringify(object));


/**
 * Generate new occupiedCells to update Redux state
 * @param    {Object}   oldRubble   Existing rubble object from redux store
 * @returns  {Array}                New array of occupied cells
*/
export const getNewOccupiedCells = oldRubble =>
  oldRubble.occupiedCells.map((c) => {
    const [oldX, oldY] = c[0].split('-');
    return ([`${oldX}-${oldY - 1}`, c[1]]);
  });


/**
 * Generate new boundaryCells to update Redux state
 * @param    {Object}   oldRubble     Existing rubble object from redux state
 * @param    {Object}   activeShape   Shape object from redux state
 * @param    {Object}   canvas        Canvas object from redux state
 * @returns  {Array}                  New boundary
*/
export const getNewBoundary = (oldRubble, { activeShape, canvas }) => {
  const yBoundary = oldRubble.boundaryCells.map(c => Number(c.split('-')[1]));
  const oldHeight = Array.from(new Set(yBoundary)).length;
  return setBoundry(activeShape, canvas.canvasMajor, oldHeight + 1);
};
