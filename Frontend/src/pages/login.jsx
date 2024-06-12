import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Correct import for navigation

import "./login.css";

const User = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });
  const { username, password } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    try {
      const data = await res.json();
      window.alert(data.message);
      console.log(data.message);
      navigate("/");
      window.location.reload();
    } catch (err) {
      window.alert(err);
      console.log(err);
    }
  };

  const gotosignup=()=>{
    navigate("/signup");
  }
  return (
    <>
      {/* <PNavbar /> */}
        <div className="login_main">
      <div className="wrapper">
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <input
              name="username"
              value={username}
              onChange={handleChange}
              type="text"
              placeholder="Username"
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              name="password"
              value={password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
            <a href="#">Forgot Password</a>
          </div>
          <button type="submit" onClick={handleSubmit} className="btn">
            Login
          </button>
          <div className="register-link">
            <p>
              Dont have an account? <a href="#" onClick={gotosignup}>Register</a>
            </p>
          </div>
        </form>
      </div>
      </div>
    </>
  );
};

export default User;
