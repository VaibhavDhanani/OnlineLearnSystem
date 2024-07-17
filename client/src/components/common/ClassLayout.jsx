import React, { useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import Navbar from "./../Navigation/Navbar";
import Lectures from "../Classroom/Lectures";
import { useAuth } from "../../hooks/AuthContext";
import { URL } from "../../constant";

const ClassLayout = () => {
  const subject = useParams().subject;
  // console.log(subject)
  return (
    <Routes>
      <Route index element={<ClassSection />} />
      <Route path="lectures" element={<Lectures subject={subject} />} />
      <Route path="assignments" element={<Navbar />} />
      <Route path="materials" element={<Navbar />} />
    </Routes>
  );
};

const ClassSection = () => {
  const subject = useParams().subject;
  
  return (
    <div className="container relative mx-auto px-4">
      {/* Top Row: Lessons, Assignment, Material */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to={`/home/${subject}/lectures`}>
          <div className="bg-orange-400 p-4 rounded text-center">
            <h2 className="text-xl font-semibold">Lessons</h2>
            {/* Content for Lessons */}
            <p className="mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
          </div>
        </Link>
        <Link to={`/home/${subject}/assignments`}>
          <div className="bg-gray-100 p-4 rounded text-center">
            <h2 className="text-xl font-semibold">Assignment</h2>
            {/* Content for Assignment */}
          </div>
        </Link>
        <Link to={`/home/${subject}/materials`}>
          <div className="bg-gray-100 p-4 rounded text-center">
            <h2 className="text-xl font-semibold">Material</h2>
            {/* Content for Material */}
          </div>
        </Link>
      </div>

      {/* Announcement Section */}
      <div className="bg-blue-100 p-4 rounded text-center mt-8">
        <h2 className="text-xl font-semibold">Announcement</h2>
        {/* Content for Announcement */}
      </div>
    </div>
  );
};

export default ClassLayout;
