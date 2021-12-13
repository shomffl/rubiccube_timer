import React, { useState } from "react";
import logo from "../logo.svg";
import "../App.css";
import { Register } from "./Register";
import Button from "@mui/material/Button";
import { Login } from "./Login";

export const Home = () => {
  const [changeForm, setChangeForm] = useState(true);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button onClick={(e) => setChangeForm(!changeForm)}>changeForm</Button>
        {changeForm ? <Register /> : <Login />}
      </header>
    </div>
  );
};
