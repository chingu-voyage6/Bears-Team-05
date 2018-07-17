const getUserProfile = (req, res) => {
  const headerObject = req.headers;
  let ip = (headerObject['x-forwarded-for'] || req.socket.remoteAddress)
    .split(',')[0];
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
};

module.exports = {
  getUserProfile,
};
