import React,{useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";

import Header from './components/Header';
import Login from './components/Main/Login';
import Register from './components/Main/Register';

import {LoginProvider} from './contexts/LoginContext';

export default () => {
  return (
    <LoginProvider>
        <Router>
          <Header/>
          <Switch>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/register">
                <Register />
            </Route>
          </Switch>
        </Router>
    </LoginProvider>
    
  )
};