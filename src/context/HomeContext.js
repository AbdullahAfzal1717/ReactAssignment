import React, { createContext, useState } from "react";

export const HomeContext = createContext();

export default function HomeContextProvider({ children }) {
  const [currentitem, setCurrentitem] = useState("");
  // const addItems = (userdata) => {
  //   const items = JSON.parse(localStorage.getItem("items")) || [];
  //   items.push(userdata);
  //   localStorage.setItem("items", JSON.stringify(items));
  // };

  return (
    <HomeContext.Provider value={{ currentitem, setCurrentitem }}>
      {children}
    </HomeContext.Provider>
  );
}
