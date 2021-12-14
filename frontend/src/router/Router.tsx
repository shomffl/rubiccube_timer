import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../components/Home";
import { Timer } from "../components/Timer";

export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timer" element={<Timer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
