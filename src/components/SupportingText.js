import React from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import LoginBt from "./LoginBt";
import RegisterBt from "./RegisterBt";
import EmaiVerifBt from "./EmaiVerifBt";
import ResetPwdBt from "./ResetPwdBt";
import QuickstartDetails from "./QuickstartDetails";

class SupportingText extends React.Component {
  render() {
    return (
      <div className="mdl-card__supporting-text mdl-color-text--grey-600">
        <p>
          Enter an email and password below and and either sign in to an
          existing account or sign up
        </p>
        <EmailInput />
        <br />
        <PasswordInput />
        <br />
        <br />
        <LoginBt />

        <RegisterBt />

        <EmaiVerifBt />

        <ResetPwdBt />
        {}
        <QuickstartDetails />
      </div>
    );
  }
}

export default SupportingText;
