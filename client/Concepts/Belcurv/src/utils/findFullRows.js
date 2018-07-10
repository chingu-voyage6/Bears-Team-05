/**
 * Finds full rows in arena
 * @param    {Array}   arena   Game arena
 * @returns  {Array}           Indices of full rows
*/
const findFullRows = (arena) => {
  let rowIndices = [];

  outer: for (let y = arena.length - 1; y >= 0; --y) {
    for (let x = 0; x < arena[y].length; x++) {
      // if a row is NOT filled, or is filled with X's, continue
      if (arena[y][x] === 0 || arena[y][x] === 'X') {
        continue outer;
      }
    }
    // else, push the y index to rowIndices
    rowIndices.push(y);
  }
  return rowIndices;
};

export default findFullRows;
