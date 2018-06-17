// test reducer sample for making individual reducers
export default (state = '', action) => {
  switch (action.type) {
    case 'BEGIN':
      return 'Testing has Begun';
    case 'END':
      return 'Testing has Ended';
    default:
      break;
  }

  return state;
};
