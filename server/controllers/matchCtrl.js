/* ================================= SETUP ================================= */

const Match = require('../models/match');


/* ============================== CONTROLLERS ============================== */

const getLeaderboard = (req, res) => {
  const getSinglePlayerLeaders = Match.aggregate([
    { $match: { multiPlayer: false } },
    { $unwind: '$players' },
    { $sort: { 'players.score': -1 } },
    { $limit: 10 },
    {
      $project: {
        _id: 0,
        name: '$players.name',
        score: '$players.score',
      },
    },
  ]);

  const getMultiPlayerLeaders = Match.aggregate([
    { $match: { multiPlayer: true } },
    { $unwind: '$players' },
    { $match: { 'players.winner': true } },
    {
      $group: {
        _id: { name: '$players.name' },
        wins: { $sum: 1 },
      },
    },
    { $sort: { wins: -1 } },
    { $limit: 10 },
    {
      $project: {
        _id: 0,
        name: '$_id.name',
        wins: 1,
      },
    },
  ]);

  Promise.all([getSinglePlayerLeaders, getMultiPlayerLeaders])
    .then(scores => res.json({
      singlePlayer: scores[0],
      multiPlayer: scores[1],
    }));
};


/* ================================ EXPORTS ================================ */

module.exports = {
  getLeaderboard,
};
