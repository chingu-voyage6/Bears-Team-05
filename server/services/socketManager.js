const { io } = require('../index');
const { USER_CONNECTED } = require('../../client/src/constants');

module.exports = (socket) => {
  socket.on(USER_CONNECTED, (user) => {
    console.log(`test log msg from client side: ${user}`);
    io.emit(USER_CONNECTED, user);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
};
