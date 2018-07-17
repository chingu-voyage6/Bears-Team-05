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
  playerId,
  limit,
) {
  return this.aggregate([
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
  ]);
};


/* ================================ EXPORTS ================================ */

module.exports = mongoose.model('Match', matchSchema);
