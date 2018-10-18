import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import {firebase, db} from '../../firebase';
import * as homeworkForms from './homeworkForms'
import AuthUserContext from '../AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import YouTube from 'react-youtube';

const INITIAL_STATE ={
  authUser:null,

  nModuleCompleted:null,
  module:{  textContent: null,
    title: null,
    videoLink:null,homework:{title: null, textContent:null}},
  error: null,
};
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});
var ButtonsContent = () => <div></div>;
var HomeworkForm = () => <div></div>;

class ShowHomeworkPage extends Component {
  _isPreview=false;
  _isMounted=false;
  constructor(props){
        super(props);
        if(this.props.state)
        {
          this.state = this.props.state.location.state;
          this._isPreview = true;
        }
        else {
          this.state = {
            ...INITIAL_STATE

          }
        }
        console.log(this.state);
      }
      onSubmit = (event) => {
        const {
          textContent,
          title,
          videoLink,
          homework,
        } = this.state;
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
          switch(this.state.nModuleCompleted)
          {
            case 0:
            HomeworkForm = () => <homeworkForms.HomeWork1Form />
            break;
            case 1:
            HomeworkForm = () => <homeworkForms.HomeWork1Form />
            break;
          }
        }

        const{ textContent,
        title,
        videoLink,
        homework,
      } = this.state.module;
        return(
          <div>
          <div className="mdl-card__supporting-text mdl-color-text--grey-600">

              <h2>{homework.title}</h2>
              <br/>
              <p> {homework.textContent}</p>
              <h3>Thought Diary</h3>

              <HomeworkForm />

              <br/>



            <br/><br/>
            <Link to={{pathname: routes.ADDMODULE, state: this.state.module}}><button className="mdl-button mdl-js-button mdl-button--raised" id="backBt" name="back">Back</button> </Link>


              <br/><br/>
          </div>
          <br/>


        <br/><br/>
        <Link to={routes.HOME}><button className="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-in" name="backToHome">Back To Home</button></Link>


          <br/><br/>
          </div>)

        }
}



export default ShowHomeworkPage;
