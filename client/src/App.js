import React,{useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";

import Header from './components/Header/index';
import Login from './components/Main/Login';
import Register from './components/Main/Register';

import {LoginProvider} from './contexts/LoginContext';
import {AccessProvider} from './contexts/AccessContext';
import Profile from './components/Main/Profile';
import CarsMap from './components/Main/CarsMap';
import CarMap from './components/Main/CarMap';
import AddOrder from './components/Main/AddOrder';
import Orders from './components/Main/Orders';
import ViewOrder from './components/Main/ViewOrder';
import ForgotPassword from './components/Main/ForgotPassword';
import ResetPassword from './components/Main/ResetPassword';
import AddCar from './components/Main/AddCar';
import OrderTheCar from './components/Main/OrderTheCar';

export default () => {
  return (
    <AccessProvider>
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
              
              <Route exact path="/orders">
                  <Orders/>
              </Route>

              <Route exact path="/addCar">
                  <AddCar/>
              </Route>
              
              <Route exact path="/addOrder">
                  <OrderTheCar/>
              </Route>

              <Route exact path="/forgotPassword">
                  <ForgotPassword/>
              </Route>

              <Route exact path="/reset/:token" component={ResetPassword} />

              <Route exact path="/orders/:id" component={ViewOrder} />
              
              <Route path="/map/:id" component={CarMap} />

              <Route exact path="/">
                  <CarsMap/>
              </Route>

              <Route exact path="/profile">
                  <Profile />
              </Route>

            </Switch>
          </Router>
      </LoginProvider>
    </AccessProvider>
  )
};