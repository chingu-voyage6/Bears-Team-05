'use strict';

/* ================================= SETUP ================================= */

import { assert }   from 'chai';
import rotate from '../../src/utils/rotate';


/* ================================= TESTS ================================= */

describe('rotateMatrix utility', () => {

  it('should rotate a 2x2 matrix clockwise', () => {
    const matrix = [
      [0, 1],
      [1, 1]
    ];
    const expected = [
      [1, 0],
      [1, 1]
    ];
    assert.deepEqual(rotate(matrix, 1), expected);
  });

  it('should rotate a 2x2 matrix counter-clockwise', () => {
    const matrix = [
      [1, 1],
      [1, 1]
    ];
    const expected = [
      [1, 1],
      [1, 1]
    ];
    assert.deepEqual(rotate(matrix, -1), expected);
  });

  it('should rotate a 3x3 matrix clockwise', () => {
    const matrix = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ];
    const expected = [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0]
    ];
    assert.deepEqual(rotate(matrix, 1), expected);
  });

  it('should rotate a 3x3 matrix counter-clockwise', () => {
    const matrix = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ];
    const expected = [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0]
    ];
    assert.deepEqual(rotate(matrix, -1), expected);
  });

  it('should rotate a 3x3 matrix clockwise', () => {
    const matrix = [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ];
    const expected = [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1]
    ];
    assert.deepEqual(rotate(matrix, 1), expected);
  });

  it('should rotate a 3x3 matrix counter-clockwise', () => {
    const matrix = [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ];
    const expected = [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0]
    ];
    assert.deepEqual(rotate(matrix, -1), expected);
  });

  it('should rotate a 4x4 matrix clockwise', () => {
    const matrix = [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ];
    const expected = [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    assert.deepEqual(rotate(matrix, 1), expected);
  });

  it('should rotate a 4x4 matrix counter-clockwise', () => {
    const matrix = [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ];
    const expected = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0]
    ];
    assert.deepEqual(rotate(matrix, -1), expected);
  });

});