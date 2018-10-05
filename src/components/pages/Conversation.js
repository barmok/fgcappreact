import React, { Component } from 'react';
import { db, firebase } from '../../firebase';
import AuthUserContext from '../AuthUserContext';
import {Tooltip} from 'react-mdl';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';


class Conversation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
    console.log();
    if(this.props.state)
    {
    if(this.props.state.location.state)
    {
      this.state.patient = this.props.state.location.state;
    }
    console.log(this.state.patient);
  }

    this.onAddMessage = this.onAddMessage.bind(this);
  }



  componentWillMount() {
    var messagesRef=null;
    if(this.state.patient.authUserRole==="admin")
    {
       messagesRef = db.onGetMessages(this.state.patient.key,this.state.patient.authUserKey);
    }
    else
    {
      if(this.state.patient.authUserRole==="participant")
      {
           messagesRef = db.onGetMessages(this.state.patient.authUserKey, this.state.patient.key);
      }
    }

    messagesRef.on('child_added', snapshot => {
      const message = { text: snapshot.val(), id: snapshot.key };

      this.setState(prevState => ({
        messages: [ message, ...prevState.messages ],
      }));
    });

  }

  onAddMessage(event) {
    event.preventDefault();
    var isTherapist=false;
    var localTime = Date.now();
    if(this.state.patient.authUserRole==="admin")
    {
      isTherapist=true;
    }
    var message = {text: this.input.value,isTherapist: isTherapist, date: localTime }
    if(isTherapist)
    {
      db.pushMessage(message,this.state.patient.key,this.state.patient.authUserKey);
    }
    else {
      db.pushMessage(message,this.state.patient.authUserKey,this.state.patient.key);
    }

    this.input.value = '';
  }

  render() {
    console.log(this.state);

    return (
      <form onSubmit={this.onAddMessage}>
        <ul >
          {this.state.messages.slice(0).reverse().map(message =>
            message.text.isTherapist?
            <div><li  className="Therapist" key={message.id}> {message.text.text}  </li><div className="date">Sent {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(message.text.date)}</div></div>
            :<div><li  id={message.id} className="Participant" key={message.id}> {message.text.text} </li><div className="date">Sent {message.text.date}</div></div>
          )}
        </ul>
        <input className="mdl-textfield__input" type="text" ref={node => this.input = node}/>
        <br />
        <input className="mdl-button mdl-js-button mdl-button--raised" type="submit" value="Send"/>
        <br />
        <br />
        <Link to={routes.HOME}><button className="mdl-button mdl-js-button mdl-button--raised" id="mainMenu" name="mainMenuBt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Return To Main Menu &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</button></Link>

        <br />
        <br />

      </form>
    );
  }
}
export default Conversation
