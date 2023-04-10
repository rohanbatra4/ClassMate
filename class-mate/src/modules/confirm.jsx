import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import { crn as crnInitial} from "./Enter.jsx";
import { email } from "./Home.jsx";
import axios from 'axios';

function Confirm() {
  const [crn, setCrn] = useState(crnInitial);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4567/receive')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);
  

  const handleCheckboxChange = (event) => {
    const crnNumber = event.target.value;
    if (event.target.checked) {
      setCrn([...crn, crnNumber]);
    } else {
      setCrn(crn.filter((crn) => crn !== crnNumber));
    }
  };

  const handleJoinClick = () => {
    alert("Selected CRNs: " + crn.join(", "));
    console.log("Sending request with body:", { emailId: email, crns: crn });
    axios.post('http://localhost:4567/name', { emailId: email, crns: crn }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log("Received response:", response.data);
    })
    .catch(error => {
      console.log("Received error:", error.response.data);
    });
  };

  return (
    <div className="container text-center mt-5">
      <h1>Confirm if you wish to join these groups:</h1>
      <br />

      <p>Deselect the groups you do not wish to join</p>
      <form>
        {crnInitial.map((crnNumber, index) => (
          <div key={crnNumber} className="form-group">
            <input
              className="form-check-input"
              type="checkbox"
              value={crnNumber}
              id={`checkbox-${crnNumber}`}
              onChange={handleCheckboxChange}
              checked={crn.includes(crnNumber)}
            />
            <label
              className="form-check-label"
              htmlFor={`checkbox-${crnNumber}`}
            >
              {crnNumber}: {data ? data.result[index][0] + "- " + data.result[index][1] : 'Loading...'}
            </label>
          </div>
        ))}
        <br />
        <NavLink
          className="done"
          to="/order"
        >
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleJoinClick}
            disabled={crn.length === 0}
          >
            Join
          </button>
        </NavLink>
        <br />
        <br />
      </form>
    </div>
  );
}

export default Confirm;
