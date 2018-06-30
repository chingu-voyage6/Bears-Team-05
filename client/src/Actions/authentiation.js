import axios from 'axios';

const getUser = () =>
  async (dispatch) => {
    const response = await axios.get('/api/profile');
    dispatch({
      type: 'GET_USER_STATUS',
      payload: response.data,
    });
  };

export default getUser;
