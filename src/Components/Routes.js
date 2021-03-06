import React from "react";
import PropTypes from "prop-types";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Feed from "../Routes/Feed";
import Search from "../Routes/Search";
import Profile from "../Routes/Profile";
import Auth from "../Routes/Auth";
import Pet from "../Routes/Pet";
import PetCreate from "../Routes/PetCreate";
import Post from "../Routes/Post";

//
export const PAGE_USER = username => `/${username}`;
export const PAGE_PET = name => `/pet/${name}`;
export const PAGE_PET_CREATE = `/pet/create`;
export const PAGE_POST = postId => `/post/${postId}`;
export const PAGE_ACCOUNT = username => `/${username}`;

const LoggedInRoutes = () => (
  <Switch>
    <Route path="/search/:query" component={Search} />
    <Route path="/pet/create" component={PetCreate} />
    <Route path="/pet/:name" component={Pet} />
    <Route path="/post/:postId" component={Post} />
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
