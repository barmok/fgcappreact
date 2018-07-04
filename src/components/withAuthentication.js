import React, {Component} from 'react';

import AuthUserContext from './AuthUserContext';
import {firebase} from '../firebase';
import {db} from '../firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {

    constructor(props){
      super(props);

      this.state = {
        authUser: null,
        users: null,
      };
    }

    componentDidMount(){

      db.onceGetUsers().then(snapshot =>
        this.setState(() => ({ users: snapshot.val() }))
      );
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
        ? this.setState(() => ({ authUser}))
        : this.setState(() => ({ authUser: null}));
      });
      this.state.users?
      Object.keys(this.state.users).map(key =>
        {this.state.email===this.state.users[key].email?
        this.state.role=this.state.users[key].role
        :null}).catch(error =>{

        })
        :null
    }
    render() {
      const {authUser} = this.state;


        return (
          <AuthUserContext.Provider value={authUser}>
          <Component />
          </AuthUserContext.Provider>
        );
    }
  }
  return WithAuthentication;
}
export default withAuthentication;
