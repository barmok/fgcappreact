import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AuthUserContext from '../AuthUserContext';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import SignOutButton from './SignOut';
import withAuthorization from '../withAuthorization';
import {auth, db, firebase} from '../../firebase';


const INITIAL_STATE ={
  username: '',
  email: '',
  role:'',
  error: null,
};
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});



class EditModulePage extends Component {



  componentDidMount() {
    const module = JSON.parse(this.props.module)


  }

  render() {
    const{
      history,
    } = this.props;

    <AuthUserContext.Consumer>
    {

      authUser => authUser ?
      this.state.authUser = authUser
        :null
      }
    </AuthUserContext.Consumer>
    db.onceGetModules().then(snapshot =>
      this.setState(() => ({ modules: snapshot.val() }))
    );
    var authUser;
    if(this.state)
    {
    if(this.state.users && this.state.authUser)
    {
    Object.keys(this.state.users).map(key =>{
    this.state.authUser.email===this.state.users[key].email?
      this.state.authUser.role=this.state.users[key].role
      :null
      authUser = this.state.authUser
    })
    }
  }

    return (
      <div>
        {<EditModuleForm module={module}/>}
        </div>
    )
  }
};



  class EditModuleForm extends Component {
    constructor(props){
      super(props);
    }
    saveUser(){
      this.isInvalid = !this.isInvalid;
        const {
          key,
          username,
          email,
          role,
        } = this.state;
        const{
          history,
        } = this.props;
          db.doUpdateUserRole(key,role)
            .then(() => {
            })
            .catch(error => {
              this.setState(byPropKey('error', error));
            });
          };


    editClicked() {
      this.isInvalid = !this.isInvalid;
    }
    render() {
      const{ textContent,
      title,
      videoLink,
    } = module;
    {Object.keys(module).map(key =>

      <EditModuleForm module={module[key]} ukey={key} />


    )}
      return(
    <tr>
    <td className="mdl-data-table__cell--numeric">
    <input
      className="mdl-textfield__input halfWidth"
      disabled={true}
      value={"test"}
      type="text"
      placeholder="moduleNumber"
    /></td>
    <td className="mdl-data-table__cell--non-numeric">
    <input
      className="mdl-textfield__input minWidth"
      disabled={true}
      value={title}
      onChange={event => this.setState(byPropKey('email', event.target.value))
        }

      type="text"
      placeholder="Email Address"
    /> </td>
    <td className="mdl-data-table__cell--non-numeric">
    <input
      className="mdl-textfield__input minWidth"
      disabled={true}
      value={videoLink}
      onChange={event => this.setState(byPropKey('email', event.target.value))
        }

      type="text"
      placeholder="YouTube Reference"
    /> </td>
    <td className="mdl-data-table__cell--non-numeric">
    <input
      className="mdl-textfield__input minWidth"
      disabled={true}
      value={"Link to homework"}
      onChange={event => this.setState(byPropKey('email', event.target.value))
        }

      type="text"
      placeholder="YouTube Reference"
    /> </td>
    <td>
    <button className="mdl-button mdl-js-button mdl-button--raised edit"
    onClick={
      () => this.editClicked()
    }

    disabled={false} type="button" >
    Edit
    </button>
    </td>
    </tr>)
  }
  }



  const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(EditModulePage);
