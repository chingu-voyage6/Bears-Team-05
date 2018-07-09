const { io } = require('../index');

module.exports = (socket) => {
  socket.on('user_joined', (user) => {
    io.emit('user_joined', user);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
};
