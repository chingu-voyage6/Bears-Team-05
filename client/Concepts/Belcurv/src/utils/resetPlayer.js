import createPiece  from './createPiece';
import findFirstRow from './findFirstRow';

/**
 * picks a piece at random,
 * resets player x/y position
 * @param    {Object}   player   Player object to update
 * @param    {Object}   arena    Arena. We need its width to center new piece
 * @returns  {Object}            Updated player object
*/
const resetPlayer = (player, arena) => {
  const pieces = 'ILJOTSZ';
  const playa  = Object.assign({}, player, { matrix: [], pos: { } });
  playa.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
  playa.pos.y  = 0 - findFirstRow(playa.matrix);
  playa.pos.x  = (arena[0].length / 2 | 0) - (playa.matrix[0].length / 2 | 0);
  
  // console.log(player);
  return playa;
};

export default resetPlayer;
