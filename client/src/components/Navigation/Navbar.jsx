import React, { useState } from "react";
import BasicModal from "../common/BasicModal.jsx";
import logo from "../../assets/logo.png";
import { useAuth } from "../../hooks/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    logout();
    window.location.reload();
  };

  const cancelLogout = () => {
    setShowModal(false);
    console.log("Logout cancelled");
  };
  return (
    <nav className="navbar">
      <div className="flex flex-row justify-between items-center bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-lg">
        <div className="justify-start">
          <img src={logo} alt="Logo" className="h-10" />
        </div>
        <div className="flex justify-end items-center space-x-6">
          {user && user.type === "student" && <BasicModal />}
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleLogout}
          >
            Logout
          </button>

          {showModal && (
            <div className="fixed z-50 inset-0 bg-gray-800 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center">
              <div className="bg-white p-5 rounded-lg shadow-xl">
                <p className="mb-4">Are you sure you want to logout?</p>
                <div className="flex justify-end">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2"
                    onClick={cancelLogout}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={confirmLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
