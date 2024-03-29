import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

export var crn = [];

// This component is rendered for the user to enter their CRNs, which are then sent to the backend for validation
function Enter() {
  var count = 1;
  crn = [];
  return (
    <div className="container text-center mt-5">
      <h1>Enter your Class Registration Numbers (CRNs):</h1>
      <br></br>
      <form>
        <input
          required
          type="number"
          placeholder={"CRN #" + count}
          id={"crn" + count}
        />
        <br></br> <br></br>
        <div id="crn"></div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            count++;
            const inputs = document.querySelectorAll('input[type="number"]');
            const values = [];
            inputs.forEach((input) => values.push(input.value));
            document.getElementById("crn").innerHTML +=
              "<input type='number' placeholder='CRN #" +
              count +
              "' id='crn" +
              count +
              "'}/><br></br>";
            const newInputs = document.querySelectorAll('input[type="number"]');
            newInputs.forEach((input, index) => {
              input.value = values[index] || "";
            });
          }}
        >
          Add more CRNs
        </button>{" "}
        <br></br> <br></br>
        <NavLink
          className="connect"
          to="/redirect"
          onClick={(el) => {
            if (crn.length === 0) {
              el.preventDefault();
              alert("Please enter valid CRNs");
            } else {
              console.log("Sending request with body:", { crns: crn });
              axios
                .post(
                  "http://localhost:4567/verify",
                  { crns: crn },
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
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              for (var i = 1; i <= count; i++) {
                if (
                  document.getElementById("crn" + i).value &&
                  !crn.includes(document.getElementById("crn" + i).value)
                ) {
                  crn.push(document.getElementById("crn" + i).value);
                }
              }
            }}
          >
            Submit
          </button>
        </NavLink>
        <br></br>
        <br />
      </form>
    </div>
  );
}
export default Enter;
