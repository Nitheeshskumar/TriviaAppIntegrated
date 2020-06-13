import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,Redirect
} from "react-router-dom";
import App from "./App";
import QuestionCreate from './Admin/QuestionCreate'
import Result from "./components/Result";
import { CSSTransitionGroup } from 'react-transition-group';
import Signup from './Admin/CreateUser'

export default function BasicExample() {
    return (
        <div className="App">
        <div className="App-header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/SARS-CoV-2_without_background.png/800px-SARS-CoV-2_without_background.png" className="App-logo" alt="logo" />
          <h2>Covid Quiz  </h2>
      </div>
      <CSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >

      <Router>
           <div>
          <Switch>
            <Route exact path="/">
              <App />
            </Route>
            <Route path="/dashboard">
            <Result />
            </Route>
            <Route path="/admin/question">
              <QuestionCreate/>
            </Route>
            <Route path="/admin/signup">
              <Signup/>
            </Route>
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </Router>
      </CSSTransitionGroup>


      </div>
    );
  }