import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
    return (
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
                                    Your classes
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/creator">
                                    Leave all current groups
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