import React from "react";
import print from "../assets/images/print.jpg";
import { NavLink } from "react-router-dom";
export var emailVerifier = "";
function Info() {
  // Info component
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    // Didnt add checklist here yet as the 'crn' array cannot be used here.
    // that has to be uploaded on Firebase and then those are the user's final classes which can then be pulled to put here.
    // Return the info component
    <div class="container text-center mt-5">
      <form onSubmit={handleSubmit}>
              <fieldset>
                <label>
                  <h4>Enter your email id</h4>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example123@gmail.com"
                    onChange={(e) => {
                      emailVerifier = e.target.value;
                    }}
                  />
                </label>
                <br />
              </fieldset>
              </form>
              <br />
              <NavLink
                className="connect"
                to="/display"
                onClick={(e) => {
                  if (
                    emailVerifier === ""
                  ) {
                    e.preventDefault();
                    alert("Please enter your email id");
                  } else if (
                    !emailVerifier
                      .toLowerCase()
                      .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                      )
                  ) {
                    e.preventDefault();
                    alert("Please enter a valid email id");
                  }
                }}
              >
                <button type="submit" className="btn btn-primary" id="submit">
                  Submit
                </button>
              </NavLink>
              <br />  <br />
      <button class="btn btn-primary" onClick={() => window.print()}>
        <img src={print} width="30px" height="30px" alt="print" /> Print
      </button>
      <br />  <br />
    </div>
  );
}
export default Info;
