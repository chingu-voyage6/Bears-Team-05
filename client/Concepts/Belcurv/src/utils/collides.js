/**
 * Checks if the player collides with the arena
 * @param   {Array}    arena    The 2D array of arryas representing the arena.
 * @param   {Object}   player   Our player object.
 * @returns {Boolean}           True if player collides with arena
 */
const collides = (arena, player) => {
  // destructure player's matris and positional offset
  const [plrMatrix, plrPos] = [player.matrix, player.pos];

  // loop over player matrix outer array - the 'y' values
  for (let y = 0; y < plrMatrix.length; y++) {
    // loop over player matrix inner array - the 'x' values
    for (let x = 0; x < plrMatrix[y].length; x++) {

      if (plrMatrix[y][x] !== 0 &&  // check only "on" player matrices

        // for each row in arena, check that player occupies it
        // && that player occupies a square at 'x' in that row
        (arena[y + plrPos.y] && arena[y + plrPos.y][x + plrPos.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
};

export default collides;
