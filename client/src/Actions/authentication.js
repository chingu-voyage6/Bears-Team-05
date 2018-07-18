import axios from 'axios';
import { initSocket, socket } from './socket';

import {
  GET_USER_STATUS,
  GET_USERS_OWN_STATS,
  USER_CONNECTED,
} from '../constants';

export const getUser = () => (dispatch) => {
  initSocket(dispatch);
  socket.emit(USER_CONNECTED, 'new user connected');

  axios
    .get('/api/profile')
    .then(({ data }) => {
      dispatch({
        type: GET_USER_STATUS,
        payload: data,
      });
    })
    .catch((err) => {
      console.log(`getUser failed: ${err}`);
    });
};

export const authSuccess = () => {
  console.log('login success');
};

export const getUsersOwnStats = () => (dispatch) => {
  axios.get('/api/my_stats')
    .then(({ data }) => {
      dispatch({
        type: GET_USERS_OWN_STATS,
        payload: data,
      });
    })
    .catch((err) => {
      console.log(`getUsersOwnStats failed: ${err}`);
    });
};
