/**
 * Creates a piece specified by 'type'
 * @param    {String} type The tetromino piece to generate
 * @returns  {Array}       The new piece's 2D matrix
 */
const createPiece = (type) => {
  switch (type) {
    case 'T':
      return [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
      ];
    case 'O':
      return [
        [2, 2],
        [2, 2]
      ];
    case 'L':
      return [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0]
      ];
    case 'J':
      return [
        [4, 0, 0],
        [4, 4, 4],
        [0, 0, 0]
      ];
    case 'I':
      return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [5, 5, 5, 5],
        [0, 0, 0, 0]
      ];
    case 'S':
      return [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0]
      ];
    case 'Z':
      return [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
      ];
  }
};

export default createPiece;
