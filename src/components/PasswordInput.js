import React from "react";

class PasswordInput extends React.Component {
  render() {
    return (
      <input
        className="mdl-textfield__input"
        style={{
          display: "inline",
          width: "auto"
        }}
        type="password"
        id="password"
        name="password"
        placeholder="Password"
      />
    );
  }
}

export default PasswordInput;
