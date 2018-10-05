import React from 'react';

import AuthUserContext from './AuthUserContext';
import {firebase,db} from '../firebase';

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

          if(!this.state.users)
          {
          db.onceGetUsers().then(snapshot =>
            this.setState(() => ({ users: snapshot.val() }))
            :null);

          }
         }
         else
         {
         this.setState(() => ({ authUser: null}));
        }
      } )


      }

    render() {
      var userExist= false;
      var {authUser, users} = this.state;
      if(users && authUser)
      {
      Object.keys(users).map(key =>{
      authUser.uid===key?
        userExist=true
        :null;
      })
      }
        if(!userExist && users && authUser)
        {
          const role = "participant"
        db.doCreateUser(authUser.uid, authUser.phoneNumber, role)
          .catch(error => {

          })
          db.doInitUser(authUser.uid)
            .catch(error => {

            })

      }
      if(this.state.users && this.state.authUser)
          {
          Object.keys(users).map(key =>{
          authUser.phoneNumber===users[key].phoneNumber?
            authUser.role=this.state.users[key].role
            :null
          })
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
