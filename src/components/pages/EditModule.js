import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
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



class EditModulePage extends Component {
  constructor(props){
        super(props);
        if(this.props.state.location)
        {
          this.state = this.props.state.location.state;
        }
        else {
          this.state = {
            ...INITIAL_STATE

          }
        }
        this.saveModule = this.saveModule.bind(this);
        console.log(this.state);
      }

      saveModule(){
        this.isInvalid = !this.isInvalid;
          const {
            id,
            textContent,
            title,
            videoLink,
            homework,
          } = this.state;
            db.doUpdateModule(id,textContent,title,videoLink,homework)
              .then(() => {
              })
              .catch(error => {
                this.setState(byPropKey('error', error));
              });

            }
            ;


componentDidMount()
{


}

render() {
  var editDisabled = true;
  const{ textContent,
  title,
  videoLink,
  homework,
} = this.state;
  if(this.state)
  {

  editDisabled=false;
}
else
{
  this.state = {
    ...INITIAL_STATE

  }
}
  return(
<div key={this.state.id}>
Module n°
<div className="mdl-data-table__cell--numeric">
<input
  className="mdl-textfield__input halfWidth"
  disabled={true}
  value={this.state.id}
  type="text"
  placeholder="moduleNumber"
/>
</div>
<br/>
<div className="mdl-data-table__cell--numeric">
Module title
<input
  className="mdl-textfield__input minWidth"
  disabled={editDisabled}
  value={title}
  onChange={event => this.setState(byPropKey('title', event.target.value))
    }

  type="text"
  placeholder="title"
/> </div>
<br/>
Module Content
<textarea className="mdl-textfield__input moduleTextarea"
onChange={event => this.setState(byPropKey('textContent', event.target.value))
  }>
  {textContent}
</textarea>
<br/>
<div className="mdl-data-table__cell--non-numeric">
YouTube Reference
<input
  className="mdl-textfield__input minWidth"
  disabled={editDisabled}
  value={this.state.videoLink}
  onChange={event => this.setState(byPropKey('videoLink', event.target.value))
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
  disabled={editDisabled}
  value={homework.title}
  onChange={event => this.setState({homework:{title:  event.target.value}})
    }

  type="text"
  placeholder="homework title"
/>
<br/>
Homework Content
<textarea className="mdl-textfield__input moduleTextarea"
disabled={editDisabled}
onChange={event => this.setState({homework:{textContent:  event.target.value}})
  }>
  {homework.textContent}
</textarea>
<br/>
Homework Additional Content
<textarea className="mdl-textfield__input moduleTextarea"
disabled={editDisabled}
onChange={event => this.setState({homework:{additionalContent:  event.target.value}})
  }>
  {homework.additionalContent}
</textarea>
<br/>
</div>
</div>
<br/><br/>
<div>


<button className="mdl-button mdl-js-button mdl-button--raised edit"
onClick={()=>this.saveModule()}
disabled={editDisabled} type="button" >
Save
</button>
<br/><br/>
<Link to={routes.MANAGEMODULES}>
<button className="mdl-button mdl-js-button mdl-button--raised edit"

disabled={false} type="button" >
Back
</button>
<br/><br/>
</Link>

</div>
</div>)
}
};





  //const authCondition = (authUser) => !!authUser;
export default EditModulePage;
//export default withAuthorization(authCondition)(EditModulePage);
