import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => (
  <div className="login">
    <div className="login__content">
      <a href="/auth/google">Login With Google</a>
      <br />
      <Link to="/">Home</Link>
    </div>
  </div>
);

export default Login;
