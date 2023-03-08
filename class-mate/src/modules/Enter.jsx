import React from "react";
import { NavLink } from "react-router-dom";
export var crn = []; // Array to store the CRNs
function Enter() {
  // Enter classes component
  var count = 1;
  // add another input blank
  return (
    // Return the enter CRNs component
    <div class="container text-center mt-5">
      <h1>Enter your Class Registration Numbers (CRNs):</h1>
      <br></br>
      <p>
        Please add the number of CRNs you wish to enter before entering the CRNs
      </p>
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
          class="btn btn-primary"
          onClick={() => {
            count++;
            document.getElementById("crn").innerHTML +=
              "<input type='number' placeholder='CRN #" +
              count +
              "' id='crn" +
              count +
              "'}}/><br></br>";
          }}
        >
          Add more CRNs
        </button>{" "}
        <br></br> <br></br>
        <NavLink
          className="connect"
          to="/confirm"
          onClick={(el) => {
            if (crn.length == 0) {
              el.preventDefault();
              alert("Please enter at least one CRN");
            }
          }}
        >
          <button
            type="button"
            class="btn btn-primary"
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
