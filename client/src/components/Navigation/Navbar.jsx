import React from 'react';
import BasicModal from '../common/BasicModal.jsx';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="flex flex-row justify-between items-center bg-gradient-to-r from-green-400 to-blue-500 p-4">
        <div className="justify-start">
          <img src="/logo.png" alt="Logo" className="h-10" />
        </div>
        <div className="flex justify-end items-center space-x-6">
          <BasicModal />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;