import React, {Component} from 'react';
import AuthUserContext from '../AuthUserContext';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import SignOutButton from './SignOut';
import withAuthorization from '../withAuthorization';
import {db, firebase} from '../../firebase';



class HomePage extends Component {
  constructor(props) {
    super(props);


    this.state = {
      authUser: null,
      users: null,
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

    <AuthUserContext.Provider value={authUser}>
    <Component />
    </AuthUserContext.Provider>
    const { users } = this.state;
    return (
      <div>
        <Content history={history}/>
        <p>Showing progress made by the patient </p>
        {!!users && <UserList users={users} />}
        </div>
    )
  }
}

const Content = ({history}) =>
<AuthUserContext.Consumer>
{
  authUser => authUser ?
  authUser.role==='patient'?
  <PatientMenu/>
  : authUser.role==='admin'?
  <AdminMenu />
  : authUser.role==='therapist'?
  <TherapistMenu />
  :null
  :null
}
  </AuthUserContext.Consumer>


  const PatientMenu = () =>
  <div>
  <br/><br/>
    <Link to={routes.REVIEWMODULES}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="reviewModules" name="review">Review Previous Modules</button></Link>
    <br/><br/>
    <Link to={routes.NEXTMODULE}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="nextModule" name="next">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Next Module &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</button></Link>
    <br/><br/>
    <Link to={routes.CONVERSATION}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="emailTherapist" name="emailToTherapist">&nbsp;Conversation with therapist&nbsp;</button></Link>
    <br/><br/>
    <Link to={routes.ACCOUNT}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised hidden" id="quickstart-sign-up" name="signup">Register</button></Link>
    <br/><br/>
    <br/><br/>
    <SignOutButton />
  </div>

  const AdminMenu = () =>
  <div>

    <br/><br/>
    <Link to={routes.ACCOUNT}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="quickstart-account" name="account">Account</button></Link>
    <br/><br/>
    <Link to={routes.ADMIN}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="admin" name="admin">Admin</button></Link>
    &nbsp;&nbsp;&nbsp;
    <br/><br/>
    <br/><br/>
    <SignOutButton />
  </div>

  const TherapistMenu = () =>
  <div>
  <div class="mdl-layout__drawer">
  <nav className="mdl-navigation">
        <a className="mdl-navigation__link" href={routes.ACCOUNT}>Account</a>
        <a className="mdl-navigation__link" href={routes.CONVERSATION}>Account</a>
  </nav>
  </div>
    <br/><br/>
    <Link to={routes.CONVERSATION}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="emailTherapist" name="emailToTherapist">&nbsp;Conversation with therapist&nbsp;</button></Link>
    <br/><br/>
    <Link to={routes.ACCOUNT}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised hidden" id="quickstart-sign-up" name="signup">Register</button></Link>
    <br/><br/>
    &nbsp;&nbsp;&nbsp;
    <br/><br/>
    <br/><br/>
    <SignOutButton />
  </div>

const UserList = ({ users }) =>
<AuthUserContext.Consumer>
{ authUser =>


  <div>
    <h2>List of module completed of {authUser.email}</h2>
    <p> (Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}  {users[key].role}
      {authUser.email===users[key].email?
      null
      :null}
      </div>
    )}
    </div>
  }
  </AuthUserContext.Consumer>



  const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
