import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AuthUserContext from '../AuthUserContext';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import SignOutButton from './SignOut';
import withAuthorization from '../withAuthorization';
import {db} from '../../firebase';



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
    </tr>
    </thead>
    <tbody>
    {Object.keys(users).map(key =>
      <tr>
      <td className="mdl-data-table__cell--non-numeric"> {users[key].username}</td>
      <td className="mdl-data-table__cell--non-numeric">  {users[key].email}</td>
      <td className="mdl-data-table__cell--non-numeric"> {users[key].role}</td>
      {authUser.email===users[key].email?
      <div className="hidden">authUser.role=users[key].role</div>
      :null}
      </tr>

    )}

    </tbody>
    </table>
    </div>
  }
  </AuthUserContext.Consumer>



  const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(ManageUsersPage);
