import React from "react";
import { useEffect, useState } from 'react';
function Creator() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4567/email')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);
  
  // set an index to list all classes from data.result
  var index = 0;
  
  return (
    <div class="container text-center mt-5">
      <h2>Confirm if you wish to leave these groups</h2> <br />
        {data ? <p>Deselct the groups you do not wish to leave</p> : <h5>Loading...</h5>}
        <br></br>
        <p>{data ? data.result.map((item) => {
          index++;
          return (
            <div>
              <p> {index}. {item[0]}: {item[1]} </p>
            </div>
          )
        }) : null} </p>
      <br />
      <br />
    </div>
  );
}
export default Creator;
