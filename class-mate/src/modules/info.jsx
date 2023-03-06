import React from "react";
import print from "../assets/images/print.jpg";
function Info() {
  // Info component

  return (
    // Return the info component
    <div class="container text-center mt-5">
      <button class="btn btn-primary" onClick={() => window.print()}>
        <img src={print} width="30px" height="30px" alt="print" /> Print
      </button>
    </div>
  );
}
export default Info;
