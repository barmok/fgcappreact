import { db } from './firebase';

//User API

export const doCreateUser = (id, username, email, role) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    role,
  });

  export const doUpdateUserRole = (id, role) =>
  db.ref(`users/${id}`).update({
    role
  });

  export const onceGetUsers = () =>
  db.ref('users').once('value');

  export const onceGetModules = () =>
  db.ref('modules').once('value');

  //Other Entity APIs ...
