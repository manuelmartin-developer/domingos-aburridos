import React from "react";
import { Route, Switch } from "react-router";

import Home from '../Home';
import Barcelona from "../Barcelona/Barcelona";
import ISS from '../ISS/ISS'

const Main = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/barcelona" component={Barcelona} exact />
      <Route path="/iss" component={ISS} exact />
    </Switch>
  );
};

export default Main;
