'use strict';

/* ================================= SETUP ================================= */

import { assert } from 'chai';
import { resetPlayer, createMatrix, findFirstRow } from '../../src/utils';

const arena  = createMatrix(12, 20);
const player = {
  score  : 100,
  matrix : [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
  pos    : { x : 5, y : 15 }
};


/* ================================= TESTS ================================= */

describe('resetPlayer utility', () => {

  it('should maintain the player\'s score', () => {
    const newPlayer = resetPlayer(player, arena);
    assert.notEqual(player, newPlayer);
    assert.equal(player.score, newPlayer.score);
  });

  it('should set player\'s matrix', () => {
    const newPlayer = resetPlayer(player, arena);
    assert.notEqual(player, newPlayer);
    assert.isArray(newPlayer.matrix);
  });

  it('should reset player\'s y position to firstRow', () => {
    const newPlayer = resetPlayer(player, arena);
    const firstRow  = findFirstRow(newPlayer.matrix);
    assert.notDeepEqual(player.pos, newPlayer.pos);
    assert.equal(newPlayer.pos.y, 0 - firstRow);
  });


});