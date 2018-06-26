const express = require('express');

const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

module.exports = { io };
const socketManager = require('./services/socketManager');
const router = require('./router');


mongoose.connect(process.env.MONGOLAB_URI, () => {
  console.log(`Connected to ${process.env.MONGOLAB_URI}`);
});
mongoose.set('debug', true);

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(express.static('public'));
router(app);
io.on('connection', socketManager);

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
  console.log('Server listening on port:', PORT);
});
