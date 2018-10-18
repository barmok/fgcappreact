import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AuthUserContext from '../AuthUserContext';
import { SignUpLink } from './SignUp';
import {PasswordForgetLink} from './PasswordForget';
import {auth} from '../../firebase';
import {firebase} from '../../firebase';
import * as firebase2 from 'firebase';
import * as routes from '../../constants/routes'
import { Link } from 'react-router-dom';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

const SignInPage = ({history}) =>
<AuthUserContext.Consumer>
{ authUser => authUser ?
  history.push(routes.HOME)
  : <div>
    <h1>Sign In</h1>
    <SignInForm history={history} />
  </div>
}
</AuthUserContext.Consumer>

  const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

  const INITIAL_STATE = {
    email: '',
    password: '',
    phoneNumber: '',
    users:null,
    error: null,
    authUser: null,
  };

  class SignInForm extends Component {

    componentDidMount(){
      firebase.auth.onAuthStateChanged(authUser => {
        if(authUser)
        {
          console.log("User Authed");
          this.setState(() => ({ authUser}))
         }
         else
         {
         this.setState(() => ({ authUser: null}));
        }
      } )



      }

    constructor(props) {
      super(props);

      this.state = { ...INITIAL_STATE };
    }


    onSubmit = (event) => {
      const {
        email,
        phoneNumber,
        password,
      } = this.state;
      var formatedPhoneNumber;
      const{
        history,
      } = this.props;
      switch(phoneNumber.length)
      {
        case 10:
        formatedPhoneNumber= phoneNumber.replace(/^.{1}/g, '+61');
        break;
        case 13:
        formatedPhoneNumber= phoneNumber.replace(/^.{2}/g,'+')
        break;
        default:
        formatedPhoneNumber= phoneNumber;
        break;
      }

      console.log(formatedPhoneNumber);

      /*
      auth.doSignInWithEmailAndPassword(email, password)
      .then(()=>{
        this.setState(()=>({ ...INITIAL_STATE}));
        */
        if(isBrowser){
        if (window.recaptchaVerifier && this.recaptchaWrapperRef) {
          window.recaptchaVerifier.clear()
          this.recaptchaWrapperRef.innerHTML = `<div id="recaptcha-container"></div>`
        }
        window.recaptchaVerifier = new firebase2.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'visible',
        'callback': function(response) {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
           console.log(response);
        }
    });
    var appVerifier = window.recaptchaVerifier;
        auth.doSignInWithPhoneNumber(formatedPhoneNumber, appVerifier)
        .then(() =>{
        history.push(routes.SMS_CODE_CHECK);

      }).catch(error=>{

        this.setState(()=>({ ...INITIAL_STATE}));

          this.setState(byPropKey('error', error));
          });

    }
    else{

    if(isMobile)
        {
          window.cordova.plugins.firebase.auth.onAuthStateChanged(function(authUser) {
            if(authUser)
            {
              console.log("User Authed");
              this.setState(() => ({ authUser}))
             }
             else
             {
             this.setState(() => ({ authUser: null}));
            }
          } )
          window.cordova.plugins.firebase.auth.verifyPhoneNumber(formatedPhoneNumber,0).then((verificationId)=>{

            var smsCode = prompt("Please enter sms code (6 digits)", "");
            return firebase2.auth.PhoneAuthProvider.credential(verificationId, smsCode);

          }).then(function(phoneCredential) {
        return firebase2.auth().signInWithCredential(phoneCredential);

          });

            //
            //console.log(window.verificationCode);
            //.then(function(userInfo) {
            //  window.cordova.plugins.firebase.auth.signInWithVerificationId(verificationId, "123456")
              //firebase.auth().signInWithCredential(signInCredential);
          //  })
        //  }, function(error) {
    //console.error(error);


  //});
  }
}
            //history.push(routes.SMS_CODE_CHECK);
         //pass verificationId to signInWithVerificationId
         event.preventDefault();
  }


    render(){
      console.log(this.authUser);
      const {
        email,phoneNumber, password, error,
      } = this.state;
      const{
        history,
      } = this.props;
      if(window.verificationCode)
      {

      }
      //const isInvalid = password ==='' || email === '';
      const isInvalid = phoneNumber ==='';
      return(
        <form onSubmit={this.onSubmit}>

          <br />
          Phone Number:
          <input
            value={phoneNumber}
            onChange={event => this.setState(byPropKey('phoneNumber', event.target.value))}
            type="number"
            placeholder="0061 234 567 8910"
          />
          <br />
          <div ref={ref => this.recaptchaWrapperRef = ref}>
          <div id="recaptcha-container"></div>
          </div>
          <br />
          Enter your phone number to sign in, you will receive an sms on your phone to validate your sign in.
          <br />
          It might take a few seconds before you receive the message.
          <br />
          <br />
          <button disabled={isInvalid} type="submit" className="mdl-button mdl-js-button mdl-button--raised">
            Sign In
          </button>
          <br />
          <br />
          { error && <p>{error.message}</p> }
          </form>
      );
  }
}
export default withRouter(SignInPage);

export{
  SignInForm,
};
