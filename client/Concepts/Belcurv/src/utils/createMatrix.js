/**
 * Creates an empty arena from specified dimensions
 * @param    {Number}   width    Integer width of the arena in squares
 * @param    {Number}   height   Integer height of the arena in squares
 * @returns  {Array}             2D zero-filled arena matrix
*/
const createMatrix = (width, height) => {
  const matrix = [];
  while (height--) {
    matrix.push(new Array(width).fill(0));
  }
  return matrix;
};

export default createMatrix;
