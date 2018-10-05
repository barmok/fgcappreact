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
    DayTime : '',
    Situation : '',
    Thought : '',
    Feelings : '',
    error : "",
  error: null,
};
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class HomeWork1Form extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  onSubmit = (event) => {
    const {
      userID,
      TableContent,

    } = this.state;

    const{
      history,
    } = this.props;

      this.setState(()=>({ ...INITIAL_STATE}));



    event.preventDefault();
  }

  addLine(e){
    const {TableContent} = this.state;
    const newLine = {DayTime : '', Situation : '', Thought : '', Feelings: ''};
    e.preventDefault();
  }

  render(){
    const {
      DayTime,Situation, Thought, Feelings,error,
    } = this.state;
    var nbLine = 0;
    var test = DayTime[nbLine];
    const isInvalid =
    DayTime[nbLine] === undefined ||
    Situation[nbLine] === undefined ||
    Thought[nbLine] === undefined ||
    Feelings[nbLine] === undefined;

    return(
      <table class=" fullwidth mdl-data-table mdl-js-data-table mdl-shadow--2dp">
      <div id="homework1form">
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

      <ListElement />


      <tr>
      <td class="mdl-data-table__cell--non-numeric "></td>
      <td class="mdl-data-table__cell--non-numeric "></td>
      <td class="mdl-data-table__cell--non-numeric "></td>
      <td class="mdl-data-table__cell--non-numeric ">
      <button className="mdl-button mdl-js-button mdl-button--raised edit"
      onClick={(e) =>{this.addLine(e)}}
      disabled={isInvalid}

       type="button" >
      Add
      </button></td>
      </tr>
    </tbody>
    </form>
    </div>
    </table>


    );
}
}
class ListElement extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  render()
  {

    const {
      DayTime,Situation, Thought, Feelings,error,
    } = this.state;
    var nbLine = 0;
    var test = DayTime[nbLine];

    return(

    <tr>
    <td class="mdl-data-table__cell--non-numeric"><input className="minWidth"
      value={DayTime[nbLine]}
      onChange={event => this.setState(DayTime[nbLine] : event.target.value)}
      type="text"
      placeholder=""
    /></td>
    <td class="mdl-data-table__cell--non-numeric "><input className="minWidth"
      value={Situation[nbLine]}
      onChange={event => this.setState(Situation[nbLine] : event.target.value)}
      type="text"
      placeholder=""
    /></td>
    <td class="mdl-data-table__cell--non-numeric "> <input className="minWidth"
      value={Thought[nbLine]}
      onChange={event => this.setState(Thought[nbLine] : event.target.value)}
      type="text"
      placeholder=""
    /></td>
    <td class="mdl-data-table__cell--non-numeric "><input className="minWidth"
      value={Feelings[nbLine]}
      onChange={event => this.setState(Feelings[nbLine] :event.target.value)}
      type="text"
      placeholder=""
    /></td>
    </tr>
  )
  }
}
export {HomeWork1Form};
