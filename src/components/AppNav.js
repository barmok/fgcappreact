import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {firebase} from '../firebase'
import LandingPage from './pages/Landing';
import SignUpPage from './pages/SignUp';
import AdminPage from './pages/AdminPage';
import SignInPage from './pages/SignIn'
import HomeworkPage from './pages/Homework';
import PasswordForgetPage from './pages/PasswordForget';
import HomePage from './pages/Home';
import AccountPage from './pages/Account';
import NextModulePage from './pages/NextModule'
import Navigation from '../Navigation';
import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';
import Title from './Title';


const AppNav = () =>
<Router>
  <div>
      <Title />


    <Route
      exact path={routes.HOME}
      component={() => <div>
      <HomePage /></div>}
    />
    <Route
      exact path={routes.ADMIN}
      component={() => <div><AdminPage />
      </div>}
    />
    <Route
      exact path={routes.SIGN_IN}
      component={() => <SignInPage />}
    />
    <Route
      exact path={routes.SIGN_UP}
      component={() => <SignUpPage />}
    />

    <Route
      exact path={routes.PASSWORD_FORGET}
      component={() => <PasswordForgetPage />}
    />
    <Route
      exact path={routes.ACCOUNT}
      component={() => <AccountPage />}
    />
    <Route
      exact path={routes.NEXTMODULE}
      component={() => <NextModulePage />}
    />
    <Route
      exact path={routes.HOMEWORK}
      component={() => <HomeworkPage />}
    />

    </div>
</Router>



  export default withAuthentication(AppNav);
