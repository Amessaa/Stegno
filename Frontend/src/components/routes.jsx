import "bootstrap/dist/css/bootstrap.min.css";
import React ,{useEffect,useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../pages/signup";
import Login from "../pages/login";
import Home from "../pages/home";
import Steganography from "../pages/stagt2p";
import Stag2 from "../pages/stagp2t";
import PNavbar from "./navbar.jsx";



export default function Proutes() {
  
  return (
    <>
    <BrowserRouter>
    {/*  we can insert navbar or other elemnts inside browserrouter */}
    {/* <PNavbar data = {logged_user_data} flag={filag}/> */}
    <PNavbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/stagt" element={<Steganography />}></Route>
        <Route path="/stagp" element={<Stag2 />}></Route>
      </Routes>
    </BrowserRouter>

    </>
  );
}
