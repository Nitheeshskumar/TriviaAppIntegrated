import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import App from "./App";
import Admin from './Admin'
import Result from "./components/Result";

export default function BasicExample() {
    return (
        <div className="App">
        <div className="App-header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/SARS-CoV-2_without_background.png/800px-SARS-CoV-2_without_background.png" className="App-logo" alt="logo" />
          <h2>Covid Quiz  </h2>
      </div>
      <Router>
           <div>
          <Switch>
            <Route exact path="/">
              <App />
            </Route>
            <Route path="/dashboard">
            <Result />
            </Route>
            <Route path="/admin">
              <Admin/>
            </Route>
          </Switch>
        </div>
      </Router>
      </div>
    );
  }