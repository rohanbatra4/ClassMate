import React from "react";
import print from "../assets/images/print.jpg";
function Info() {
  // Info component

  return (
    // Didnt add checklist here yet as the 'crn' array cannot be used here.
    // that has to be uploaded on Firebase and then those are the user's final classes which can then be pulled to put here.
    // Return the info component
    <div class="container text-center mt-5">
      <button class="btn btn-primary" onClick={() => window.print()}>
        <img src={print} width="30px" height="30px" alt="print" /> Print
      </button>
    </div>
  );
}
export default Info;
