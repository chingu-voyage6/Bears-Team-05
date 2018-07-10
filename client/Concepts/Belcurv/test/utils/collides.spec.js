'use strict';

/* ================================= SETUP ================================= */

import { assert } from 'chai';
import collides   from '../../src/utils/collides';

const arena = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 1],
  [0, 0, 0, 1],
  [0, 0, 0, 1],
  [0, 0, 0, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1]
];

const player = {
  pos : { x : 0, y : 0 },
  matrix : [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ]
};

/* ================================= TESTS ================================= */

describe('collides utility', () => {

  beforeEach(() => {
    player.pos = { x : 0, y : 0 };
  });

  it('should be a function', () => {
    assert.isFunction(collides);
  });

  it('should return false if player does not collide with rubble', () => {
    const result = collides(arena, player);
    assert.isFalse(result);
  });

  it('should return false if player does not collide with rubble', () => {
    player.pos = { x : 0, y : 3 };
    const result = collides(arena, player);
    assert.isFalse(result);
  });

  it('should return false if player does not collide with rubble', () => {
    player.pos = { x : 1, y : 1 };
    const result = collides(arena, player);
    assert.isFalse(result);
  });

  it('should return true when player collides with rubble', () => {
    player.pos = { x : 1, y : 3 };
    const result = collides(arena, player);
    assert.isTrue(result);
  });

  it('should return true when player collides with rubble', () => {
    player.pos = { x : 0, y : 7 };
    const result = collides(arena, player);
    assert.isTrue(result);
  });

  it('should return true when player collides with rubble', () => {
    player.pos = { x : 1, y : 2 };
    const result = collides(arena, player);
    assert.isTrue(result);
  });

});
