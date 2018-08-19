import React from 'react';

import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

import withAuthorization from '../withAuthorization';

import AuthUserContext from '../AuthUserContext';

const AdminPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <h1>Admin</h1>
        <p>Restricted area! Only user with the admin rule are authorized. </p>
        <Link to={routes.MANAGEUSERS}><button className="mdl-button mdl-js-button mdl-button--raised" id="manageUsers" name="manageUsersBt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Manage Users &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</button></Link>
        <Link to={routes.MANAGEMODULES}><button className="mdl-button mdl-js-button mdl-button--raised" id="manageModules" name="manageModulesBt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Manage Modules &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</button></Link>
        <Link to={routes.MANAGEAPP}><button className="mdl-button mdl-js-button mdl-button--raised" id="manageApp" name="manageAppBt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Manage App Content &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</button></Link>


      <br/><br/>
      <Link to={routes.HOME}><button className="mdl-button mdl-js-button mdl-button--raised" id="mainMenu" name="mainMenuBt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Return To Main Menu &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</button></Link>
      <br/><br/>
      </div>
    }
    </AuthUserContext.Consumer>

    const authCondition = (authUser) => !!authUser && authUser.role === 'admin';

    export default withAuthorization(authCondition)(AdminPage);
