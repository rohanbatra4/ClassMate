import React from "react";
import { NavLink } from "react-router-dom";
function Creator() {
  return (
    <div className="container text-center mt-5">
      <h2>Sad to see you leave :&#40;</h2>
      <p>You have left the selected groups</p>
      <p>
        You can check out the groups you are a part of in the <b>Your groups</b>{" "}
        section
      </p>
      <div>
        <NavLink className="navbar-brand" to="/">
          Want to join new groups?
        </NavLink>
      </div>
    </div>
  );
}

export default Creator;
