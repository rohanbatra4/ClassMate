import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  // Header component
  return (
    // Return the header component
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-secondary">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            ClassMate
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/info">
                  Your groups
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/info2">
                  Leave groups
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
