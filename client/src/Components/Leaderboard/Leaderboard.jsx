import React from 'react';
import './Leaderboard.css';

let dummyData = [
  {
    username: "Quincy",
    bestScore: Math.round(Math.random()*1000)
  },
  {
    username: "Dave",
    bestScore: Math.round(Math.random()*1000)
  },
  {
    username: "Joseph",
    bestScore: Math.round(Math.random()*1000)
  },
  {
    username: "Donald",
    bestScore: Math.round(Math.random()*1000)
  },
  {
    username: "Danica",
    bestScore: Math.round(Math.random()*1000)
  }
]

dummyData.sort((a,b) => {
  return b.bestScore-a.bestScore;
})

const Leaderboard = () => (
  <div className="leaderboard">
    <div className="board">
      <div className="board-header">
        High Scores
      </div>
        {dummyData.map((x,i) => {
          if (i < 10) {
            return (
              <div className="leaderboard-player">
                <p>
                  {x.username}
                </p>
                <p>
                  {x.bestScore}
                </p>
              </div>
            )
          }
        })}
    </div>
  </div>
);

export default Leaderboard;
