import React from "react";
import PropTypes from "prop-types";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Feed from "../Routes/Feed";
import Search from "../Routes/Search";
import Profile from "../Routes/Profile";
import Auth from "../Routes/Auth";
import Account from "../Routes/Account";

//
export const PAGE_USER = username => `/${username}`;

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/account" component={Account} />
    <Route exact path="/" component={Feed} />
    <Route path="/search" component={Search} />
    <Route path="/:username" component={Profile} />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/:username" component={Profile} />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) => (
  <Router>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Router>
);

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;
