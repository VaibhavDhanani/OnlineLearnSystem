import React, { useState, useRef } from "react";
import "./SignUpIn.css";
import { URL } from "../../constant.js";
import axios from 'axios';

const SignUpIn = () => {
  const [isPanelActive, setIsPanelActive] = useState(false);

  const handleSignUp = () => {
    setIsPanelActive(true);
  };

  const handleSignIn = () => {
    setIsPanelActive(false);
  };

  const signUp = async (event) => {
    event.preventDefault();
    const user = {
      username: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      gender: event.target.gender.value,
      type: event.target.role.value,
    };
    console.log(user, URL);
    try {
      const response =await fetch(`${URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      alert("User added Successfully");
    } catch (error) {
      console.error("Error:", error);
    //   alert(user)
      alert("Failed to add user. Please try again." + error.message);
    }
  };

  // console.log(`${URL}/user`)

  const signIn = async (event) => {
    event.preventDefault();
    const user = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    console.log(user);
    try {
      const response = await axios.post(`${URL}/user/validate`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(response.data);
      alert('Logged in Successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to login. Please try again. ' + (error.response ? error.response.status : error.message));
    }
  };

  return (
    <div
      className={`container ${isPanelActive ? "right-panel-active" : ""}`}
    >
      <div className="form-container sign-up-container">
        <form onSubmit={signUp}>
          <h1>Create Account</h1>
          <span>or use your email for registration</span>
          <input type="text" name="name" placeholder="Name" />
          <select id="gender" name="gender">
            <option value="male" selected>
              Male
            </option>
            <option value="female">Female</option>
          </select>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <select id="role" name="role">
            <option value="student" selected>
              Student
            </option>
            <option value="teacher">Teacher</option>
          </select>
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={signIn}>
          <h1>Sign in</h1>
          <span>or use your account</span>
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button type="submit" >Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button className="ghost" onClick={handleSignIn}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpIn;
