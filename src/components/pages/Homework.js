import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

import AuthUserContext from '../AuthUserContext';
import TextInput from '../textArea';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from '../withAuthorization';
import YouTube from 'react-youtube';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});
const INITIAL_STATE = {
  DayTime1: '',
  Situation: '',
  Tought: '',
  Feeling: '',
  users:null,
  error: null,
};
class HomeWork1Form extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }


  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;




    const{
      history,
    } = this.props;


      this.setState(()=>({ ...INITIAL_STATE}));



    event.preventDefault();
  }

  render(){
    const {
      DayTime1,Situation, Thought, Feelings,error,
    } = this.state;


    return(
      <form onSubmit={this.onSubmit}>
    <thead>
      <tr>
        <th class="mdl-data-table__cell--non-numeric fullwidth">Day/Time</th>
        <th class="mdl-data-table__cell--non-numeric fullwidth">Situation</th>
        <th class="mdl-data-table__cell--non-numeric fullwidth">Thought</th>
        <th class="mdl-data-table__cell--non-numeric fullwidth">Feelings and Intensity (%)</th>

      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="mdl-data-table__cell--non-numeric ">Example: <br/>Monday/6pm</td>
        <td class="mdl-data-table__cell--non-numeric ">Went to yoga
        class with a friend</td>
        <td class="mdl-data-table__cell--non-numeric ">I should have covered up. People can see my labia in these yoga pants.</td>
        <td class="mdl-data-table__cell--non-numeric ">Embarrassed (90%) Upset (70%)</td>

      </tr>
      <tr>
      <td class="mdl-data-table__cell--non-numeric"><input className="minWidth"
        value={DayTime1}
        onChange={event => this.setState(byPropKey('DayTime1', event.target.value))}
        type="text"
        placeholder=""
      /></td>
      <td class="mdl-data-table__cell--non-numeric "><input className="minWidth"
        value={Situation}
        onChange={event => this.setState(byPropKey('Situation', event.target.value))}
        type="text"
        placeholder=""
      /></td>
      <td class="mdl-data-table__cell--non-numeric "> <input className="minWidth"
        value={Thought}
        onChange={event => this.setState(byPropKey('Thought', event.target.value))}
        type="text"
        placeholder=""
      /></td>
      <td class="mdl-data-table__cell--non-numeric "><input className="minWidth"
        value={Feelings}
        onChange={event => this.setState(byPropKey('Feelings', event.target.value))}
        type="text"
        placeholder=""
      /></td>
      </tr>
      <tr>
      <td class="mdl-data-table__cell--non-numeric "></td>
      <td class="mdl-data-table__cell--non-numeric "></td>
      <td class="mdl-data-table__cell--non-numeric "></td>
      <td class="mdl-data-table__cell--non-numeric "></td>
      </tr>
    </tbody>
    </form>
    );
}
}

const HomeworkPage = () =>

<AuthUserContext.Consumer>
  {authUser =>
    <div>
    <div class="mdl-card__supporting-text mdl-color-text--grey-600">

        <h2>Module 1: Homework Exercise</h2>
        <br/>

        <p>In preparation for the next module, please have a go at this thought diary. It asks you to
      record some of the thoughts you are having around your genitals before the next module and
      there’s an example to guide you. We’ll pick up on these thoughts more next time.</p>

        <h3>Thought Diary</h3>
        <div className="overflow">
        <table class=" fullwidth mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <div id="homework1form">
        <HomeWork1Form />
        </div>
        </table>
        </div>
        <br/>
        <Link to={routes.SUBMIT}><button className="mdl-button mdl-js-button mdl-button--raised" id="submitHomework" name="homework">Submit</button></Link>
        <br/><br/>
        <Link to={routes.NEXTMODULE}><button className="mdl-button mdl-js-button mdl-button--raised" id="backToModule" name="backToModuleBt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Back To Module &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</button></Link>
        <br/>
         <br/>


      <br/><br/>
      <Link to={routes.HOME}><button className="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-in" name="backToHome">Back To Home</button></Link>


        <br/><br/>
    </div>
    </div>
  }
  </AuthUserContext.Consumer>

  const authCondition = (authUser) => !!authUser;



export default withAuthorization(authCondition)(HomeworkPage);
