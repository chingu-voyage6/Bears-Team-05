module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.json('Hello Bears Team 05!!');
  });
};
