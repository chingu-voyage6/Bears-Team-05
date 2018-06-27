// store reducer handles all authentication actions
export default function userStatusReducer(state = {}, action) {
  switch (action.type) {
    case 'GET_USER_STATUS':
      return action.payload;
    default:
      return state;
  }
}
