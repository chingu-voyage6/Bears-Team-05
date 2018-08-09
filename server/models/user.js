const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    google: {
      id: String,
      displayName: String,
      username: String,
      email: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);
