import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LogIn from "./components/LogIn";
import Dashboard from "./components/Dashboard";

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={LogIn} />
          <Route path="/dashboard" exact component={Dashboard}>
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
