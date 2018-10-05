import { auth } from './firebase';

//Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
auth.createUserWithEmailAndPassword(email, password);

//Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
auth.signInWithEmailAndPassword(email, password);

//Sign In with phoneNumber
export const doSignInWithPhoneNumber = (phoneNumber, appVerifier) =>
auth.signInWithPhoneNumber(phoneNumber, appVerifier).then(function (confirmationResult)
{

  window.confirmationResult = confirmationResult;
})



//Sign Out
export const doSignOut = () => auth.signOut();


//Password Reset
export const doPasswordReset = (email) =>
auth.sendPasswordResetEmail(email);

//Password Change
export const doPasswordUpdate = (password) =>
auth.currentUser.updatePassword(password);
