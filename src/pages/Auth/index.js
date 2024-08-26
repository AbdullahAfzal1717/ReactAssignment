import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Forgotpassword from "./Forgotpassword";
import Changepassword from "./Changepassword";
// import Footer from '../../components/Footer'

export default function Auth() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotpassword" element={<Forgotpassword />} />
        <Route path="changepassword" element={<Changepassword />} />
        <Route path="*" element={<h1> Page Not Found </h1>} />
        {/* <Register/>
        <Footer/> */}
      </Routes>
    </>
  );
}
