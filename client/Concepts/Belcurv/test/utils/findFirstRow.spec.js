'use strict';

/* ================================= SETUP ================================= */

import { assert }   from 'chai';
import findFirstRow from '../../src/utils/findFirstRow';


/* ================================= TESTS ================================= */

describe('findFirstRow utility', () => {

  it('should return 0 for "O"', () => {
    const oh = [
      [1, 1],
      [1, 1]
    ];
    assert.equal(findFirstRow(oh), 0);
  });

  it('should return 2 for "I"', () => {
    const eye = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [5, 5, 5, 5],
      [0, 0, 0, 0]
    ];
    assert.equal(findFirstRow(eye), 2);
  });

  it('should return 1 for this "V" thing', () => {
    const vee = [
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 1, 0, 1],
      [0, 0, 1, 0]
    ];
    assert.equal(findFirstRow(vee), 1);
  });

  it('should return 3 for this bottom "I"', () => {
    const btmEye = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [5, 5, 5, 5]
    ];
    assert.equal(findFirstRow(btmEye), 3);
  });

});
