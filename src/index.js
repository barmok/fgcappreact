import React from 'react';
import ReactDOM from 'react-dom';
import EmailInput from './components/EmailInput';
import EmaiVerifBt from './components/EmaiVerifBt';
import Logo from './components/logo';
import PasswordInput from './components/PasswordInput';
import QuickstartDetails from './components/QuickstartDetails';
import LoginBt from './components/LoginBt';
import RegisterBt from './components/RegisterBt';
import ResetPwdBt from './components/ResetPwdBt';
import SignInStatus from './components/SignInStatus';
import SignOutButton from './components/pages/SignOut';
import SupportingText from './components/SupportingText';
import Title from './components/Title';
import './css/custom.css';
import './css/index.css';
import './css/material.orange-indigo.min.css';
import MetaTags from 'react-meta-tags';
import {BrowserRouter as Router} from 'react-router-dom'
import AppNav from './components/AppNav';
import {Helmet} from "react-helmet";



const App = () => (


        <div className='wrapper'>
        <Helmet>
                <script defer src="https://code.getmdl.io/1.1.3/material.min.js"></script>
                <script src="https://cdn.firebase.com/libs/firebaseui/2.5.1/firebaseui.js"></script>
                <script src="/__/firebase/4.0.0/firebase-app.js"></script>
                <script src="/__/firebase/4.0.0/firebase-auth.js"></script>
                <script src="/__/firebase/init.js"></script>
                <script src="/js/require.js"></script>
                <script src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"></script>


                </Helmet>



        <MetaTags>
            <meta charSet="utf-8" />
            <title>FGCApp</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta property="og:title" content="Sign In FGCApp" />
          </MetaTags>
        <div className='mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid mdl-typography--text-center'  >
        <div className='mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop'>

          <AppNav />
            <Logo />
          </div>
          </div>
        </div>
);
/*function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    // [START_EXCLUDE silent]
    document.getElementById('quickstart-verify-email').disabled = true;
    // [END_EXCLUDE]
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      document.getElementById('quickstart-sign-in').textContent = 'Sign out';
      document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
        window.location.replace("./loggedIn.html")
      if (!emailVerified) {
        document.getElementById('quickstart-verify-email').disabled = false;
      }
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      document.getElementById('quickstart-sign-in').textContent = 'Sign in';
      document.getElementById('quickstart-account-details').textContent = 'null';
      // [END_EXCLUDE]
    }
    // [START_EXCLUDE silent]
    document.getElementById('quickstart-sign-in').disabled = false;
    // [END_EXCLUDE]
  });
  // [END authstatelistener]
  document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
  document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
  document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
  document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}*/

ReactDOM.render(  <App />, document.getElementById('root'));
