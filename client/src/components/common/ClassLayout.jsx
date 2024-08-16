import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import MaterialSection from "../Classroom/MaterialSection";
import LectureSection from "../Classroom/Lectures";
import AssignmentSection from "../Classroom/AssignmentSection";
import AnnouncementSection from "../Classroom/AnnouncementSection";
import { useAuth } from "../../hooks/AuthContext";
import Form from "./Form/Form";
import { URL } from "../../constant";

const ClassSection = () => {
  const { user, isLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const subject = useParams().subject;
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/announcement/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, content, subject, user }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      setOpen(false);
      setTitle("");
      setContent("");
      setUpdateTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Error creating announcement:", error.message);
    }
  };

  const fields = [
    {
      id: "title",
      label: "Title",
      type: "text",
      value: title,
      onChange: setTitle,
    },
    {
      id: "content",
      label: "Content",
      type: "textarea",
      value: content,
      onChange: setContent,
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Link
          to={`/home/${subject}/lectures`}
          className="transform transition duration-300 hover:scale-105"
        >
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold text-white">Lessons</h2>
            <p className="mt-2 text-indigo-200">Access course lectures</p>
          </div>
        </Link>
        <Link
          to={`/home/${subject}/assignments`}
          className="transform transition duration-300 hover:scale-105"
        >
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold text-white">Assignments</h2>
            <p className="mt-2 text-purple-200">View and submit assignments</p>
          </div>
        </Link>
        <Link
          to={`/home/${subject}/materials`}
          className="transform transition duration-300 hover:scale-105"
        >
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold text-white">Materials</h2>
            <p className="mt-2 text-blue-200">Access course resources</p>
          </div>
        </Link>
      </div>

      {/* Announcement Section */}
      <div className="bg-blue-300 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-800 p-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Announcements
          </h2>
        </div>
        <div className="p-6">
          <AnnouncementSection
            subject={subject}
            updateTrigger={updateTrigger}
          />
        </div>
      </div>

      {user && user.type === "teacher" && (
        <button
          className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white text-xl font-semibold py-2 px-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          onClick={() => setOpen(true)}
        >
          <span className="mr-2">📢</span> Announce
        </button>
      )}

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <Form
              title="Enter Announcement"
              fields={fields}
              onSubmit={handleSubmit}
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ClassLayout = () => {
  const subject = useParams().subject;
  // console.log(subject)
  return (
    <Routes>
      <Route index element={<ClassSection />} />
      <Route path="lectures/*" element={<LectureSection subject={subject} />} />
      <Route
        path="assignments"
        element={<AssignmentSection subject={subject} />}
      />
      <Route path="materials" element={<MaterialSection subject={subject} />} />
    </Routes>
  );
};

export default ClassLayout;
