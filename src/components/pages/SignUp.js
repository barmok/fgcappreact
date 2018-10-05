import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import {auth, db} from '../../firebase';
import * as routes from '../../constants/routes';

const SignUpPage = ({history}) =>
  <div>
    <h1>Sign Up</h1>
    <SignUpForm history={history}/>
  </div>

  const INITIAL_STATE ={
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };
  const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

  class SignUpForm extends Component {
    constructor(props) {
      super(props);

      this.state = { ...INITIAL_STATE};
    }
    onSubmit = (event) => {
        const {
          username,
          email,
          passwordOne,
        } = this.state;
        const role = "participant"
        const{
          history,
        } = this.props;
        //With Firebase auth
        /*auth.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          this.setState(() => ({ ...INITIAL_STATE}));
          history.push(routes.HOME);
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });*/
        //With Firebase DB
        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          db.doCreateUser(authUser.user.uid, username, email, role)
            .then(() => {
              this.setState(() => ({ ...INITIAL_STATE}));
              history.push(routes.HOME);
            })
            .catch(error => {
              this.setState(byPropKey('error', error));
            });
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });

        event.preventDefault();
    }


    render() {
      const{
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;
      const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
      return (
        <div className='mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid' style={{textAlign: 'center'}} >
        <div className='mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop'>
        <div className="mdl-card__supporting-text mdl-color-text--grey-600">
          <form onSubmit={this.onSubmit}>

            <input
              className="mdl-textfield__input"
              style={{
                display: "inline",
                width: "auto"
              }}
              value={username}
              onChange={event => this.setState(byPropKey('username', event.target.value))}
              type="text"
              placeholder="Full Name"
            />
            <br />
            <input
              className="mdl-textfield__input"
              style={{
                display: "inline",
                width: "auto"
              }}
              value={email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              type="text"
              placeholder="Email Address"
            />
            <br />
            <input
              className="mdl-textfield__input"
              style={{
                display: "inline",
                width: "auto"
              }}
              value={passwordOne}
              onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
              type="password"
              placeholder="Password"
            />
            <br />
            <input
              className="mdl-textfield__input"
              style={{
                display: "inline",
                width: "auto"
              }}
              value={passwordTwo}
              onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
              type="password"
              placeholder="Confirm Password"
            />
            <br />
            <button className="mdl-button mdl-js-button mdl-button--raised"
              disabled={isInvalid} type="submit">
            Sign Up
            </button>

            {error && <p>{error.message}</p> }
          </form>
        </div>
        </div>
        </div>
      );
    }
  }
  const SignUpLink = () =>
  <p>
    <Link to={routes.SIGN_UP}> <button className="mdl-button mdl-js-button mdl-button--raised"
       type="submit">
    Register
    </button></Link>
  </p>



export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};
