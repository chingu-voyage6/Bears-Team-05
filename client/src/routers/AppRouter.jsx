import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Our components
import Footer from '../Components/Footer/Footer';
import FourOhFour from '../Components/FourOhFour/FourOhFour';
import Header from '../Components/Header/Header';
import Landing from '../Components/Landing/Landing';
import Leaderboard from '../Components/Leaderboard/Leaderboard';
import Login from '../Components/Login/Login';
import Privacy from '../Components/Privacy/Privacy';
import Profile from '../Components/Profile/Profile';

const AppRouter = () => (
  <BrowserRouter>
    <div className="container">
      <Header />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/login" component={Login} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/profile" component={Profile} />
        <Route component={FourOhFour} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

// AppRouter exports a React component. Thus ReactComponent casing style
export default AppRouter;
