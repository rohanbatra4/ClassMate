import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import { crn } from "./Enter.jsx";

function Redirect() {
const [data, setData] = useState(null);
var counter = 0;
  useEffect(() => {
    fetch('http://localhost:4567/receive')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  if (data && !data.exist) {
    return (
      <div className="container text-center mt-5">
        <h2>Invalid CRNs</h2>
        <p>It seems you entered some CRNs, which do not exist</p>
        <p>Please enter all valid CRNs</p>
        <NavLink className="connect" to="/enter">
        <button className="btn btn-primary" type="button">Enter valid CRNs</button>
        </NavLink>
        <br />
        <br />
        </div>

    );
  }

  data ? counter = data.check : counter = 0;
  
  return (  
    <div className="container text-center mt-5">
    {counter === crn.length && data.exist && <h1>Thank you for entering your CRNs</h1>}
    {counter !== crn.length && <h1>Redirecting...</h1>}
    
    {counter === crn.length && data.exist ? (
        <NavLink className="connect" to="/confirm">
        <button className="btn btn-primary" type="button">Confirm</button>
        </NavLink>
    ) : null}
    <br />
    <br />
    </div>
    );
}
export default Redirect;
