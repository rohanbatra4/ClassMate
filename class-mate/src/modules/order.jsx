import React from "react";
import { NavLink } from "react-router-dom";

function Order() {

    return (
        <div class="container text-center mt-5">
            <h2>Congratulations!</h2>
      <p>You have been successfully added to all class groups!</p>
        <p>You can check out the groups you have been added to in the /"Your classes/" section</p>
    <div>
    <NavLink className="navbar-brand" to="/">
                        Want to join more groups?
                    </NavLink>
    </div>
          </div>
    )
}
export default Order;