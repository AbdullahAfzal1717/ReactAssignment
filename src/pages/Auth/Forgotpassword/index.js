import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../../context/AuthContext";

export default function Forgotpassword() {
  const [email, setEmail] = useState("");
  // const { setIsAuthenticated } = useContext(AuthContext);
  // const [message, setMessage] = useState("");
  const navigate = useNavigate("");
  // const handleChange = (e) =>
  //   setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleResetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        navigate("/auth/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage, errorCode, errorMessage);
        // ..
      });
  };

  return (
    <main className="auth py-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <div
              className="card border-none mx-auto p-3 p-md-4"
              style={{ maxWidth: 400 }}
            >
              <h2 className="text-primary text-center mb-4">Reset Password</h2>

              <form onSubmit={handleResetPassword}>
                <div className="row">
                  <div className="col-12 mb-4">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {/* <div className="col-12 mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter new password"
                      name="newPassword"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm password"
                      name="confirmPassword"
                      onChange={handleChange}
                    />
                  </div> */}
                  <div className="col-12">
                    <button className="btn btn-primary w-100">
                      Reset Password
                    </button>
                    {/* {message && <p>{message}</p>} */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
