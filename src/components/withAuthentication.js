import React, {Component} from 'react';

import * as routes from '../constants/routes';
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
        if(authUser)
        {
          this.setState(() => ({ authUser}))
         }
         else
         {
         this.setState(() => ({ authUser: null}));
        }
      } )



      }

    render() {
      const{
        history,
      } = this.props;

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
