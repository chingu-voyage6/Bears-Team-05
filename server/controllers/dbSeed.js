const mongoose = require('mongoose');
const Match = require('../models/match');

const seedMatches = (req, res) => {
  const dummies = [
    { name: 'Adam', id: new mongoose.Types.ObjectId() },
    { name: 'belcurv', id: new mongoose.Types.ObjectId(process.env.BELCURV_ID) },
    { name: 'Bernard', id: new mongoose.Types.ObjectId() },
    { name: 'Chance', id: new mongoose.Types.ObjectId() },
    { name: 'Danica', id: new mongoose.Types.ObjectId() },
    { name: 'Dave', id: new mongoose.Types.ObjectId() },
    { name: 'Dereje', id: new mongoose.Types.ObjectId(process.env.DEREJE_ID) },
    { name: 'Donald', id: new mongoose.Types.ObjectId() },
    { name: 'Iggy', id: new mongoose.Types.ObjectId() },
    { name: 'Joseph', id: new mongoose.Types.ObjectId() },
    { name: 'Kate', id: new mongoose.Types.ObjectId() },
    { name: 'Kevin', id: new mongoose.Types.ObjectId() },
    { name: 'Kitty', id: new mongoose.Types.ObjectId() },
    { name: 'Quincy', id: new mongoose.Types.ObjectId() },
    { name: 'rbertram8', id: new mongoose.Types.ObjectId(process.env.RBERTRAM8_ID) },
    { name: 'terrance', id: new mongoose.Types.ObjectId() },
    { name: 'Yancy', id: new mongoose.Types.ObjectId() },
  ];

  const docs = [];
  for (let i = 0; i < 500; i += 1) {
    const isMultiplayer = !!Math.round(Math.random());
    if (isMultiplayer) {
      const index1 = Math.floor(Math.random() * dummies.length);
      let index2 = Math.floor(Math.random() * dummies.length);
      do {
        index2 = Math.floor(Math.random() * dummies.length);
      } while (index1 === index2);
      const winner = Math.round(Math.random());
      const difficulty = Math.floor(Math.random() * 4) + 1;
      docs.push({
        multiPlayer: isMultiplayer,
        difficulty,
        players: [
          {
            name: dummies[index1].name,
            _id: dummies[index1].id,
            winner: winner === 0,
          },
          {
            name: dummies[index2].name,
            _id: dummies[index2].id,
            winner: winner === 1,
          },
        ],
      });
    } else {
      const index = Math.floor(Math.random() * dummies.length);
      docs.push({
        multiPlayer: isMultiplayer,
        players: [
          {
            name: dummies[index].name,
            _id: dummies[index].id,
            score: Math.round(Math.random() * 10000) * 10,
          },
        ],
      });
    }
  }

  return Match.insertMany(docs)
    .then(results => res.json({ results }))
    .catch(error => res.json({ error }));
};

module.exports = {
  seedMatches,
};
