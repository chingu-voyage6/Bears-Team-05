'use strict';

/* ================================= SETUP ================================= */

import { assert }   from 'chai';
import createMatrix from '../../src/utils/createMatrix';
import merge        from '../../src/utils/merge';

const arena = createMatrix(5, 5);

const player = {
  pos : { x : 0, y : 0 },
  matrix : [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ]
};

/* ================================= TESTS ================================= */

describe('merge utility', () => {

  beforeEach(() => {
    player.pos = { x : 0, y : 0 };
  });

  it('should be a function', () => {
    assert.isFunction(merge);
  });

  it('should merge a player matrix with an arena matrix', () => {
    const expected = [
      [0, 1, 0, 0, 0],
      [1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];
    assert.deepEqual(merge(player, arena), expected);
  });

  it('should merge a player matrix with an arena matrix', () => {
    player.pos.x = 2;
    player.pos.y = 1;
    const expected = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];
    assert.deepEqual(merge(player, arena), expected);
  });

  it('should merge a player matrix with an arena matrix', () => {
    player.pos.x = 2;
    player.pos.y = 3;
    const expected = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 1, 1]
    ];
    assert.deepEqual(merge(player, arena), expected);
  });

});