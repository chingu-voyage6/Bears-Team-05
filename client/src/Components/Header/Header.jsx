import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

const Header = () => (
  <header>
    <div className="header">
      <div className="header__left">
        <NavLink to="/" exact><h1>Tetris Duel</h1></NavLink>
      </div>
      <div className="header__right">
        <NavLink activeClassName="is-active" to="/leaderboard">
          Leaderboard
        </NavLink>
        <NavLink activeClassName="is-active" to="/login">
          Login
        </NavLink>
        <NavLink activeClassName="is-active" to="/register">
          Register
        </NavLink>
      </div>
    </div>
  </header>
);

export default Header;
