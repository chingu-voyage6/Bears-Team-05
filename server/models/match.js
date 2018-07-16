const mongoose = require('mongoose');

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

module.exports = mongoose.model('Match', matchSchema);
