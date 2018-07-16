import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AuthUserContext from '../AuthUserContext';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import SignOutButton from './SignOut';
import withAuthorization from '../withAuthorization';
import {auth, db} from '../../firebase';

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
      users: null,
    };
  }
  componentDidMount() {

  }

  render() {
    const{
      history,
    } = this.props;
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
    const { users } = this.state;
    return (
      <div>
        <p>Showing progress made by the patient </p>
        {!!users && <UserList users={users} />}
        </div>
    )
  }
}

class EditUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
    this.state.user = props.user;
    this.state.wasEditClicked = false;
  }
  componentDidMount(){
    document.querySelector('.edit').addEventListener('click', this.editClicked);
}
 editClicked() {
  this.state.wasEditClicked = !this.state.wasEditClicked;
}
  onSubmit = (event) => {
      const {
        username,
        email,
        role,
      } = this.state;
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
      auth.doUpdateUser(username, email)
      .then(authUser => {
        db.doUpdateUser(authUser.user.uid, username, email, role)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE}));
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
      role,
      error,
    } = this.state.user;
    const isInvalid = !this.state.wasEditClicked;
    return (
      <tr>
      <form onSubmit={this.onSubmit}>
      <td className="mdl-data-table__cell--non-numeric">
      <input
        className="mdl-textfield__input"
        disabled={isInvalid}
        style={{
          display: "inline",
          width: "auto"
        }}
        value={username}
        onChange={event => this.setState(byPropKey('username', event.target.value))}
        type="text"
        placeholder="Username"
      /></td>
      <td className="mdl-data-table__cell--non-numeric">
      <input
        className="mdl-textfield__input"
        disabled={isInvalid}
        style={{
          display: "inline",
          width: "auto"
        }}
        value={email}
        onChange={event => this.setState(byPropKey('email', event.target.value))}
        type="text"
        placeholder="Email Address"
      /> </td>
      <td className="mdl-data-table__cell--non-numeric"> <input
        className="mdl-textfield__input"
        disabled={isInvalid}
        style={{
          display: "inline",
          width: "auto"
        }}
        value={role}
        onChange={event => this.setState(byPropKey('role', event.target.value))}
        type="text"
        placeholder="Role"
      /></td>
      <td>
      <button className="mdl-button mdl-js-button mdl-button--raised edit" type="button" >
      Edit
      </button>
      &nbsp;
      <button className="mdl-button mdl-js-button mdl-button--raised" disabled={isInvalid} type="button">
      Save
      </button>
      </td>
      </form>
      </tr>


    );
  }
}



const UserList = ({ users }) =>
<AuthUserContext.Consumer>
{ authUser =>



  <div className="mdl-center">
    <h2>List of Users</h2>
    <p> (Saved on Sign Up in Firebase Database)</p>
    <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">

      <thead>
      <tr>
      <th class="mdl-data-table__cell--non-numeric">Username</th>
      <th class="mdl-data-table__cell--non-numeric">Email</th>
      <th class="mdl-data-table__cell--non-numeric">Role</th>
      <th class="mdl-data-table__cell--non-numeric"></th>
    </tr>
    </thead>
    <tbody>
    {Object.keys(users).map(key =>

      <EditUserForm user={users[key]} />


    )}

    </tbody>
    </table>
    </div>
  }
  </AuthUserContext.Consumer>



  const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(ManageUsersPage);
