import { GET_USER_STATUS, GET_USERS_OWN_STATS } from '../constants';

const userDefaultState = {
  _id: '',
  authenticated: false,
  authenticationService: '',
  displayName: '',
  email: '',
  stats: {
    mpStats: {
      games_lost: 0,
      games_played: 0,
      games_won: 0,
      last_ten_games: [],
    },
    spStats: {
      games_played: 0,
      best_score: 0,
      worst_score: 0,
      last_ten_games: [],
    },
  },
  userip: '',
  username: '',
};

const userStatusReducer = (state = userDefaultState, action) => {
  switch (action.type) {
    case GET_USER_STATUS:
      return {
        ...state,
        ...action.payload,
      };
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
