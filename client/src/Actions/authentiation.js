import axios from 'axios';

export const GET_USER_STATUS = 'GET_USER_STATUS';

export function getUser() {
  return async (dispatch) => {
    const response = await axios.get('/api/profile');
    dispatch({
      type: GET_USER_STATUS,
      payload: response.data,
    });
  };
}
