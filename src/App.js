import React, { Component } from 'react';
import * as routes from './constants/routes';
import UserMenuClass from './components/UserMenu'
import {HashRouter as Router, Route} from 'react-router-dom'
import ManageModulesPage from './components/pages/ManageModules'
import ReviewModulesPage from './components/pages/ReviewModules'
import EditModulePage from './components/pages/EditModule'
import AddModulePage from './components/pages/AddModule'
import SignInPage from './components/pages/SignIn'
import withAuthentication from './components/withAuthentication';
import HomePage from './components/pages/Home';
import AdminPage from './components/pages/AdminPage';
import ManageUsersPage from './components/pages/ManageUser'
import SignUpPage from './components/pages/SignUp';
import AccountPage from './components/pages/Account';
import NextModulePage from './components/pages/NextModule'
import HomeworkPage from './components/pages/Homework';
import PasswordForgetPage from './components/pages/PasswordForget';
import ShowModulePage from './components/pages/showModule';
import ShowHomeworkPage from './components/pages/showHomework';
import TherapistConversationPage from './components/pages/ConversationList';
import Conversation from './components/pages/Conversation'
import SmsCodeCheckPage from './components/pages/smsCodeCheck'

import Logo from './components/logo';
import Title from './components/Title';
import {Helmet} from "react-helmet";
import './css/custom.css';
import './css/index.css';
import './css/material.orange-indigo.min.css';




class App extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
    };
  }



  render() {
    return (
      <div className="App">
      <Helmet>
          <script defer src="https://code.getmdl.io/1.1.3/material.min.js"></script>
          <script src="https://cdn.firebase.com/libs/firebaseui/2.5.1/firebaseui.js"></script>
          <script src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"></script>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Helmet>
      <div className=' mdl-typography--text-center'  >
      <div className='mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop mdl-typography--text-center'>


      <Router>
      <div>
      <UserMenuClass />
      <Title />
      <main className="mdl-layout__content">
      <Route exact path={routes.ACCOUNT} component={AccountPage} />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.EDITMODULE} component={(state) => <EditModulePage state={state} />}/>
      <Route exact path={routes.MODULEPREVIEW} component={(state) => <ShowModulePage state={state} />} />
      <Route exact path={routes.HOMEWORK} component={() => <HomeworkPage />} />
      <Route exact path={routes.HOMEWORKPREVIEW } component={(state) => <ShowHomeworkPage state={state} />} />
      <Route exact path={routes.MANAGEMODULES} component={() => <ManageModulesPage />} />
      <Route exact path={routes.ADDMODULE} component={(state) => <AddModulePage state={state} />}/>
      <Route exact path={routes.ADMIN} component={AdminPage}/>
      <Route exact path={routes.MANAGEUSERS} component={() => <ManageUsersPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.SMS_CODE_CHECK} component={() => <SmsCodeCheckPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route exact path={routes.NEXTMODULE} component={() => <NextModulePage />} />
      <Route exact path={routes.SHOWHOMEWORK} component={() => <ShowHomeworkPage />} />
      <Route exact path={routes.CONVERSATION} component={(state) => <Conversation state={state}/>} />
      <Route exact path={routes.CONVERSATIONLIST} component={() => <TherapistConversationPage />} />
      <Route exact path={routes.SHOWNEXTMODULE} component={() => <ShowModulePage />} />
      <Route exact path={routes.REVIEWMODULES} component={() => <ReviewModulesPage />} />


      </main>
      <Logo />
      </div>
      </Router>







        </div>
        </div>
        </div>
    );
  }
}

export default withAuthentication(App);
