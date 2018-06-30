const express = require('express');

const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

module.exports = { io };
const socketManager = require('./services/socketManager');
const router = require('./routes/router');
const authRoutes = require('./routes/authRoutes');

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// set up session cookies
app.use(cookieSession({
  maxAge: 21 * 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY],
}));

// initialize passport
require('./services/passportConfig');

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGOLAB_URI, () => {
  console.log(`Connected to ${process.env.MONGOLAB_URI}`);
});
mongoose.set('debug', true);

app.use(authRoutes);

router(app);
io.on('connection', socketManager);

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
  console.log('Server listening on port:', PORT);
});
