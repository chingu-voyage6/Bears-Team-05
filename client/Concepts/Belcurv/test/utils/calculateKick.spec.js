'use strict';

/* ================================= SETUP ================================= */

import { assert }    from 'chai';
import calculateKick from '../../src/utils/calculateKick';

const arena = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 6],
  [0, 0, 2, 0, 0, 0, 6],
  [0, 0, 2, 0, 0, 0, 6],
  [0, 0, 2, 0, 0, 0, 6],
  [0, 0, 2, 0, 0, 0, 6],
  [0, 0, 2, 0, 0, 0, 6]
];

const player = {
  pos : { x : 0, y : 0 },
  matrix : [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
};


/* ================================= TESTS ================================= */


describe('calculateKick utility', () => {

  beforeEach(() => {
    player.pos = { x : 0, y : 0 };
  });

  it('should return 1 when trying to rotate against left side', () => {
    player.pos.x = -2;
    assert.equal(calculateKick(player, arena), 2);
  });

  it('should return -1 when trying to rotate against right side', () => {
    player.pos.x = 5;
    assert.equal(calculateKick(player, arena), -2);
  });

  it('should return -1 when trying to rotate next to left of a piece', () => {
    player.pos = { x: 4, y: 2 };
    assert.equal(calculateKick(player, arena), -2);
  });

  it('should return 1 when trying to rotate next to right of a piece', () => {
    player.pos = { x: 1, y: 2 };
    assert.equal(calculateKick(player, arena), 1);
  });

  it('should return 0 when piece cannot fit between arena/rubble', () => {
    player.pos = { x: 0, y: 6 };
    assert.equal(calculateKick(player, arena), 0);
  });

});
