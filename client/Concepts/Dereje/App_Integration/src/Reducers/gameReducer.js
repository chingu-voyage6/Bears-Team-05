import { INITIALIZE_GAME } from '../constants/index';

const gameReducer = (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE_GAME:
      return action.payload;
    default:
      break;
  }
  return state;
};

export default gameReducer;
