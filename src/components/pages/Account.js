import React,  {Component} from 'react';

import AuthUserContext from '../AuthUserContext';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from '../withAuthorization';

const INITIAL_STATE = {
  authUser: null,
  users: null,
}

class AccountPage extends Component {
  _isMounted =false
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE
    };

  }
  componentDidMount() {
    this._isMounted =true


  }
  componentWillUnmount(){
    this._isMounted =false
  }
  render() {
    <AuthUserContext.Consumer>
    {
      authUser => authUser ?
      this._isMounted?
      this.setState(() => ({ authUser: authUser }))
        :null
        :null
      }
    </AuthUserContext.Consumer>

    return(
    <AuthUserContext.Consumer>
      {authUser =>
        <div>
          <h1>Account:  {authUser.email}</h1>
          <br />
          Notification Settings
        </div>
      }
      </AuthUserContext.Consumer>
    )
  }

}



  const authCondition = (authUser) => !!authUser;



export default withAuthorization(authCondition)(AccountPage);
