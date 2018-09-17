import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import EditModule from './EditModule.js';
import withAuthorization from '../withAuthorization.js';
import withAuthentication from '../withAuthentication.js';
import { db} from '../../firebase';
import  {Route} from 'react-router-dom'
import EditModulePage from './EditModule'



const INITIAL_STATE ={
  username: '',
  email: '',
  role:'',
  error: null,
  modules: null,
};
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});



class ManageModulesPage extends Component {
  _isMounted =false
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }


  componentDidMount() {
    this._isMounted =true


  }
  componentWillUnmount(){
    this._isMounted =false
  }

  render() {


    db.onceGetModules().then(snapshot =>
      this._isMounted?
      this.setState(() => ({ modules: snapshot.val() }))
      :null
    );

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

  <div className="mdl-center">
    <h2>List of Modules</h2>
    <p> (Saved in Firebase Database)</p>
    <div className="overflow">
    <table className="fullwidth mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">

      <thead>
      <tr>
      <th className="mdl-data-table__cell--non-numeric halfWidth">Number</th>
      <th className="mdl-data-table__cell--non-numeric fullwidth">Name</th>
      <th className="mdl-data-table__cell--non-numeric fullwidth">YouTube Reference</th>
      <th className="mdl-data-table__cell--non-numeric fullwidth">Homework</th>
      <th className="mdl-data-table__cell--non-numeric halfWidth"></th>
    </tr>
    </thead>
    <tbody>
    {Object.keys(modules).map(key =>

      <EditModuleForm module={modules[key]} ukey={key} />


    )}


    </tbody>
    </table>
    <Link to={{pathname: routes.ADDMODULE,
    state: this.state}}>
    <button className="mdl-button mdl-js-button mdl-button--raised edit"
    disabled={false} type="button" >
    Add
    </button>
    </Link>
    <Link to={routes.ADMIN}>
    <button className="mdl-button mdl-js-button mdl-button--raised edit"

    disabled={false} type="button" >
    Back
    </button>
    </Link>
    </div>
    </div>)
}
}

  class EditModuleForm extends Component {
    constructor(props){
      super(props);
    this.state = this.props.module;
    this.state.id=this.props.ukey;
    this.editClicked = this.editClicked.bind(this);
    }


      editClicked()
      {


      }


    render() {
      const{ textContent,
      title,
      videoLink,
    } = this.state;
      return(
    <tr key={this.state.id}>
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

  <Link to={{pathname: routes.EDITMODULE,
  state: this.state}}>
    <button className="mdl-button mdl-js-button mdl-button--raised edit"
    disabled={false} type="button" >
    Edit
    </button>
    </Link>
    </td>
    </tr>)
  }
  }



  const authCondition = (authUser) => !!authUser && authUser.role === 'admin';

  export default withAuthorization(authCondition)(ManageModulesPage);
