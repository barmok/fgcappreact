import React from 'react';

import {auth} from '../../firebase';

const SignOutButton = () =>
<button
  type="button"
  className="mdl-button mdl-js-button mdl-button--raised signout"
  onClick={auth.doSignOut}
>
Sign out
</button>
const SignOutPage = () =>
  <div>
    <h1>Sign Out Page</h1>
  </div>

export default SignOutButton;
