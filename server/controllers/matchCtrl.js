/* ================================= SETUP ================================= */

const Match = require('../models/match');
const { ObjectId } = require('mongoose').Types;

/* ============================== CONTROLLERS ============================== */

/**
 * Get leaderboard data
 * Example: GET >> /api/leaderboard
 * Secured: no
 * Returns: JSON object with arrays for top single player scores & most
 * multi-player wins
*/
const getLeaderboard = (req, res, next) => {
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
    .then(([spScores, mpScores]) => res.json({ spScores, mpScores }))
    .catch(err => next(err));
};

/**
 * Get all players' top single-player scores
 * Example: GET >> /api/best_scores
 * Secured: no
 * Returns: JSON array of all players' best single-player scores
*/
const getPlayersBestScores = (req, res, next) => {
  Match.aggregate([
    { $match: { multiPlayer: false } },
    { $unwind: '$players' },
    {
      $group: {
        _id: { name: '$players.name' },
        bestScore: { $max: '$players.score' },
      },
    },
    {
      $project: {
        _id: 0,
        name: '$_id.name',
        bestScore: 1,
      },
    },
    { $sort: { name: 1 } },
  ])
    .then(bestScores => res.json(bestScores))
    .catch(err => next(err));
};

/**
 * Get all player's recent match results
 * Example: GET >> /api/my_results?limit=5
 * Secured: yes
 * Expects:
 *    1) req.user._id      {String}   Player's user _id
 *    2) req.query.limit   {Number}   Qty of matches to return. Default: 10
 * Returns: JSON object with arrays for most-recent single &
 * multi-player matches
*/
const getPlayersRecentMatches = (req, res, next) => {
  const playerId = req.user._id;
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
        // 'matches._id': 0,
        'matches.multiPlayer': 0,
        'matches.updatedAt': 0,
        'matches.__v': 0,
      },
    },
  ])
    .then(([mpMatches, spMatches]) => res.json({ spMatches, mpMatches }))
    .catch(err => next(err));
};


/* ================================ EXPORTS ================================ */

module.exports = {
  getLeaderboard,
  getPlayersBestScores,
  getPlayersRecentMatches,
};
