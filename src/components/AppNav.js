import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import AuthUserContext from './AuthUserContext';
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
import ManageUsersPage from './pages/ManageUser'
import ManageModulesPage from './pages/ManageModules'
import EditModulePage from './pages/EditModule'
import UserMenuClass from './UserMenu'

class AppNav extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
<Router>

  <div>
  <div id="layout" className="demo-layout-transparent mdl-layout mdl-js-layout">
  <div className="mdl-layout__drawer">
  <UserMenuClass />
  </div>
  </div>
  <Title />

    <main className="mdl-layout__content">
    <Route exact path={routes.ACCOUNT}component={() => <AccountPage />}/>
    <Route exact path={routes.ADMIN} component={() => <div><AdminPage />  </div>}  />
    <Route exact path={routes.HOME} component={() => <div>  <HomePage />  </div>}/>
    <Route exact path={routes.HOMEWORK}component={() => <HomeworkPage />}/>
    <Route exact path={routes.EDITMODULE} component={() => <EditModulePage />}/>
    <Route exact path={routes.MANAGEMODULES}component={() => <ManageModulesPage />}  />
    <Route exact path={routes.MANAGEUSERS}component={() => <ManageUsersPage />}/>
    <Route exact path={routes.NEXTMODULE}component={() => <NextModulePage />}/>
    <Route exact path={routes.SIGN_IN}  component={() => <SignInPage />}/>
    <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />}  />
    <Route exact path={routes.PASSWORD_FORGET}component={() => <PasswordForgetPage />}/>
    </main>
    </div>
</Router>)
}
}



  export default AppNav;
