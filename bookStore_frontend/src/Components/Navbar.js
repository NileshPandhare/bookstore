import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles.css";
import { BsCartFill } from "react-icons/bs";

function CustomerNavbar({ cartCount }) {
  const userId = 1;

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-transparent position-absolute w-100"
      style={{ zIndex: 1000 }}
    >
      <div className="container-fluid px-3">
        <NavLink
          className="navbar-brand text-white d-flex align-items-center"
          to="/"
        >
          <span className="logo-style">MEDIMATE</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link fs-5" to="/about">
                <button
                  className="btn btn-outline-light fw-bold"
                >
                  About
                </button>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link fs-5" to="/login">
                <button className="btn btn-outline-light fw-bold">
                  Login
                </button>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link fs-5" to="/register">
                <button className="btn btn-outline-light fw-bold">
                  Register
                </button>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link fs-5" to={`/viewcart/${userId}`}>
                <button className="btn btn-outline-light fw-bold position-relative">
                  <BsCartFill size={20} />
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                    </span>
                  )}
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default CustomerNavbar;
