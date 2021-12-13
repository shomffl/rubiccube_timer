import React, { useState } from "react";
import logo from "../logo.svg";
import "../App.css";
import { Register } from "./Register"

export const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Register />
      </header>
    </div>
  );
};
