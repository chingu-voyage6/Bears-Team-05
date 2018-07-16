/* ================================= SETUP ================================= */

const Match = require('../models/match');
const { ObjectId } = require('mongoose').Types;

/* ============================== CONTROLLERS ============================== */

/**
 * Get all player's recent match results
 * Example: GET >> /api/my_results/5b4cd14d343984146b6dd676?limit=10
 * Secured: not yet -- authentication should be required though
 * Expects:
 *    1) req.params.playerId   {String}   Player's _id
 *    2) req.query.limit       {Number}   Qty of matches to return. Default: 10
 * Returns: JSON object with arrays for most-recent single &
 * multi-player matches
*/
const getPlayersRecentMatches = (req, res) => {
  const { playerId } = req.params;
  const limit = parseInt(req.query.limit, 10) || 10;

  Match.aggregate([
    { $match: { 'players._id': ObjectId(playerId) } },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: { multiPlayer: '$multiPlayer' },
        matches: { $push: '$$ROOT' },
      },
    },
    {
      $project: {
        _id: 0,
        matches: { $slice: ['$matches', limit] },
      },
    },
    {
      $project: {
        'matches._id': 0,
        'matches.multiPlayer': 0,
        'matches.updatedAt': 0,
        'matches.__v': 0,
      },
    },
  ])
    .then(([multiPlayer, singlePlayer]) => res.json({ singlePlayer, multiPlayer }));
};

/**
 * Get leaderboard data
 * Example: GET >> /api/leaderboard
 * Secured: no
 * Returns: JSON object with arrays for top single player scores & most
 * multi-player wins
*/
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
  getPlayersRecentMatches,
};
