/**
 * Finds the first row where a piece has non-zero values
 * @param    {Array}   matrix   The player piece matrix
 * @returns  {Number}           The 1st row where matrix has non-zero values
*/
const findFirstRow = (matrix) => {
  for (let y = 0; y < matrix.length; y++) {
    if (matrix[y].some(x => x > 0)) {
      return y;
    }
  }
};

export default findFirstRow;
