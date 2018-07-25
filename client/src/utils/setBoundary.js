/**
 * Generate boundary cells for rubble
 * @param    {Object}   unitBlockSize   Block size from state.activeShape
 * @param    {Number}   width           Width from state.canvas.canvasMajor
 * @param    {Number}   height          Height from state.canvas.canvasMajor
 * @param    {Number}   rowHeight       Row height; defaults to 1
 * @returns  {Array}
*/
export default ({ unitBlockSize }, { width, height }, rowHeight = 1) => {
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
