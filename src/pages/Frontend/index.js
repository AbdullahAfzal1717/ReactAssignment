import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Add from "./Add";
import Edit from "./Edit";
export default function Frontend() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Add" element={<Add />} />
        <Route path="/Edit/:id" element={<Edit />} />
        <Route path="*" element={<h1> Page Not Found </h1>} />
      </Routes>
      <Footer />
    </>
  );
}
