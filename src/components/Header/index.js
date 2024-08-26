import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
  const { logout } = useContext(AuthContext);
  const handlesubmit = (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
        <div className="container">
          <Link to="/dashboard/menu" className="navbar-brand">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Manage Menu Items
                </Link>
              </li>
              {/* <li className="nav-item"><Link to="/" className="nav-link">Order Summary</Link></li> */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Auth
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/auth/login" className="dropdown-item">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth/register" className="dropdown-item">
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth/forgotpassword" className="dropdown-item">
                      Forgot Password
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth/changepassword" className="dropdown-item">
                      Change Password
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            {/* <from onSubmit= {handlesubmit}> */}
            <button className="rounded-1 btn btn-danger" onClick={handlesubmit}>
              Logout
            </button>
            {/* </from>            */}
          </div>
        </div>
      </nav>
    </header>
  );
}
