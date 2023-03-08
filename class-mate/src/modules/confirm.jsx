import React from "react";
// import 'crn' array from Enter.jsx
import { NavLink } from "react-router-dom";
import { crn } from "./Enter.jsx";

function Confirm() {
  var counter = crn.length;
  return (
    <div class="container text-center mt-5">
      <h1>Confirm if you wish to join these groups:</h1>
      <br></br>
      <p>Deselect the groups you do not wish to join</p>
      <form></form>
    </div>
  );
}
export default Confirm;
