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
    firebase.auth.onAuthStateChanged(authU =>
      {
        this.setState(() => ({ authUser: authU }))})

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


    const { users } = this.state;
    return (
      <div>
        <Content history={history}/>
        {!!users && <UserList users={users} />}
        </div>
    )
  }
}

const Content = ({history}) =>
<AuthUserContext.Consumer>
{
  authUser => authUser ?
  authUser.role==='participant'?
  <ParticipantMenu/>
  : authUser.role==='admin'?
  <AdminMenu />
  : authUser.role==='therapist'?
  <TherapistMenu />
  :null
  :null
}
  </AuthUserContext.Consumer>


  const ParticipantMenu = () =>
  <div>
  <br/><br/>
    <Link to={routes.REVIEWMODULES}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="reviewModules" name="review">Previous Modules</button></Link>
    <br/><br/>
    <Link to={routes.NEXTMODULE}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="nextModule" name="next">Next Module </button></Link>
    <br/><br/>
    <Link to={routes.CONVERSATION}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="emailTherapist" name="emailToTherapist">&nbsp;Message therapist&nbsp;</button></Link>

    <br/><br/>
    <br/><br/>
    <SignOutButton />
    <br/><br/>
  </div>

  const AdminMenu = () =>
  <div>

    <br/><br/>
    <Link to={routes.ACCOUNT}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="quickstart-account" name="account">Account</button></Link>
    <br/><br/>
    <Link to={routes.ADMIN}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="admin" name="admin">Admin</button></Link>
    <br/><br/>
    <br/><br/>
    <SignOutButton />

    <br/><br/>
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
    <br/><br/>
    <br/><br/>
    <SignOutButton />
    <br/><br/>
  </div>

const UserList = ({ users }) =>
<AuthUserContext.Consumer>
{ authUser =>


  <div className="hidden">
    <h2 >List of module completed of {authUser.email}</h2>
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
