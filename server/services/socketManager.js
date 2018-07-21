const { io } = require('../index');
const { USER_CONNECTED, SIMULATE_GAMEPLAY } = require('../../client/src/constants');

module.exports = (socket) => {
  socket.on(USER_CONNECTED, (user) => {
    console.log(`test log msg from client side: ${user}`);
    io.emit(USER_CONNECTED, user);
  });
  socket.on(SIMULATE_GAMEPLAY, (msg) => {
    io.emit(SIMULATE_GAMEPLAY, msg);
  });
  socket.on('disconnect', () => {
    console.log('disconnected');
  });
};
