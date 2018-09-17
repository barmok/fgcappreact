import React, {Component} from 'react';
import AuthUserContext from '../AuthUserContext';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import withAuthorization from '../withAuthorization';
import { db, firebase} from '../../firebase';


const INITIAL_STATE ={
  username: '',
  email: '',
  role:'',
  error: null,
};
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const Search = ({ value, onChange, children }) =>
<form>
{children} <input
type="text"
value={value}
onChange={onChange}
placeholder={"username"}
/>
</form>

const isSearched = searchTerm => item =>
item.username.toLowerCase().includes(searchTerm.toLowerCase());

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

class ManageUsersPage extends Component {
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
      this.setState(() => ({ authUser: authUser }))
        :null
      }
    </AuthUserContext.Consumer>
    db.onceGetUsers().then(snapshot =>
      this._isMounted?
      this.setState(() => ({ users: snapshotToArray(snapshot) }))
      :null
    );

    const { users } = this.state;
    return (
      <div>
        {!!users && <UserList users={users}/>}
        </div>
    )
  }
};


class UserList extends Component {
  _isMounted =false
  constructor(props) {
super(props);
this.state = {
  users:  this.props.users,
searchTerm: '',
};
this.onSearchChange = this.onSearchChange.bind(this);
}
componentDidMount()
{
  this._isMounted = true
}
componentWillUnmount()
{
  this._isMounted = false
}

onSearchChange(event) {
  if(this._isMounted){
this.setState({ searchTerm: event.target.value });
}
}
  render(){
    const { searchTerm, users } = this.state;
    //var users = this.props.users;
    return(
<AuthUserContext.Consumer>
{ authUser =>



  <div className="mdl-center">
    <h2>List of Users</h2>
    <p> (Saved on Sign Up in Firebase Database)</p>
    <div className="overflow">
    <Search
      value={searchTerm}
      onChange={this.onSearchChange}
      >
      Search
      </Search>
    <table className="fullwidth mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">

      <thead>
      <tr>
      <th className="mdl-data-table__cell--non-numeric fullwidth">Username</th>
      <th className="mdl-data-table__cell--non-numeric fullwidth">Email</th>
      <th className="mdl-data-table__cell--non-numeric fullwidth">Role</th>
      <th className="mdl-data-table__cell--non-numeric fullwidth"></th>
    </tr>
    </thead>

    <tbody>

    {

      this._isMounted?
      users.filter(isSearched(searchTerm)).map(item =>
      <EditUserForm user={item} ukey={item.key} />)

      :null
    }

    </tbody>
    </table>
    </div>
    <br/><br/>
    <Link to={routes.ADMIN}><button className="mdl-button mdl-js-button mdl-button--raised" id="adminMenu" name="adminMenuBt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Return To Admin Menu &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</button></Link>
    <br/><br/>
    <Link to={routes.HOME}><button className="mdl-button mdl-js-button mdl-button--raised" id="mainMenu" name="mainMenuBt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Return To Main Menu &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</button></Link>
    <br/><br/>
    </div>
  }
  </AuthUserContext.Consumer>)
}
}

  class EditUserForm extends Component {
    constructor(props){
      super(props);
    this.state = this.props.user;

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
      
    }
    render() {
      const {username,
      email,
      role,} = this.state;

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



  const authCondition = (authUser) => !!authUser && authUser.role==='admin';

export default withAuthorization(authCondition)(ManageUsersPage);
