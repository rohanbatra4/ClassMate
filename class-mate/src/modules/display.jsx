import React from "react";
import { NavLink } from "react-router-dom";
import { emailVerifier } from "./info";
import { useEffect, useState } from 'react';
import print from "../assets/images/print.jpg";

function Display() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('http://localhost:4567/email')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);
  var counter = 0;
  data ? counter = data.result.length : counter = 0;
  // set an index to list all classes from data.result
  var index = 0;

  return (
    <div class="container text-center mt-5">
        {data ? <h2>You are in {counter} class groups:</h2> : <h2>Loading...</h2>}
        <br></br>
        <br />
        <p>{data ? data.result.map((item) => {
          index++;
          return (
            <div>
              <p> {index}. {item[0]}: {item[1]} </p>
            </div>
          )
        }) : null} </p>
        <button class="btn btn-primary" onClick={() => window.print()}>
        <img src={print} width="30px" height="30px" alt="print" /> Print
      </button>
      <br />
      <br />
    </div>
  );
}
export default Display;
