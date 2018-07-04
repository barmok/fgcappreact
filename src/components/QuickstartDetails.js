import React from "react";
import SignInStatus from "./SignInStatus";

class QuickstartDetails extends React.Component {
  render() {
    return (
      <div className="quickstart-user-details-container">
        Firebase sign-in status: <SignInStatus />
        <div>
          Firebase auth <code>currentUser</code> object value:
        </div>
        <pre>
          <code id="quickstart-account-details">null</code>
        </pre>
      </div>
    );
  }
}

export default QuickstartDetails;
