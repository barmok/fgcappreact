import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

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
        console.log(this);
      }


componentDidMount()
{


}
editClicked()
{
  
}

render() {
  var editDisabled = true;
  const{ textContent,
  title,
  videoLink,
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
<div className="mdl-data-table__cell--numeric">
<input
  className="mdl-textfield__input halfWidth"
  disabled={true}
  value={this.state.id}
  type="text"
  placeholder="moduleNumber"
/>
</div>
<div className="mdl-data-table__cell--non-numeric">
<input
  className="mdl-textfield__input minWidth"
  disabled={editDisabled}
  value={title}
  onChange={event => this.setState(byPropKey('title', event.target.value))
    }

  type="text"
  placeholder="title"
/> </div>
<div className="mdl-data-table__cell--non-numeric">
<input
  className="mdl-textfield__input minWidth"
  disabled={editDisabled}
  value={this.state.videoLink}
  onChange={event => this.setState(byPropKey('videoLink', event.target.value))
    }

  type="text"
  placeholder="YouTube Reference"
/> </div>
<div className="mdl-data-table__cell--non-numeric">
<input
  className="mdl-textfield__input minWidth"
  disabled={true}
  value={"Link to homework"}
  onChange={event => this.setState(byPropKey('email', event.target.value))
    }

  type="text"
  placeholder="YouTube Reference"
/> </div>
<div>


<button className="mdl-button mdl-js-button mdl-button--raised edit"
onClick={()=>this.editClicked()}
disabled={editDisabled} type="button" >
Edit
</button>
<Link to={routes.MANAGEMODULES}>
<button className="mdl-button mdl-js-button mdl-button--raised edit"

disabled={false} type="button" >
Back
</button>
</Link>

</div>
</div>)
}
};





  //const authCondition = (authUser) => !!authUser;
export default EditModulePage;
//export default withAuthorization(authCondition)(EditModulePage);
