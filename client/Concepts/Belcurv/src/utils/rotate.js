/**
 * Rotates player matrix (returns a new array)
 * CW: transpose all rows to columns, then reverse the collumns.
 * CCW: transpose all rows to columns, then reverse the rows.
 * @param   {Array}    matrix      A 2D matrix, for ex: from player object
 * @param   {Number}   direction   Integer; 1 = CW, -1 = CCW
 * @returns {Array}                Rotated 2D tetromino matrix
*/
const rotate = (matrix, direction) => {
  const newMatrix = matrix.map(row => row.slice());
  
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      newMatrix[x][y] = matrix[y][x];
    }
  }
  if (direction > 0) {
    // clockwise; reverse columns (eg, reverse all row elements)
    newMatrix.forEach(row => row.reverse());
  } else {
    // counter-clockwise; reverse all rows
    newMatrix.reverse();
  }

  return newMatrix;
};

export default rotate;
