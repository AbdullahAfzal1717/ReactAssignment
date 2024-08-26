import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';

export default function Changepassword() {
  // const [email, setEmail] = useState("");
  // const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  // const navigate=useNavigate('')

  const handleChangePassword = (e) => {
    e.preventDefault();
    // const users = JSON.parse(localStorage.getItem("users")) || [];
    // const user = JSON.parse(localStorage.getItem("user")) || [];
    // const Email = users.find(user => user.email===email)
    // if (user.email !== email) {
    //   setMessage("Email is incorrect");
    //   return;
    // }
    // if (user.password !== oldPassword) {
    //   setMessage("Old password is incorrect");
    //   return;
    // }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match");
      return;
    }
    // const updatedUser = { ...user, password: newPassword };
    // const updatedUsers = users.map((user) =>
    //   user.email === email ? { ...user, password: newPassword } : user
    // );

    // localStorage.setItem("user", JSON.stringify(updatedUser));
    // localStorage.setItem("users", JSON.stringify(updatedUsers));

    // setMessage("Password changed successfully");
    // setOldPassword("");
    // setNewPassword("");
    // setConfirmPassword("");
  };
  return (
    <main className="auth py-5">
      <div className="container">
        <div className="col">
          <div className="col">
            <div
              className="card border-none mx-auto p-3 p-md-4"
              style={{ maxWidth: 400 }}
            >
              <h2 className="text-primary text-center mb-4">Change Password</h2>
              <form onSubmit={handleChangePassword}>
                <div>
                  <div className="col-12 mb-4">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      name="email"
                      // onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Old Password"
                      name="oldPassword"
                      // onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter new password"
                      name="newPassword"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm password"
                      name="confirmPassword"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100">
                      Change Password
                    </button>
                    {message && <p>{message}</p>}
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
