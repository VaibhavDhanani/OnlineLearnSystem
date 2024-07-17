import React from "react";
import Navbar from "../Navigation/Navbar.jsx";
import Sidebar from "../Navigation/Sidebar.jsx";
import { Route, Routes } from "react-router-dom";
import Classroom from "../Classroom/Classroom.jsx";
import Class from "../../pages/ClassPage.jsx";

const HomeLayout = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-grow overflow-auto">
          <Routes>
            <Route index element={<Classroom />} />
            <Route path=":subject/*" element={<Class />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;
