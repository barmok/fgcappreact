import { db } from './firebase';

//User API

const nModuleCompleted = 0;
const homeworkData = {1:""};

export const doCreateUser = (id, phoneNumber,role) =>
  db.ref(`users/${id}`).set({
    phoneNumber,
    role,
  })
  export const doInitUser = (id) =>
  db.ref(`progress/${id}`).set({
    nModuleCompleted,
    homeworkData,
  });


  export const doUpdateUserRole = (id, role) =>
  db.ref(`users/${id}`).update({
    role
  });

  export const doUpdateModule = (id,textContent,title,videoLink,homework) =>
  db.ref(`modules/${id}`).update({
    textContent,
    title,
    videoLink,
    homework,
  });

  export const onceGetUsersProgress = (authUserUID) =>
  db.ref(`progress/${authUserUID}/nModuleCompleted`).once('value');

  export const onceGetModule = (moduleId) =>
  db.ref(`modules/${moduleId}`).once('value');

  export const onceGetUsers = () =>
  db.ref('users').once('value');

  export const onceGetModules = () =>
  db.ref('modules').once('value');

  export const onceIdLastModule = () =>
  db.ref('modules').limitToLast(1).once("child_added");

  export const onGetMessages = (userKey,chaterKey) =>
  db.ref(`conversations/${userKey}/${chaterKey}/messages`).orderByKey().limitToLast(100);

  export const pushMessage = (message,userKey,chaterKey) =>
  db.ref(`conversations/${userKey}/${chaterKey}/messages`).push(message);

  //Other Entity APIs ...
