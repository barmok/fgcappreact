import React, {Component} from 'react';
import AuthUserContext from '../AuthUserContext';
import withAuthorization from '../withAuthorization';
import {db} from '../../firebase';



const INITIAL_STATE ={
  moduleId:'',
  textContent: '',
  title: '',
  videoLink:'',
  homeworkTitle:'',
  homeworkTextContent:'',
  homeworkExercice:'',
  error: null,
};
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});



class AddModulePage extends Component {

  constructor(props){
        super(props);


      }




  render() {

    <AuthUserContext.Consumer>
    {
      authUser => authUser ?
      this.setState(() => ({authUser: authUser}))
        :null
      }
    </AuthUserContext.Consumer>

    return (
      <div>
        <AddModuleForm/>
      </div>

    )
  }
};




class AddModuleForm extends Component {
  _isMounted =false
  constructor(props){
    super(props);
    this.state = {
      ...INITIAL_STATE

    }
  }
  componentDidMount() {
    this._isMounted =true

  }
  componentWillUnmount(){
    this._isMounted =false
  }
  onSubmit = (event) => {
    const {
      textContent,
      title,
      videoLink,
      homework,
    } = this.state;
  }
  saveModule(){
    this.isInvalid = !this.isInvalid;
      const {
        key,
        role,
      } = this.state;

        db.doUpdateUserRole(key,role)
          .then(() => {
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
        };

    render() {

      db.onceGetModules().then(snapshot =>
        this._isMounted?
        this.setState(() => ({ moduleId: snapshot.val().length }))
        :null
      );
      const modul = this.state;
      return(
      <form onSubmit={this.onSubmit}>
        Module n°
        <input
          className="mdl-textfield__input "
          disabled={true}
          value={this.state.moduleId}
          type="text"
          placeholder="moduleNumber"
        />
        <textarea className="mdl-textfield__input moduleTextarea"
        onChange={event => this.setState(byPropKey('textContent', event.target.value))
          }>
          Module Content
        </textarea>
        <br/><br/>


        <br/><br/>
        <input
          className="mdl-textfield__input "
          disabled={false}
          value={this.state.videoLink}
          onChange={event => this.setState(byPropKey('videoLink', event.target.value))
            }

          type="text"
          placeholder="YouTube Reference"
        />
        <br/><br/>
        <input
          className="mdl-textfield__input "
          disabled={false}
          value={this.state.homeworkTitle}
          onChange={event => this.setState(byPropKey('homeworkTitle', event.target.value))
            }

          type="text"
          placeholder="Homework title"
        />
        <br/><br/>


        <button className="mdl-button mdl-js-button mdl-button--raised edit"

        disabled={false} type="submit" >
        Submit
        </button>
        <br/>
        <br/>
        <button className="mdl-button mdl-js-button mdl-button--raised edit"

        disabled={false} type="button" >
        Cancel
        </button>
        <br/><br/>
        </form>
        )
      }
      }






  const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AddModulePage);
