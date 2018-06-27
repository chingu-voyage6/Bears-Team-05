import axios from 'axios';

export default function getUser() {
  return async (dispatch) => {
    const response = await axios.get('/api/profile');
    dispatch({
      type: 'GET_USER_STATUS',
      payload: response.data,
    });
  };
}
