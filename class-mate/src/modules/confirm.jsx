import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { crn as crnInitial } from "./Enter.jsx";

function Confirm() {
  const [crn, setCrn] = useState(crnInitial);
  const navigate = useNavigate();

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
  };

  return (
    <div className="container text-center mt-5">
      <h1>Confirm if you wish to join these groups:</h1>
      <br />
      <p>Deselect the groups you do not wish to join</p>
      <form>
        {crnInitial.map((crnNumber) => (
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
              {crnNumber}:
            </label>
          </div>
        ))}
        <br />
        <NavLink
          className="done"
          to="/order"
          onClick={(el) => {
            if (crn.length === 0) {
              el.preventDefault();
              alert("Please select at least one CRN");
            }
          }}
        >
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleJoinClick}
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
