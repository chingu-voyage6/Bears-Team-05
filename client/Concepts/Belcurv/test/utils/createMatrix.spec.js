'use strict';

/* ================================= SETUP ================================= */

import { assert }   from 'chai';
import createMatrix from '../../src/utils/createMatrix';


/* ================================= TESTS ================================= */

describe('createMatrix utility', () => {

  it('should create a 3x3 matrix', () => {
    const expected = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    assert.deepEqual(createMatrix(3, 3), expected);
  });

  it('should create a 4x10 matrix', () => {
    const expected = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    assert.deepEqual(createMatrix(4, 10), expected);
  });

  it('should create a 10x2 matrix', () => {
    const expected = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    assert.deepEqual(createMatrix(10, 2), expected);
  });

});
