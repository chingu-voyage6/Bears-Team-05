import { GET_USER_STATUS, GET_USERS_OWN_STATS } from '../constants';

const userStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_STATUS:
      return action.payload;
    case GET_USERS_OWN_STATS:
      return {
        ...state,
        stats: action.payload,
      };
    default:
      return state;
  }
};

export default userStatusReducer;
