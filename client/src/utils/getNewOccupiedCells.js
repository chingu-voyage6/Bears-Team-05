/**
 * Generate new occupiedCells to update Redux state
 * @param    {Object}   oldRubble   Existing rubble object from redux store
 * @returns  {Array}                New array of occupied cells
*/
export default oldRubble =>
  oldRubble.occupiedCells.map((c) => {
    const [oldX, oldY] = c[0].split('-');
    return ([`${oldX}-${oldY - 1}`, c[1]]);
  });
