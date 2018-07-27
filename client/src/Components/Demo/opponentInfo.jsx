import React from 'react';
import PropTypes from 'prop-types';
import './opponent.css';
/* opponent top part of component */
const OpponentDescription = ({
  opponentState,
  setDifficulty,
  requestInvite,
  acceptInvite,
}) => {
  if (opponentState.status[0] === 'noopponents' && !Object.keys(opponentState.opponent).length) {
    return (
      <div className="opponentDescription">
        <div className="opponentDescription noop">
          <p className="Invite">No opponents  </p>
          <p className="Invite">avalilable at</p>
          <p className="Invite">the moment,</p>
          <p className="Invite">check back</p>
          <p className="Invite">later !!</p>
        </div>
      </div>
    );
  }
  if (opponentState.status[0] === 'opponents') {
    const players = opponentState.playerPool.map(p => (
      <button
        className="playersbutton"
        key={p.socketId}
        onClick={() => requestInvite(p.socketId)}
      >{p.displayName.split(' ')[0]}
      </button>));
    return (
      <div className="opponentDescription">
        <div className="opponentDescription Invitation">
          <div className="DifficultySet">
            <p className="Invite">Difficulty</p>
            <select name="difficulty" value={opponentState.difficulty} onChange={e => setDifficulty(e)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <p className="Invite">Invite</p>
          {players}
        </div>
      </div>
    );
  }
  if (opponentState.status[0] === 'Invite') {
    return (
      <div className="opponentDescription">
        <div className="opponentDescription Invitation">
          <p className="Invite">Invite from</p>
          <p className="Invite">{opponentState.status[1][0].displayName.split(' ')[0]}</p>
          <p className="Invite">Difficulty = {opponentState.status[1][1]}</p>
          <button className="button-accept-invitation" onClick={() => acceptInvite()}>Accept</button>
          <button className="button-decline-invitation">Decline</button>
        </div>
      </div>
    );
  }
  if (opponentState.status[0] === 'PreGame') {
    return ( // to render on game
      <div className="opponentDescription">
        <div className="opponentDescription Timer">
          <h4>GET READY</h4>
          <h4>TO DUEL WITH:</h4>
          <p className="countdown">{opponentState.opponent.displayName.split(' ')[0]}</p>
          <p className="countdown">in {opponentState.status[1]} s</p>
        </div>
      </div>
    );
  }
  if (opponentState.status[0] === 'Playing' && Object.keys(opponentState.gameState).length) {
    return ( // to render on game
      <div className="opponentDescription">
        <div className="opponentDescription GamePlay">
          <p className="Invite">{opponentState.opponent.displayName.split(' ')[0]}</p>
          <p className="Invite">Lines Cleared</p>
          <p className="linescleared">{opponentState.gameState.points.totalLinesCleared}</p>
          <p className="Invite">Games Played</p>
          <p className="gamesplayed">{opponentState.opponent.stats.mpStats.games_played}</p>
        </div>
      </div>
    );
  }
  if (opponentState.status[0] === 'GameOver') {
    return opponentState.status[1] ?
      ( // to render on game
        <div className="opponentDescription">
          <div className="opponentDescription endGame winner">
            <p className="winner">Congratulations</p>
            <p className="winner">You Have Won !!</p>
          </div>
        </div>
      )
      :
      ( // to render on game
        <div className="opponentDescription">
          <div className="opponentDescription endGame looser">
            <p className="looser">You Have Lost</p>
            <p className="looser">This Game, </p>
            <p className="looser">Better Luck</p>
            <p className="looser">Next Time !!</p>
          </div>
        </div>
      );
  }
  return ( // to render on game
    <div className="opponentDescription">
      <div className="loading" />
    </div>
  );
};

OpponentDescription.defaultProps = {
  opponentState: {},
  setDifficulty: null,
  requestInvite: null,
  acceptInvite: null,
};
OpponentDescription.propTypes = {
  opponentState: PropTypes.objectOf(PropTypes.any),
  setDifficulty: PropTypes.func,
  requestInvite: PropTypes.func,
  acceptInvite: PropTypes.func,
};
export default OpponentDescription;
