import setBoundry from './setBoundary';

/**
 * Generate new boundaryCells to update Redux state
 * @param    {Object}   oldRubble     Existing rubble object from redux state
 * @param    {Object}   activeShape   Shape object from redux state
 * @param    {Object}   canvas        Canvas object from redux state
 * @returns  {Array}                  New boundary
*/
export default (oldRubble, { activeShape, canvas }) => {
  const yBoundary = oldRubble.boundaryCells.map(c => Number(c.split('-')[1]));
  const oldHeight = Array.from(new Set(yBoundary)).length;
  return setBoundry(activeShape, canvas.canvasMajor, oldHeight + 1);
};
