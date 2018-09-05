import React from 'react';

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

      var {authUser} = this.state;
      if(authUser)
      {
        if(!authUser.role)
        {
        db.onceGetUsers().then(snapshot =>
          this.setState(() => ({ users: snapshot.val() }))
          :null);
          if(this.state.users && this.state.authUser)
          {
          Object.keys(this.state.users).map(key =>{
          this.state.authUser.email===this.state.users[key].email?
            this.state.authUser.role=this.state.users[key].role
            :null
            authUser = this.state.authUser
          })
          }
        }
      }


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
