import React from "react";

class EmailInput extends React.Component {
  render() {
    return (
      <input
        className="mdl-textfield__input"
        style={{
          display: "inline",
          width: "auto"
        }}
        type="text"
        id="email"
        name="email"
        placeholder="Email"
      />
    );
  }
}

export default EmailInput;
