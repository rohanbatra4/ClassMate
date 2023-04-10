import React from "react";
import { NavLink } from "react-router-dom";

function Order() {
  // Order component

  return (
    // Return the order component
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
export default Order;
