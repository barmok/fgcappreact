import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AuthUserContext from '../AuthUserContext';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import SignOutButton from './SignOut';
import withAuthorization from '../withAuthorization';
import {auth, db, firebase} from '../../firebase';


const INITIAL_STATE ={
  username: '',
  email: '',
  role:'',
  error: null,
};
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});



class ManageUsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
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
    var isInvalid = !this.state.wasEditClicked;

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
    const { users } = this.state;
    return (
      <div>
        {!!users && <UserList users={users}/>}
        </div>
    )
  }
};


class UserList extends Component {
  render(){
    var users = this.props.users;
    return(
<AuthUserContext.Consumer>
{ authUser =>



  <div className="mdl-center">
    <h2>List of Users</h2>
    <p> (Saved on Sign Up in Firebase Database)</p>
    <div className="overflow">
    <table className="fullwidth mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">

      <thead>
      <tr>
      <th class="mdl-data-table__cell--non-numeric fullwidth">Username</th>
      <th class="mdl-data-table__cell--non-numeric fullwidth">Email</th>
      <th class="mdl-data-table__cell--non-numeric fullwidth">Role</th>
      <th class="mdl-data-table__cell--non-numeric fullwidth"></th>
    </tr>
    </thead>
    <tbody>
    {Object.keys(users).map(key =>

      <EditUserForm user={users[key]} ukey={key} />


    )}

    </tbody>
    </table>
    </div>
    </div>
  }
  </AuthUserContext.Consumer>)
}
}

  class EditUserForm extends Component {
    constructor(props){
      super(props);
    this.state = this.props.user;
    this.state.key=this.props.ukey;

    this.isInvalid = true;
    }
    saveUser(){
      this.isInvalid = !this.isInvalid;
        const {
          key,
          username,
          email,
          role,
        } = this.state;
        const{
          history,
        } = this.props;
          db.doUpdateUserRole(key,role)
            .then(() => {
            })
            .catch(error => {
              this.setState(byPropKey('error', error));
            });
          };


    editClicked() {
      this.isInvalid = !this.isInvalid;
    }
    render() {
      const{ username,
      email,
      role,
    } = this.state;
      return(
    <tr>
    <td className="mdl-data-table__cell--non-numeric">
    <input
      className="mdl-textfield__input minWidth"
      disabled={true}
      value={username}
      onChange={event => this.setState(byPropKey('username', event.target.value))}
      type="text"
      placeholder="Username"
    /></td>
    <td className="mdl-data-table__cell--non-numeric">
    <input
      className="mdl-textfield__input minWidth"
      disabled={true}
      value={email}
      onChange={event => this.setState(byPropKey('email', event.target.value))
        }

      type="text"
      placeholder="Email Address"
    /> </td>
    <td className="mdl-data-table__cell--non-numeric">
     <select
      className="minWidth mdl-textfield__input"
      disabled={this.isInvalid}
      value={role}
      onChange={event => this.setState(byPropKey('role', event.target.value))
      }
      type="select"
      placeholder="Role">
      <option value="admin"> Admin </option>
      <option value="participant"> Participant </option>
      <option value="therapist"> Therapist </option>
    </select>
    </td>
    <td>
    <button className="mdl-button mdl-js-button mdl-button--raised edit"
    onClick={
      () => this.editClicked()
    }

    disabled={!this.isInvalid} type="button" >
    Edit
    </button>
    &nbsp;
    <button className="mdl-button mdl-js-button mdl-button--raised"
    onClick={
      () => this.saveUser()
    }
    disabled={this.isInvalid} type="button">
    Save
    </button>
    </td>
    </tr>)
  }
  }



  const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(ManageUsersPage);
