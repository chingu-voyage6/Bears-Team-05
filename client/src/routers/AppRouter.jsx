import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Our components
import Header from '../Components/Header/Header';
import Landing from '../Components/Landing/Landing';
import Footer from '../Components/Footer/Footer';
import FourOhFour from '../Components/FourOhFour/FourOhFour';
import Leaderboard from '../Components/Leaderboard/Leaderboard';
import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register';

const AppRouter = () => (
  <BrowserRouter>
    <div className="container">
      <Header />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/leaderboard" exact component={Leaderboard} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route component={FourOhFour} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

// AppRouter exports a React component. Thus ReactComponent casing style
export default AppRouter;
