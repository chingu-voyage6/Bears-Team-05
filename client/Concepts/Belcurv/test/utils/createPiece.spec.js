'use strict';

/* ================================= SETUP ================================= */

import { assert }  from 'chai';
import createPiece from '../../src/utils/createPiece';


/* ================================= TESTS ================================= */

describe('createPiece utility', () => {

  it('should create a "T" piece', () => {
    const expected = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ];
    assert.deepEqual(createPiece('T'), expected);
  });
  
  it('should create a "O" piece', () => {
    const expected = [
      [2, 2],
      [2, 2]
    ];
    assert.deepEqual(createPiece('O'), expected);
  });

  it('should create a "L" piece', () => {
    const expected = [
      [0, 0, 3],
      [3, 3, 3],
      [0, 0, 0]
    ];
    assert.deepEqual(createPiece('L'), expected);
  });

  it('should create a "J" piece', () => {
    const expected = [
      [4, 0, 0],
      [4, 4, 4],
      [0, 0, 0]
    ];
    assert.deepEqual(createPiece('J'), expected);
  });

  it('should create a "I" piece', () => {
    const expected = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [5, 5, 5, 5],
      [0, 0, 0, 0]
    ];
    assert.deepEqual(createPiece('I'), expected);
  });

  it('should create a "S" piece', () => {
    const expected = [
      [0, 6, 6],
      [6, 6, 0],
      [0, 0, 0]
    ];
    assert.deepEqual(createPiece('S'), expected);
  });

  it('should create a "Z" piece', () => {
    const expected = [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0]
    ];
    assert.deepEqual(createPiece('Z'), expected);
  });

});
