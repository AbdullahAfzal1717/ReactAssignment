import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { auth, firestore } from "../../../config/firebase";
// import { AuthContext } from "../../../context/AuthContext";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";
import { message } from "antd";

export default function Register() {
  const [state, setState] = useState({ fullName: "", email: "", password: "" });
  const { dispatch, setIsAppLoading } = useContext(AuthContext);

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  let { fullName, email, password } = state;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("project ID", process.env.REACT_APP_PROJECT_ID);
    fullName = fullName.trim();

    if (fullName.length < 3) {
      return message.error("Please enter your full name", 3);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return message.error("Please enter a valid email address", 3);
    }
    if (password.length < 6) {
      return message.error("Password must be at least 6 characters long", 3);
    }

    setIsAppLoading(true);
    if (fullName.length > 2 && email !== "" && password.length > 5) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setProfile(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          console.log(errorCode);
        });
    }
    const setProfile = async (user) => {
      let userData = {
        fullName: fullName,
        uid: user.uid,
        dateCreated: serverTimestamp(),
      };
      try {
        await setDoc(doc(firestore, "users", user.uid), userData);
        dispatch({ type: "LOGIN", payload: { user: userData } });
      } catch (error) {
        console.log("Error adding document: ", error);
      } finally {
        setIsAppLoading(false);
      }
    };
  };
  // let { fullName, email, password } = state;
  // if (fullName.length > 2 && email !== "" && password.length > 7) {
  //   const newuser = {
  //     fullName,
  //     email,
  //     password,
  //   };
  //   const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  //   existingUsers.push(newuser);

  //   localStorage.setItem("users", JSON.stringify(existingUsers));

  //   const formData = { fullName, email, password };
  //   console.log("formData", formData);

  //   navigate("/auth/login");
  // } else {
  //   setMessage("Information is not correct");
  // }
  return (
    <main className="auth py-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <div
              className="card border-none mx-auto p-3 p-md-4"
              style={{ maxWidth: 400 }}
            >
              <h2 className="text-primary text-center mb-4">Register</h2>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter full name"
                      name="fullName"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100">Register</button>
                    {/* <p>{message}</p> */}
                    <p className="mb-0 mt-2">
                      Already have an account?{" "}
                      <Link to="/auth/login">Login Now</Link>
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
