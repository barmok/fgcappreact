import React, {Component} from 'react';
import AuthUserContext from '../AuthUserContext';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import SignOutButton from './SignOut';
import withAuthorization from '../withAuthorization';
import {db, firebase} from '../../firebase';



class HomePage extends Component {
  _isMounted =false
  constructor(props) {
    super(props);


    this.state = {
      authUser: null,
      users: null,
    };

  }
  render() {
    const{
      history,
    } = this.props;
    var User;
    <AuthUserContext.Consumer>
    {

      authUser => authUser ?
      this.setState(() => ({ authUser: authUser }))
        :null
      }
    </AuthUserContext.Consumer>

    console.log(this.state);

    const { users } = this.state;
    return (
      <div>
        <Content history={history}/>
        </div>
    )
  }
}

const Content = ({history}) =>
<AuthUserContext.Consumer>
{
  authUser => authUser ?
  authUser.role==='participant'?
  <ParticipantMenu authUser={authUser}/>
  : authUser.role==='admin'?
  <AdminMenu />
  : authUser.role==='therapist'?
  <TherapistMenu />
  :null
  :null
}
  </AuthUserContext.Consumer>


  const ParticipantMenu = (auth) =>
  <div>
  <br/><br/>
    <Link to={routes.REVIEWMODULES}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="reviewModules" name="review">Previous Modules</button></Link>
    <br/><br/>
    <Link to={{pathname: routes.SHOWNEXTMODULE,
    state: this.state}}>
      <button className="mdl-button mdl-js-button mdl-button--raised edit"
      disabled={false} type="button" >
      Next Module Active
      </button>
      </Link>
      <br />
      <br />
    <Link to={routes.NEXTMODULE}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="nextModule" name="next">Next Module Passive</button></Link>
    <br/><br/>
    <Link to={{pathname: routes.CONVERSATION,
    state: {key:'kG9D8MJa7VRfNDcBlPeifWC8UH52' ,authUserKey:auth.authUser.uid, authUserRole:auth.authUser.role}}}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="emailTherapist" name="emailToTherapist">&nbsp;Message therapist&nbsp;</button></Link>

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
    <Link to={routes.CONVERSATIONLIST}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="emailTherapist" name="emailToTherapist">&nbsp;Messages &nbsp;</button></Link>

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





  const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
