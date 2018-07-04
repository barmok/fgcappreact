import React from 'react';
import {withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import AuthUserContext from '../AuthUserContext';

import SignOutButton from './SignOut';

const LandingPage = () =>
<AuthUserContext.Consumer>
{
  authUser => authUser ?
  authUser.role==='patient'?
  <PatientMenu/>
  : authUser.role==='admin'?
  <AdminMenu />
  : authUser.role==='therapist'?
  <TherapistMenu />
  :this.state.push(routes.HOME)
  :this.state.push(routes.SIGN_IN)
}
  </AuthUserContext.Consumer>

const PatientMenu = () =>
<div>
  <Link to={routes.REVIEWMODULES}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="reviewModules" name="review">Review Previous Modules</button></Link>
  <br/><br/>
  <Link to={routes.NEXTMODULE}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="nextModule" name="next">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Next Module &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</button></Link>
  <br/><br/>
  <Link to={routes.CONVERSATION}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="emailTherapist" name="emailToTherapist">&nbsp;Conversation with therapist&nbsp;</button></Link>
  <br/><br/>
  <Link to={routes.ACCOUNT}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised hidden" id="quickstart-sign-up" name="signup">Register</button></Link>
  <br/><br/>
  <Link to={routes.ADMIN}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="admin" name="admin">Admin</button></Link>
  &nbsp;&nbsp;&nbsp;
  <br/><br/>
  <br/><br/>
  <SignOutButton />
</div>

const AdminMenu = () =>
<div>
  <Link to={routes.ACCOUNT}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised hidden" id="quickstart-sign-up" name="signup">Register</button></Link>
  <br/><br/>
  <Link to={routes.ADMIN}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="admin" name="admin">Admin</button></Link>
  &nbsp;&nbsp;&nbsp;
  <br/><br/>
  <br/><br/>
  <SignOutButton />
</div>

const TherapistMenu = () =>
<div>
  <Link to={routes.CONVERSATION}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="emailTherapist" name="emailToTherapist">&nbsp;Conversation with therapist&nbsp;</button></Link>
  <br/><br/>
  <Link to={routes.ACCOUNT}><button type="submit" className="mdl-button mdl-js-button mdl-button--raised hidden" id="quickstart-sign-up" name="signup">Register</button></Link>
  <br/><br/>
  &nbsp;&nbsp;&nbsp;
  <br/><br/>
  <br/><br/>
  <SignOutButton />
</div>

export default LandingPage;
