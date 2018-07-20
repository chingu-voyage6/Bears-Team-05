import React from 'react';
import './Login.css';
import gIcon from '../../assets/Google_G_Logo.svg';

const Login = () => (
  <div className="login">
    <div className="login__content">
      <a className="login__button--google" href="/auth/google">
        <img src={gIcon} alt="G icon" />
        <p className="login__button--text">Login With Google</p>
      </a>
    </div>
  </div>
);

export default Login;
