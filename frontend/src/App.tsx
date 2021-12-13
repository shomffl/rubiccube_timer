import React, { useState } from "react";
import "./App.css";
import { Router } from "./router/Router";
import { UserNameContext } from "./provider/UserNameContext";


export const App = () => {
  const [userName, setUserName] = useState("");
  return (
    <>
      <UserNameContext.Provider value={{ userName, setUserName }}>
        <Router />
      </UserNameContext.Provider>
    </>
  );
};
