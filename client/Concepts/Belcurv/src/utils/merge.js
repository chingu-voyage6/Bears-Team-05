/**
 * Copies all positional values from player matrix to arena matrix
 * @param    {Object}   player   Player object w/ pos & matrix properties
 * @param    {Array}    arena    2D arena matrix
 * @returns  {Array}             Updated arena matrix
*/
const merge = (player, arena) => {
  // copy existing arena
  const newArena = arena.map(row => row.slice());

  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        newArena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });

  return newArena;
};

export default merge;
