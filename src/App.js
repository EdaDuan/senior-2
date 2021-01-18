import React from "react";
import { renderRoutes } from "react-router-config";
import routes from "./router/router";

import { HashRouter as Router, Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>{renderRoutes(routes)}</Switch>
      </Router>
    </div>
  );
}
export default App;
