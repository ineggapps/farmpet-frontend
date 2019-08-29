import React from "react";
import PropTypes from "prop-types";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Feed from "../Routes/Feed";
import Search from "../Routes/Search";
import Profile from "../Routes/Profile";
import Auth from "../Routes/Auth";
import Account from "../Routes/Account";
import Pet from "../Routes/Pet";

//
export const PAGE_USER = username => `/${username}`;
export const PAGE_PET = name => `/pet/${name}`;
export const PAGE_ACCOUNT = `/account`;

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/account" component={Account} />
    <Route exact path="/account/profile" component={Account} />
    <Route path="/pet/:name" component={Pet} />
    <Route path="/search" component={Search} />
    <Route path="/:username" component={Profile} />
    <Route exact path="/" component={Feed} />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/pet/:name" component={Pet} />
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
