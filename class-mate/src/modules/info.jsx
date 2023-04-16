import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
export var emailVerifier = "";

// This component is rendered to get the email of the user to then display the groups they are a part of
function Info() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="container text-center mt-5">
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
          if (emailVerifier === "") {
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
          } else {
            console.log("Sending request with body:", { email: emailVerifier });
            axios
              .post(
                "http://localhost:4567/emailsend",
                { email: emailVerifier },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                console.log("Received response:", response.data);
              });
          }
        }}
      >
        <button type="submit" className="btn btn-primary" id="submit">
          Submit
        </button>
      </NavLink>
      <br /> <br />
    </div>
  );
}
export default Info;
