import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';


import AuthUserContext from '../AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from '../withAuthorization';
import YouTube from 'react-youtube';

const NextModulePage = () =>
<AuthUserContext.Consumer>
  {authUser =>
    <div>
      <h1>Next module for:  {authUser.email}</h1>
      <div className="mdl-card__supporting-text mdl-color-text--grey-600">

          <p>Module X : Module Title</p>
          <br/>

          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id laoreet mauris, non consectetur ligula. Nam ornare semper ex sit amet lacinia. Aliquam pulvinar tincidunt tortor, id ultrices libero placerat eu. Maecenas pellentesque odio et lacus pulvinar, ut tristique justo pretium. Integer consectetur felis id mauris dignissim, eget ultricies nulla elementum. Nulla vitae ultrices lectus, vitae ultricies nisi. Suspendisse facilisis quis ex vitae hendrerit. Cras facilisis dolor sed lorem semper molestie. Vestibulum viverra dictum finibus. Vivamus aliquam orci ipsum, a pellentesque orci maximus ac.

          Sed ultricies justo id sagittis sagittis. Proin ac est congue, pretium ligula id, egestas nunc. Praesent tortor lectus, dapibus eu efficitur vitae, pulvinar ut libero. Nam lorem odio, semper nec erat quis, sollicitudin eleifend nisi. Vivamus semper ligula at sapien tincidunt, vitae placerat sapien bibendum. Donec laoreet mi at felis feugiat molestie vitae in nulla. Sed vitae finibus tellus. Donec sagittis nunc vitae elit ullamcorper, ac finibus massa pretium.

          Cras tincidunt, metus et hendrerit auctor, dolor lectus faucibus tellus, maximus vulputate libero augue sed nisl. Integer luctus felis in leo pretium, in dapibus dui mattis. Nam libero sem, varius rutrum velit id, blandit finibus massa. Sed malesuada sed leo ut dictum. Fusce lacinia accumsan eros, et.</p>

                  <YouTube
          videoId={'LuwKLePYLqY'}                  // defaults -> null
        />
        <br/><br/>
        <Link to={routes.HOMEWORK}><button className="mdl-button mdl-js-button mdl-button--raised" id="startHomework" name="homework">Start Homework Exercice</button> </Link>
        <br/><br/>
        <Link to={routes.HOME}><button className="mdl-button mdl-js-button mdl-button--raised" id="mainMenu" name="mainMenuBt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Return To Main Menu &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</button></Link>
        <br/><br/>
        <br/><br/>
    </div>
    </div>
  }
  </AuthUserContext.Consumer>

  const authCondition = (authUser) => !!authUser;



export default withAuthorization(authCondition)(NextModulePage);
