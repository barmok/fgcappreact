import React, {Component} from "react";
import AuthUserContext from './AuthUserContext';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';
import {firebase} from '../firebase';

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
    document.querySelector('.mdl-layout__drawer').addEventListener('click', close);



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


function close() {
  var d = document.querySelector('.mdl-layout');
  d.MaterialLayout.toggleDrawer();
}


const UserMenu = ({history}) =>
        <AuthUserContext.Consumer>
        {
          authUser => authUser ?
          authUser.role==='participant'
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
      <Link className="mdl-navigation__link" to={routes.HOME}  style={{ textDecoration: 'none' }}>Home Page</Link>
      <Link className="mdl-navigation__link" to={routes.NEXTMODULE} style={{ textDecoration: 'none' }}>Module</Link>
      <Link className="mdl-navigation__link" to={routes.REVIEWMODULES}  style={{ textDecoration: 'none' }}>Review Module</Link>
      <Link className="mdl-navigation__link" to={routes.CONVERSATION}  style={{ textDecoration: 'none' }}>Conversation</Link>
      <Link className="mdl-navigation__link" to={routes.ACCOUNT}  style={{ textDecoration: 'none' }}>Account</Link>
</nav>

const AdminMenu = () =>
<nav className="mdl-navigation">
      <Link className="mdl-navigation__link" to={routes.HOME}  style={{ textDecoration: 'none' }}>Home Page</Link>
      <Link className="mdl-navigation__link" to={routes.ADMIN}  style={{ textDecoration: 'none' }} >Admin</Link>
      <Link className="mdl-navigation__link" to={routes.ACCOUNT}  style={{ textDecoration: 'none' }}>Account</Link>
</nav>
const TherapistMenu = () =>
<nav className="mdl-navigation">
      <Link className="mdl-navigation__link" to={routes.HOME}  style={{ textDecoration: 'none' }}>Home Page</Link>
      <Link className="mdl-navigation__link" to={routes.CONVERSATION}  style={{ textDecoration: 'none' }}>Conversation</Link>
      <Link className="mdl-navigation__link" to={routes.ACCOUNT}  style={{ textDecoration: 'none' }}>Account</Link>
</nav>


export default withAuthentication(UserMenuClass);
