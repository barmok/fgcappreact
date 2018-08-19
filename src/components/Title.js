import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import SignOutButton from './pages/SignOut';
import * as routes from '../constants/routes';

const Title = () =>
    <AuthUserContext.Consumer>
      { authUser =>authUser
          ? <TitleAuth />
          : <TitleNonAuth />
      }
      </AuthUserContext.Consumer>


      const TitleAuth = () =>
      <div>
      <div className='mdl-card__title mdl-color--light-blue-600 mdl-color-text--white '>
      <div className='spacer45' />

          <h2 className="mdl-card__title-text-bold">MyMandorla</h2>
          <div className='spacer33' />
          <SignOutButton />
      </div>
      </div>
      const TitleNonAuth = () =>
      <div className='mdl-card__title mdl-color--light-blue-600 mdl-color-text--white '>
      <div className='spacer45' />
      <h2 className="mdl-card__title-text-bold">MyMandorla</h2>
      </div>

export default Title;
