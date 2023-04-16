import React from "react";
import { useEffect, useState } from "react";
import print from "../assets/images/print.jpg";
import { NavLink } from "react-router-dom";

// This component is rendered to display the groups the user is a part of
function Display() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4567/email")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  var counter = 0;
  data ? (counter = data.result.length) : (counter = 0);
  var index = 0;
  if (data && data.error) {
    console.log("Error: ", data.error);
    return (
      <div className="container text-center mt-5">
        <h2>You are not registered with us yet</h2>
        <br />
        <div>
          <NavLink className="navbar-brand" to="/">
            Want to join new groups?
          </NavLink>
        </div>
        <br />
      </div>
    );
  }

  return (
    <div className="container text-center mt-5">
      {data && data.result ? (
        data.result && data.result.length !== 0 ? (
          <h2>You are in {counter} class groups:</h2>
        ) : (
          <h2>You are not in any class groups</h2>
        )
      ) : (
        <h2>Loading...</h2>
      )}
      <br></br>
      <br />
      <p>
        {data
          ? data.result.map((item) => {
              index++;
              return (
                <div>
                  <p>
                    {" "}
                    {index}. {item[0]}: {item[1]} ({data.crns[index - 1]}){" "}
                  </p>
                </div>
              );
            })
          : null}{" "}
      </p>
      <button className="btn btn-primary" onClick={() => window.print()}>
        <img src={print} width="30px" height="30px" alt="print" /> Print
      </button>
      <br />
      <br />
    </div>
  );
}
export default Display;
