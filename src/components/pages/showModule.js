import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import {firebase, db} from '../../firebase';

import withAuthentication from '../withAuthentication';
import AuthUserContext from '../AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import YouTube from 'react-youtube';

const INITIAL_STATE ={
  authUser:null,

  nModuleCompleted:null,
  module:{  textContent: null,
    title: null,
    videoLink:null,homework:null},
  error: null,
};

var ButtonsContent = () => <div></div>;

class ShowModulePage extends Component {
_isPreview=false;
_isMounted=false;

  constructor(props){
        super(props);
        this.state = {
          ...INITIAL_STATE
        }
        if(this.props.state)
        {
          this.state = this.props.state.location.state;
          this._isPreview = true;
        }
        else {
          this._isPreview=false;
        }

        console.log(this.state);
      }
componentDidMount(){
    this._isMounted =true;
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
    ButtonsContent = () => this._isPreview ?
    <Link to={{pathname: routes.ADDMODULE, state: this.state.module}}><button className="mdl-button mdl-js-button mdl-button--raised" id="backBt" name="back">Back</button> </Link>
    : <div><Link to={routes.SHOWHOMEWORK}><button className="mdl-button mdl-js-button mdl-button--raised" id="startHomework" name="homework">Start Homework Exercice</button> </Link>
    <br/><br/>
    <Link to={routes.HOME}><button className="mdl-button mdl-js-button mdl-button--raised" id="mainMenu" name="mainMenuBt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Return To Main Menu &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</button></Link>
    </div>

  }
componentWillUnmount(){
  this._isMounted =false
}

      render()
      {
        if(this.state.authUser)
        {
          db.onceGetUsersProgress(this.state.authUser.uid).then(snapshot =>
            this._isMounted?
            this.setState(() => ({nModuleCompleted:snapshot.val()}))
            :null
          )
        }
        if(this.state.nModuleCompleted!=null && this.state.module.textContent===null)
        {
          db.onceGetModule(this.state.nModuleCompleted+1).then(snapshot =>
            this._isMounted?
            this.setState(() => ({module:snapshot.val()}))
            :null
          )
        }
        const{ textContent,
        title,
        videoLink,
        homework,
      } = this.state.module;
        return(
            <div>
              <h1 >Number of module completed:  {this.state.nModuleCompleted}</h1>
              <div className="mdl-card__supporting-text mdl-color-text--grey-600">

                  <h1>{title}</h1>
                  <br/>

                  <p className="module-text" dangerouslySetInnerHTML={{__html: textContent}}>
                  </p>



                <br/><br/>
                {videoLink?

                <YouTube
                videoId={videoLink}                  // defaults -> null
                />:null}
                <br/><br/>
              <br/><br/>
              <ButtonsContent/>
                <br/><br/>
                <br/><br/>

            </div>
            </div>
            :null
          )

        }
}

export default ShowModulePage;
