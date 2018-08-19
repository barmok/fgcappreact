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



class ManageModulesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }


  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser =>
      {
        this.state.authUser = authUser})

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
    if(this.state.users && this.state.authUser)
    {
    Object.keys(this.state.users).map(key =>{
    this.state.authUser.email===this.state.users[key].email?
      this.state.authUser.role=this.state.users[key].role
      :null
      authUser = this.state.authUser
    })
    }
    const { modules } = this.state;
    return (
      <div>
        {!!modules && <ModuleList modules={modules}/>}
        </div>
    )
  }
};


class ModuleList extends Component {
  render(){
    var modules = this.props.modules;
    return(
<AuthUserContext.Consumer>
{ authUser =>

  <div className="mdl-center">
    <h2>List of Completed Modules</h2>
    <p> (Saved in Firebase Database)</p>
    <div className="overflow">
    <table className="fullwidth mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">

      <thead>
      <tr>
      <th class="mdl-data-table__cell--non-numeric halfWidth">Number</th>
      <th class="mdl-data-table__cell--non-numeric fullwidth">Name</th>
      <th class="mdl-data-table__cell--non-numeric fullwidth">Homework</th>
      <th class="mdl-data-table__cell--non-numeric halfWidth"></th>
    </tr>
    </thead>
    <tbody>
    {Object.keys(modules).map(key =>

      <EditModuleForm module={modules[key]} ukey={key} />


    )}

    </tbody>
    </table>
    </div>
    </div>
  }
  </AuthUserContext.Consumer>)
}
}

  class EditModuleForm extends Component {
    constructor(props){
      super(props);
    this.state = this.props.module;
    this.state.id=this.props.ukey;
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
    } = this.state;
      return(
    <tr>
    <td className="mdl-data-table__cell--numeric">
    <input
      className="mdl-textfield__input halfWidth"
      disabled={true}
      value={this.state.id}
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

export default withAuthorization(authCondition)(ManageModulesPage);
