import React from "react";
import { Route, Switch } from "react-router";

import Home from '../Home';
import Barcelona from "../Barcelona/Barcelona";
import ISS from '../ISS/ISS'

const Main = () => {
  return (
    <Switch>
      <Route path="/domingos-aburridos" component={Home} exact />
      <Route path="/barcelona" component={Barcelona} />
      <Route path="/iss" component={ISS} />
    </Switch>
  );
};

export default Main;
