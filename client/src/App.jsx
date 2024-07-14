import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUpIn from "./components/SignInUp/SignUpIn";
import Home from "./pages/HomePage";
import { AuthProvider } from "./hooks/AuthContext";
import Class from "./pages/ClassPage";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignUpIn />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/home/:subject" element={<Class />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
