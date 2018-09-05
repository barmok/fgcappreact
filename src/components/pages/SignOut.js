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

export default SignOutButton;
