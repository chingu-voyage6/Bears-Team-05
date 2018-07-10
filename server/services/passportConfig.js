const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

// get user info in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// Google Strategy
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect',
  },
  async (accessToken, refreshToken, profile, done) => {
    const currentUser = await User.findOne({ 'google.id': profile.id });
    if (currentUser) {
      done(null, currentUser);
    } else {
      const newUser = await new User({
        google: {
          id: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          username: null,
        },
      }).save();
      done(null, newUser);
    }
  },
));
