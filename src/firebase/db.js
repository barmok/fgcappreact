import { db } from './firebase';

//User API

export const doCreateUser = (id, username, email, role) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    role,
  });

  export const onceGetUsers = () =>
  db.ref('users').once('value');

  //Other Entity APIs ...
