const router = require('express').Router();
const passport = require('passport');

// Google login routes
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.get(
  '/google/redirect',
  passport.authenticate('google'),
  (req, res) => res.redirect('/'),
);

// logout route for any service provider
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
