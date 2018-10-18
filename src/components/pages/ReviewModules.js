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



class ReviewModulesPage extends Component {
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
    if(this.state.authUser)
    {
      db.onceGetUsersProgress(this.state.authUser.uid).then(snapshot =>
        this._isMounted?
        this.setState(() => ({nModuleCompleted:snapshot.val()}))
        :null
      )
    }

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
    <h2>List of Completed Modules</h2>
    <p> </p>
    <div className="overflow">
    <table className="fullwidth mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">

      <thead>
      <tr>
      <th className="mdl-data-table__cell--non-numeric halfWidth">Number</th>
      <th className="mdl-data-table__cell--non-numeric fullwidth">Title</th>
      <th className="mdl-data-table__cell--non-numeric fullwidth">Homework</th>
      <th className="mdl-data-table__cell--non-numeric halfWidth"></th>
    </tr>
    </thead>
    <tbody>
    {Object.keys(modules).map(key =>

      <ReviewModuleForm module={modules[key]} ukey={key} />


    )}


    </tbody>
    </table>
    <br/>
    <Link to={routes.HOME}>
    <button className="mdl-button mdl-js-button mdl-button--raised edit"

    disabled={false} type="button" >
    Back
    </button>

    </Link>
    <br/><br/>
    </div>
    </div>)
}
}

  class ReviewModuleForm extends Component {
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
      placeholder="Title"
    /> </td>

    <td className="mdl-data-table__cell--non-numeric">
    <input
      className="mdl-textfield__input minWidth"
      disabled={true}
      value={"Review homework"}
      onChange={event => this.setState(byPropKey('email', event.target.value))
        }

      type="text"
      placeholder="Link to Homework"
    /> </td>
    <td>

  <Link to={{pathname: routes.REVIEWMODULE,
  state: this.state}}>
    <button className="mdl-button mdl-js-button mdl-button--raised edit"
    disabled={false} type="button" >

    Review    </button>
    </Link>
    </td>
    </tr>)
  }
  }



  const authCondition = (authUser) => !!authUser && authUser.role === 'participant';

  export default withAuthorization(authCondition)(ReviewModulesPage);
