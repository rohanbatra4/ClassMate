import React from "react";
import { NavLink } from "react-router-dom";

// This component is rendered when the user has successfully joined all the groups
function Complete() {
  return (
    <div className="container text-center mt-5">
      <h2>Congratulations!</h2>
      <p>You have been successfully added to all class groups!</p>
      <p>
        You can check out the groups you have been added to in the{" "}
        <b>Your groups</b> section
      </p>
      <div>
        <NavLink className="navbar-brand" to="/">
          Want to join more groups?
        </NavLink>
      </div>
    </div>
  );
}
export default Complete;
