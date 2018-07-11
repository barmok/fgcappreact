import React, {Component} from "react";
import AuthUserContext from './AuthUserContext';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import SignOutButton from './pages/SignOut';
import withAuthentication from './withAuthentication';
import {db,firebase} from '../firebase';

var showDrawer



class UserMenuClass extends Component{
  constructor(props) {
    super(props);


    this.state = {
      authUser: null,
    };
  }
  componentDidMount(){
    firebase.auth.onAuthStateChanged(authUser => {
      if(authUser)
      {
        this.setState(() => ({ authUser}))
       }
       else
       {
       this.setState(() => ({ authUser: null}));
      }
    } )



    }
  static hideToggle() {
    var selectorId = document.querySelector('.mdl-layout');
    selectorId.MaterialLayout.toggleDrawer();
  }
  render()
  {
    if(this.state.authUser)
    {
      showDrawer = "demo-layout-transparent mdl-layout mdl-js-layout"
    }
    else{
      showDrawer = "demo-layout-transparent mdl-layout mdl-js-layout hidden"
    }
    const{
      history,
    } = this.props;
    return(
    <div id="layout" className={showDrawer}>
      <div className="mdl-layout__drawer">
      <UserMenu history={history}/>
        </div>
        </div>
      )
  }
}




const UserMenu = ({history}) =>
        <AuthUserContext.Consumer>
        {
          authUser => authUser ?
          authUser.role==='patient'
          ?<PatientMenu/>
          : authUser.role==='admin'
          ?<AdminMenu/>
          : authUser.role==='therapist'
          ?< TherapistMenu />
          :null
          :null
        }
          </AuthUserContext.Consumer>

const PatientMenu = () =>
<nav className="mdl-navigation">
      <Link className="mdl-navigation__link" to={routes.HOME} onClick={() => this.hideToggle()} style={{ textDecoration: 'none' }}>Home Page</Link>
      <Link className="mdl-navigation__link" to={routes.NEXTMODULE} onClick={() => this.hideToggle()} style={{ textDecoration: 'none' }}>Module</Link>
      <Link className="mdl-navigation__link" to={routes.REVIEWMODULES} onClick={() => this.hideToggle()} style={{ textDecoration: 'none' }}>Review Module</Link>
      <Link className="mdl-navigation__link" to={routes.CONVERSATION} onClick={() => this.hideToggle()} style={{ textDecoration: 'none' }}>Conversation</Link>
      <Link className="mdl-navigation__link" to={routes.ACCOUNT} onClick={() => this.hideToggle()} style={{ textDecoration: 'none' }}>Account</Link>
</nav>

const AdminMenu = () =>
<nav className="mdl-navigation">
      <Link className="mdl-navigation__link" to={routes.HOME} onClick={() => this.hideToggle()} style={{ textDecoration: 'none' }}>Home Page</Link>
      <Link className="mdl-navigation__link" to={routes.ADMIN} onClick={() => this.hideToggle()} style={{ textDecoration: 'none' }} >Admin</Link>
      <Link className="mdl-navigation__link" to={routes.ACCOUNT} onClick={() => this.hideToggle()} style={{ textDecoration: 'none' }}>Account</Link>
</nav>
const TherapistMenu = () =>
<nav className="mdl-navigation">
      <Link className="mdl-navigation__link" to={routes.HOME} onClick={() => this.hideToggle()} style={{ textDecoration: 'none' }}>Home Page</Link>
      <Link className="mdl-navigation__link" to={routes.CONVERSATION} onClick={() => this.hideToggle()} style={{ textDecoration: 'none' }}>Conversation</Link>
      <Link className="mdl-navigation__link" to={routes.ACCOUNT} onClick={() => this.hideToggle()} style={{ textDecoration: 'none' }}>Account</Link>
</nav>


export default withAuthentication(UserMenuClass);
