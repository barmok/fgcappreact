import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

import AuthUserContext from '../AuthUserContext';
import TextInput from '../textArea';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from '../withAuthorization';
import YouTube from 'react-youtube';

const HomeworkPage = () =>
<AuthUserContext.Consumer>
  {authUser =>
    <div>
    <div class="mdl-card__supporting-text mdl-color-text--grey-600">

        <p>Module X : Homework</p>
        <br/>

        <p>Question 1</p>

        <TextInput/>
        <br/>
        <p>Question 2</p>

        <TextInput/>
        <br/>
        <p>Question 3</p>

        <TextInput/>
        <br/>
        <Link to={routes.SUBMIT}><button className="mdl-button mdl-js-button mdl-button--raised" id="submitHomework" name="homework">Submit</button></Link>
        <br/><br/>
        <Link to={routes.NEXTMODULE}><button className="mdl-button mdl-js-button mdl-button--raised" id="backToModule" name="backToModuleBt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Back To Module &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</button></Link>
        <br/>
         <br/>


      <br/><br/>
      <Link to={routes.HOME}><button className="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-in" name="backToHome">Back To Home</button></Link>


        <br/><br/>
    </div>
    </div>
  }
  </AuthUserContext.Consumer>

  const authCondition = (authUser) => !!authUser;



export default withAuthorization(authCondition)(HomeworkPage);
