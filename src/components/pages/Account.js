import React,  {Component} from 'react';

import AuthUserContext from '../AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from '../withAuthorization';
import {db, firebase} from '../../firebase';

class AccountPage extends Component {
  constructor(props) {
    super(props);


    this.state = {
      authUser: null,
      users: null,
    };

  }
  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser =>
      {
        this.state.authUser = authUser})

  }
  render() {
    const{
      history,
    } = this.props;
    <AuthUserContext.Consumer>
    {

      authUser => authUser ?
      this.state.authUser = authUser
        :null
      }
    </AuthUserContext.Consumer>
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
    var authUser
    if(this.state.users && this.state.authUser)
    {
    Object.keys(this.state.users).map(key =>{
    this.state.authUser.email===this.state.users[key].email?
      this.state.authUser.role=this.state.users[key].role
      :null
      authUser = this.state.authUser
    })
    }
    return(
    <AuthUserContext.Consumer>
      {authUser =>
        <div>
          <h1>Account:  {authUser.email}</h1>
          <br />
          <PasswordChangeForm />
        </div>
      }
      </AuthUserContext.Consumer>
    )
  }

}



  const authCondition = (authUser) => !!authUser;



export default withAuthorization(authCondition)(AccountPage);
