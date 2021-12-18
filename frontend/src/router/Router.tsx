import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BoxPage } from "../components/BoxPage";
import { Home } from "../components/Home";
import { Timer } from "../components/Timer";

export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/box" element={<BoxPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
