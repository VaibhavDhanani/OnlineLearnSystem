import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUpIn from "./components/SignInUp/SignUpIn";
import { AuthProvider } from "./hooks/AuthContext";
import Home from "./pages/HomePage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignUpIn />} />
          <Route path="/home/*" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;