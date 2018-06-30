const router = require('express').Router();
const passport = require('passport');

// Google login routes
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

// logout route for any service provider
router.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


// we can add a guest route here below  if necessary

// Auth route middleware, checks if a user is logged in or not
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  // if not authenticated then ...populate the client profile page accordingly
  const headerObject = req.headers;
  /*
  the x-forwarded-for property of the header does not appear for local host so
  add an alternative or will error out locally on split to get the ip address
  the rest of the requests are common to loacl and remote
  */
  let ip = (headerObject['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0];
  ip = (ip === '::1') ? 'local' : ip;
  res.json({
    authenticated: false,
    userip: ip,
    username: null,
    displayname: null,
    email: null,
    authenticationService: null,
  });
  return false;
};

// Authentication result  route for client side consumption
router.get('/api/profile', isLoggedIn, (req, res) => {
  const headerObject = req.headers;
  let ip = (headerObject['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0];
  ip = (ip === '::1') ? 'local' : ip;

  const allAuthServices = ['google', 'twitter'];
  const authService = allAuthServices.filter(a => req.user[a])[0];

  res.json({
    authenticated: true,
    userip: ip,
    username: req.user[authService].username,
    displayName: req.user[authService].displayName,
    email: req.user[authService].email,
    authenticationService: authService,
  });
});

module.exports = router;
