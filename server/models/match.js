/* ================================= SETUP ================================= */

const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;


/* ================================ SCHEMA ================================= */

const matchSchema = new mongoose.Schema(
  {
    multiPlayer: { type: Boolean, default: false, required: true },
    players: [
      {
        name: { type: String, required: true },
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        score: Number,
        winner: Boolean,
      },
    ],
  },
  {
    timestamps: true,
  },
);


/* ============================ SCHEMA METHODS ============================= */

matchSchema.statics.getAllBestSPScores = function getAllBestSPScores() {
  return this.aggregate([
    { $match: { multiPlayer: false } },
    { $unwind: '$players' },
    {
      $group: {
        _id: { playerId: '$players._id', name: '$players.name' },
        bestScore: { $max: '$players.score' },
      },
    },
    {
      $project: {
        _id: '$_id.playerId',
        name: '$_id.name',
        bestScore: 1,
      },
    },
    { $sort: { name: 1 } },
  ]);
};

matchSchema.statics.getSinglePlayerLeaders = function getSPLeaders(limit) {
  return this.aggregate([
    { $match: { multiPlayer: false } },
    { $unwind: '$players' },
    { $sort: { 'players.score': -1 } },
    { $limit: limit },
    {
      $project: {
        _id: 0,
        name: '$players.name',
        score: '$players.score',
      },
    },
  ]);
};

matchSchema.statics.getMultiPlayerLeaders = function getMPLeaders(limit) {
  return this.aggregate([
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
    { $limit: limit },
    {
      $project: {
        _id: 0,
        name: '$_id.name',
        wins: 1,
      },
    },
  ]);
};

matchSchema.statics.getOwnRecentMatches = function getOwnRecentMatches(
  player,
  limit,
) {
  return this.aggregate([
    { $match: { 'players._id': ObjectId(player) } },
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
  ]);
};

matchSchema.statics.getOwnSPStats = function getOwnSPStats(player) {
  return this.aggregate([
    { $match: { 'players._id': ObjectId(player), multiPlayer: false } },
    { $unwind: '$players' },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: null,
        games_played: { $sum: 1 },
        best_score: { $max: '$players.score' },
        worst_score: { $min: '$players.score' },
        matches: { $push: { score: '$players.score', date: '$createdAt' } },
      },
    },
    {
      $project: {
        _id: 0,
        category: 'single-player',
        last_ten_games: { $slice: ['$matches', 10] },
        games_played: 1,
        best_score: 1,
        worst_score: 1,
      },
    },
  ])
    .then(results => results[0]);
};

matchSchema.statics.getOwnMPStats = function getOwnMPStats(player) {
  const getGamesWon = this.count({
    multiPlayer: true,
    players: { $elemMatch: { _id: player, winner: true } },
  });

  const getRestStats = this.aggregate([
    { $match: { 'players._id': ObjectId(player), multiPlayer: true } },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: null,
        games_played: { $sum: 1 },
        matches: { $push: { players: '$players', date: '$createdAt' } },
      },
    },
    {
      $project: {
        _id: 0,
        last_ten_games: { $slice: ['$matches', 10] },
        games_played: 1,
      },
    },
  ]);

  return Promise.all([getGamesWon, getRestStats])
    .then(([gamesWon, restStats]) => ({
      ...restStats[0],
      games_won: gamesWon,
      games_lost: restStats[0].games_played - gamesWon,
    }));
};


/* ================================ EXPORTS ================================ */

module.exports = mongoose.model('Match', matchSchema);
