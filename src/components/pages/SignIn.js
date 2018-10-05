import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AuthUserContext from '../AuthUserContext';
import { SignUpLink } from './SignUp';
import {PasswordForgetLink} from './PasswordForget';
import {auth} from '../../firebase';
import * as firebase from 'firebase';
import * as routes from '../../constants/routes'
import { Link } from 'react-router-dom';


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
  };

  class SignInForm extends Component {
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

      const{
        history,
      } = this.props;
      /*
      auth.doSignInWithEmailAndPassword(email, password)
      .then(()=>{
        this.setState(()=>({ ...INITIAL_STATE}));
        */
        if (window.recaptchaVerifier && this.recaptchaWrapperRef) {
          window.recaptchaVerifier.clear()
          this.recaptchaWrapperRef.innerHTML = `<div id="recaptcha-container"></div>`
        }
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': function(response) {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
           console.log(response);
        }
    });
    var appVerifier = window.recaptchaVerifier;
        auth.doSignInWithPhoneNumber(phoneNumber, appVerifier)
        .then(() =>{
        history.push(routes.SMS_CODE_CHECK);


      }).catch(error=>{

        this.setState(()=>({ ...INITIAL_STATE}));

          this.setState(byPropKey('error', error));
          });

      event.preventDefault();
    }

    render(){
      const {
        email,phoneNumber, password, error,
      } = this.state;

      //const isInvalid = password ==='' || email === '';
      const isInvalid = phoneNumber ==='';
      return(
        <form onSubmit={this.onSubmit}>

          <br />
          Phone Number:
          <input
            value={phoneNumber}
            onChange={event => this.setState(byPropKey('phoneNumber', event.target.value))}
            type="text"
            placeholder="+61 234 567 8910"
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
