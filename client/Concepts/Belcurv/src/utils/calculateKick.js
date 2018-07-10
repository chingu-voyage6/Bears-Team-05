import collides from './collides';

/**
 * "Wiggles" a copy piece left/right by applying an offset until either
 * a non-colliding position is found, or the offset exceeds the
 * piece's width.
 * @param    {Object}   player   Player object
 * @param    {Array}    arena    Arena matrix
 * @returns  {Number}            X offset, or 0 if no valid position found
*/
const calculateKick = (player, arena) => {

  const playerCopy = JSON.parse(JSON.stringify(player));
  const initialX   = playerCopy.pos.x;
  let offset       = 0;

  while (collides(arena, playerCopy)) {

    offset = (offset <= 0) ? -(offset - 1) : -offset;

    // set x to initial value + offset
    playerCopy.pos.x = initialX + offset;
    
    // if offset gte than the piece width ...
    if (offset >= playerCopy.matrix[0].length) {
      return 0;  // ... piece cannot be kicked either direction
    }
  }

  return offset;
};

export default calculateKick;
