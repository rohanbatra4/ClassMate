import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Creator() {
  const [data, setData] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4567/email")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleCheckboxChange = (event, index) => {
    const crnNumber = data.crns[index];
    if (event.target.checked) {
      setSelectedGroups([...selectedGroups, crnNumber]);
    } else {
      setSelectedGroups(selectedGroups.filter((crn) => crn !== crnNumber));
    }
  };

  const handleLeaveClick = () => {
    console.log("Selected CRNs:", selectedGroups);
    console.log("Sending request with body:", { groups: selectedGroups });
    axios.post('http://localhost:4567/leave', { groups: selectedGroups }, {
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
      <h2>Confirm if you wish to leave these groups</h2>
      <br />
      {data ? <p>Select the groups you wish to leave</p> : <p>Loading...</p>}
      <br></br>
      <form>
        {data &&
          data.result.map((item, index) => (
            <div key={item[0]} className="form-group">
              <input
                className="form-check-input"
                type="checkbox"
                value={item[0]}
                id={`checkbox-${item[0]}`}
                onChange={(event) => handleCheckboxChange(event, index)}
              />
              <label
                className="form-check-label"
                htmlFor={`checkbox-${item[0]}`}
              >
                {item[0]}: {item[1]}
              </label>
            </div>
          ))}
      </form>
      <br />
      <NavLink to="/leave">
      <button
        className="btn btn-primary"
        type="button"
        onClick={handleLeaveClick}
        disabled={selectedGroups.length === 0}
      >
        Leave
      </button>
      </NavLink>
      <br />
      <br />
    </div>
  );
}

export default Creator;
