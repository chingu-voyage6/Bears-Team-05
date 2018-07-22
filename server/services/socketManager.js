const { io } = require('../index');
const { USER_CONNECTED } = require('../../client/src/constants');

let playerPool = [];
const activePlayers = [];
const profileResponder = socketId => (
  { // need self socket id to segregate on client
    pool: playerPool,
    self: socketId,
  }
);
module.exports = (socket) => {
  socket.on(USER_CONNECTED, (user) => {
    console.log(`test log msg from client side: ${user}`);

    io.emit(USER_CONNECTED, user);
  });
  socket.on('disconnect', () => {
    const indexOfDisconnected = playerPool.findIndex(s => s.socketId === socket.id);
    playerPool = [...playerPool.slice(0, indexOfDisconnected),
      ...playerPool.slice(indexOfDisconnected + 1)];
    io.emit('CURRENT_POOL', profileResponder(socket.id));
  });

  // Playe pool set up
  // PLAYER_JOINED = multiplayer button click
  socket.on('PLAYER_JOINED', (profile) => {
    const playerProfile = JSON.parse(profile);
    playerProfile.socketId = socket.id; // attach socket Id to profile
    playerPool.push(playerProfile);
    io.emit('CURRENT_POOL', profileResponder(socket.id));
  });

  socket.on('REMOVE_PLAYER', (player) => {
    const indexOfDisconnected = playerPool.findIndex(s => s.socketId === player);
    playerPool = [...playerPool.slice(0, indexOfDisconnected),
      ...playerPool.slice(indexOfDisconnected + 1)];
    io.emit('CURRENT_POOL', profileResponder(socket.id));
  });

  socket.on('INVITATION_SENT', (sId) => {
    io.to(sId).emit('INVITATION_RECEIVED', socket.id);
  });

  socket.on('INVITATION_ACCEPTED', (players) => {
    const playerAIndex = playerPool.findIndex(p =>
      players[0] === p.socketId);
    const playerBIndex = playerPool.findIndex(p =>
      players[1] === p.socketId);
    const playerA = playerPool[playerAIndex];
    const playerB = playerPool[playerBIndex];
    io.to(players[0]).emit('START_GAME', playerB); // emit the opponents
    io.to(players[1]).emit('START_GAME', playerA);
    // remove socekt IDs from room and add to active Players
    for (let i = 0; i < players.length; i += 1) {
      const poolIds = playerPool.map(p => p.socketId);
      if (poolIds.includes(players[i])) {
        const indxOfPlayer = poolIds.indexOf(players[i]);
        playerPool.splice(indxOfPlayer, 1);
      }
    }
    activePlayers.push(players);
    io.emit('CURRENT_POOL', profileResponder(socket.id));
  });
};

