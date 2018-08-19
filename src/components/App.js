import React from 'react';
import ReactDOM from 'react-dom';
import UserMenuClass from './UserMenu'
import ManageUsersPage from './pages/ManageUser'
import ManageModulesPage from './pages/ManageModules'
import EditModulePage from './pages/EditModule'
import LandingPage from './pages/Landing';
import SignUpPage from './pages/SignUp';
import AdminPage from './pages/AdminPage';
import SignInPage from './pages/SignIn'
import HomeworkPage from './pages/Homework';
import PasswordForgetPage from './pages/PasswordForget';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import * as routes from '../constants/routes';
import HomePage from './pages/Home';
import AccountPage from './pages/Account';
import NextModulePage from './pages/NextModule'
import withAuthentication from './withAuthentication';

import EmailInput from './EmailInput';
import EmaiVerifBt from './EmaiVerifBt';
import Logo from './logo';
import PasswordInput from './PasswordInput';
import QuickstartDetails from './QuickstartDetails';
import LoginBt from './LoginBt';
import RegisterBt from './RegisterBt';
import ResetPwdBt from './ResetPwdBt';
import SignInStatus from './SignInStatus';
import SignOutButton from './pages/SignOut';
import SupportingText from './SupportingText';
import Title from './Title';
import '../css/custom.css';
import '../css/index.css';
import '../css/material.orange-indigo.min.css';

import MetaTags from 'react-meta-tags';
import {Helmet} from "react-helmet";

const App = () =>
<div className='wrapper'>
<Helmet>
        <script defer src="https://code.getmdl.io/1.1.3/material.min.js"></script>
        <script src="https://cdn.firebase.com/libs/firebaseui/2.5.1/firebaseui.js"></script>
        <script src="/__/firebase/4.0.0/firebase-app.js"></script>
        <script src="/__/firebase/4.0.0/firebase-auth.js"></script>
        <script src="/__/firebase/init.js"></script>
        <script src="/js/require.js"></script>
        <script src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

        </Helmet>
<MetaTags>
    <meta charSet="utf-8" />
    <title>MyMandorla</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta property="og:title" content="Sign In YourYoni" />
  </MetaTags>
<div className=' mdl-typography--text-center'  >
<div className='mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop mdl-typography--text-center'>

  <Router>
    <div>
    <UserMenuClass />
    <Title />
    <main className="mdl-layout__content">
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      <Route exact path={routes.ADMIN} component={() => <AdminPage />}/>
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.HOMEWORK} component={() => <HomeworkPage />} />
      <Route path={routes.EDITMODULE} component={(state) => <EditModulePage state={state} />}/>
      <Route exact path={routes.MANAGEMODULES} component={() => <ManageModulesPage />} />
      <Route exact path={routes.MANAGEUSERS} component={() => <ManageUsersPage />} />
      <Route exact path={routes.NEXTMODULE} component={() => <NextModulePage />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />





      </main>
      <Logo />
    </div>
  </Router>
  </div>
  </div>
  </div>

export default withAuthentication(App);
