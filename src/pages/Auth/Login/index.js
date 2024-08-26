import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { auth } from "../../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { message } from "antd";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAppLoading } = useContext(AuthContext);

  // const { login } = useContext(AuthContext);
  // const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  // const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return message.error("Please enter a valid email address", 3);
    }
    if (password.length < 6) {
      return message.error("Password must be at least 6 characters long", 3);
    }

    setIsAppLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User credential", user);
        // ...
      })

      .catch((error) => {
        setIsAppLoading(false);
        message.error("Invalid credentials", 3);

        // const errorCode = error.code;
        // const errorMessage = error.message;
        // console.error(errorMessage, errorCode, errorMessage);
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
              <h2 className="text-primary text-center mb-4">Login</h2>

              <form onSubmit={handleSubmit}>
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
                  <div className="col-12 mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <p className="mb-0 mt-2">
                      Don't remember your password?{" "}
                      <Link to="/auth/forgotpassword">Forgot Password</Link>
                    </p>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100">Login</button>
                    {/* {message && <p>{message}</p>} */}
                    <p className="mb-0 mt-2">
                      Don't have an account?{" "}
                      <Link to="/auth/register">Register Now</Link>
                    </p>
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
