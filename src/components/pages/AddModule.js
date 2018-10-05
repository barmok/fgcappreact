import React, {Component} from 'react';
import AuthUserContext from '../AuthUserContext';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import withAuthorization from '../withAuthorization';
import {db} from '../../firebase';



const INITIAL_STATE ={
  module:{
  id:'',
  textContent: '',
  title: '',
  videoLink:'',
  homework:{title:'',textContent:'',exercise:''},},
  error: null,
};
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});





class AddModulePage extends Component {
  _isMounted =false
  constructor(props){
    super(props);
    this.state = {
      ...INITIAL_STATE}
    if(this.props.state.location.state)
    {
      this.state.module = this.props.state.location.state;
    }

    this.saveModule = this.saveModule.bind(this);
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
    this.saveModule();
  }
  saveModule(){
    this.isInvalid = !this.isInvalid;
      const {
        id,
        textContent,
        title,
        videoLink,
        homework,
      } = this.state.module;

        db.doUpdateModule(id,textContent,title,videoLink,homework)
          .then(() => {
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
        };

    render() {
      <AuthUserContext.Consumer>
      {
        authUser => authUser ?
        this.setState(() => ({authUser: authUser}))
          :null
        }
      </AuthUserContext.Consumer>
      db.onceGetModules().then(snapshot =>
        this._isMounted?
        this.setState(() => ({module:{ ...this.state.module, id: snapshot.val().length }}))
        :null
      );

      return(
      <form onSubmit={this.onSubmit}>
        Module n°
        <input
          className="mdl-textfield__input  halfWidth"
          disabled={true}
          value={this.state.module.id}
          type="text"
          placeholder="moduleNumber"
        />
        <br/>
        <div className="mdl-data-table__cell--numeric">
        Module title
        <input
          className="mdl-textfield__input minWidth"
          disabled={false}
          value={this.state.module.title}
          onChange={event => this.setState({module: {...this.state.module, title: event.target.value}})
            }

          type="text"
          placeholder="title"
        /> </div>
        <br/>
        Module Content
        <textarea className="mdl-textfield__input moduleTextarea"
        value={this.state.module.textContent}
        onChange={event => this.setState({module: {...this.state.module, textContent: event.target.value}})
      }>

        </textarea>
        <br/>
        <div className="mdl-data-table__cell--non-numeric">
        YouTube Reference
        <input
          className="mdl-textfield__input minWidth"
          disabled={false}
          value={this.state.module.videoLink}
          onChange={event => this.setState({module: {...this.state.module, videoLink: event.target.value}})
            }

          type="text"
          placeholder="YouTube Reference"
        /> </div>
        <br/>
        Homework
        <div className="homework mdl-shadow--2dp">
        <div className="mdl-data-table__cell--non-numeric">
        Homework title
        <input
          className="mdl-textfield__input minWidth"
          disabled={false}
          value={this.state.module.homework.title}
          onChange={event => this.setState({module: {...this.state.module, homework:{...this.state.module.homework, title: event.target.value}}})
            }

          type="text"
          placeholder="homework title"
        />
        <br/>
        Homework Content
        <textarea className="mdl-textfield__input moduleTextarea"
        value={this.state.module.homework.textContent}
        onChange={event => this.setState({module: {...this.state.module, homework:{...this.state.module.homework, textContent:  event.target.value}}})
          }>

        </textarea>
        <br/>
        Homework Additional Content
        <textarea className="mdl-textfield__input moduleTextarea"
        value={this.state.module.homework.exercise}
        onChange={event => this.setState({module: {...this.state.module, homework:{...this.state.module.homework, exercise:  event.target.value}}})
          }>
        </textarea>
        <br/>
        </div>
        </div>
        <br/><br/>
        <Link to={{pathname: routes.MODULEPREVIEW,
        state: this.state}}>
          <button className="mdl-button mdl-js-button mdl-button--raised edit"
          disabled={false} type="button" >
          Module Preview
          </button>
          </Link>
          <Link to={{pathname: routes.HOMEWORKPREVIEW,
          state: this.state}}>
            <button className="mdl-button mdl-js-button mdl-button--raised edit"
            disabled={false} type="button" >
            Homework Preview
            </button>
            </Link>

        <button className="mdl-button mdl-js-button mdl-button--raised edit"

        disabled={false} type="submit" >
        Submit
        </button>
        <br/>
        <br/>
        <Link to={routes.MANAGEMODULES}>
        <button className="mdl-button mdl-js-button mdl-button--raised edit"

        disabled={false} type="button" >
        Cancel
        </button>
        </Link>
        <br/><br/>
        </form>
        )
      }
      }





//const authCondition = (authUser) => !!authUser;
export default AddModulePage;
//export default withAuthorization(authCondition)(AddModulePage);
