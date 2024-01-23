import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Login";
import Home from "../Home";
import Profile from "../Profile";
import Beg from "../Beg";
import Inter from '../Inter';
import Adva from '../Adva';
import Spo from '../Spo';
function UserRouting() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/p" element={<Profile />} />
        <Route path="/beg" element={<Beg />} />
        <Route path="/inter" element={<Inter/>} />
        <Route path="/adva" element={<Adva/>} />
        <Route path="/spo" element={<Spo/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default UserRouting;
