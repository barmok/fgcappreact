import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AuthUserContext from '../AuthUserContext';
import { SignUpLink } from './SignUp';
import {PasswordForgetLink} from './PasswordForget';
import {auth, db} from '../../firebase';
import * as firebase from 'firebase';
import * as routes from '../../constants/routes'


const SmsCodeCheckPage = ({history}) =>
<AuthUserContext.Consumer>
{ authUser => !window.confirmationResult ?
  history.push(routes.HOME)
  : <div>
    <h1>Enter SMS code</h1>
    <SMSCodeForm history={history} />
  </div>
}
</AuthUserContext.Consumer>

  const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

  const INITIAL_STATE = {
    smscode: '',
    users: '',
    error: null,
  };

  class SMSCodeForm extends Component {
    constructor(props) {
      super(props);

      this.state = { ...INITIAL_STATE };
      this.onSubmit = this.onSubmit.bind(this);
    }


    onSubmit = (event) => {
      const {
        smscode, users,
      } = this.state;



      const{
        history,
      } = this.props;
      /*
      auth.doSignInWithEmailAndPassword(email, password)
      .then(()=>{
        this.setState(()=>({ ...INITIAL_STATE}));
        */
        window.confirmationResult.confirm(smscode).then(function (result) {
        // User signed in successfully.


        history.push(routes.HOME)
        // ...
      }).catch(function (error) {
        // User couldn't sign in (bad verification code?)
        // ...
      });

      event.preventDefault();
    }

    render(){
      const {
        smscode, error,
      } = this.state;

      if(!window.confirmationResult)
      {

      }

      //const isInvalid = password ==='' || email === '';
      const isInvalid = smscode ==='';
      return(
        <form onSubmit={this.onSubmit}>
          <input
            value={smscode}
            onChange={event => this.setState(byPropKey('smscode', event.target.value))}
            type="text"
            placeholder="SMS code"
          />
          <br />
          <div id='confirm-button'></div>
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
export default withRouter(SmsCodeCheckPage);

export{
  SMSCodeForm,
};
