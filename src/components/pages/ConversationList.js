import React, { Component } from 'react';
import { db,firebase } from '../../firebase';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import AuthUserContext from '../AuthUserContext';
import withAuthorization from '../withAuthorization';
import Conversation from './Conversation'

const INITIAL_STATE ={
  authUser: null,
  error: null,
};

const Search = ({ value, onChange, children }) =>
<form>
{children} <input
type="text"
value={value}
onChange={onChange}
placeholder={"Phone Number"}
/>
</form>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const isSearched = searchTerm => item =>
item.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())&&item.role==="participant";

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};





class TherapistConversationPage extends Component {
  _isMounted =false
  constructor() {
    super();

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


    db.onceGetUsers().then(snapshot =>
      this._isMounted?
      this.setState(() => ({ users: snapshotToArray(snapshot) }))
      :null
    );
    const { users } = this.state;
    return (
      <div>
        {!!users && <ConversationList users={users}/>}
        </div>
    )
  }
}

class ConversationList extends Component {
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
    <h2>List of Conversation</h2>

    <Search
      value={searchTerm}
      onChange={this.onSearchChange}
      >
      Search
      </Search>
      <br />
      <div className="mdl-center">
    <table className="mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">

      <thead>
      <tr>
      <th className="mdl-data-table__cell--non-numeric">With (Phone Number)</th>
      <th className="mdl-data-table__cell--non-numeric"></th>
    </tr>
    </thead>

    <tbody>

    {

      this._isMounted?
      users.filter(isSearched(searchTerm)).map(item =>
      <EditUserForm user={item} ukey={item.key} authUserKey={authUser.key}/>)

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

  componentDidMount(){
    firebase.auth.onAuthStateChanged(authUser => {
      if(authUser)
      {
        this.setState(() => ({ authUserKey:authUser.uid, authUserRole:authUser.role}))
       }
       else
       {
       this.setState(() => ({ authUserKey: null}));
      }
    } )

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
    value={this.props.user.phoneNumber}
    onChange={event => this.setState(byPropKey('username', event.target.value))}
    type="text"
    placeholder="Username"
  /></td>
  <td>
  <Link to={{pathname: routes.CONVERSATION,
  state: this.state}}>
  <button className="mdl-button mdl-js-button mdl-button--raised edit"


  disabled={!this.isInvalid} type="button" >
  See
  </button>
  </Link>
  &nbsp;
  </td>
  </tr>)
}
}

  const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(TherapistConversationPage);
