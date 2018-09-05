import React, {Component} from 'react';
import AuthUserContext from '../AuthUserContext';
import withAuthorization from '../withAuthorization';
import { db} from '../../firebase';


const INITIAL_STATE ={
  textContent: '',
  title: '',
  videoLink:'',
  homework:null,
  error: null,
};
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

var module


class EditModulePage extends Component {
  constructor(props){
        super(props);
        this.state = {
          ...INITIAL_STATE
        }
      }




  render() {

    <AuthUserContext.Consumer>
    {
      authUser => authUser ?
      this.state.authUser = authUser
        :null,

      clickedModule => clickedModule?
      module=clickedModule
      :null
      }
    </AuthUserContext.Consumer>
    const modul = module;
    return (
      <div>
        <EditModuleForm module={modul}/>
      </div>

    )
  }
};



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


            <button className="mdl-button mdl-js-button mdl-button--raised edit"

            disabled={false} type="button" >
            Edit
            </button>

            </td>
            </tr>)
          }
          }






  const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(EditModulePage);
