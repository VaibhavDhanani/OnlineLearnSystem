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
      setUpdateTrigger(prev => prev + 1);
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
    <div className="container relative mx-auto px-4">
      {/* Top Row: Lessons, Assignment, Material */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to={`/home/${subject}/lectures`}>
          <div className="bg-orange-400 p-4 rounded text-center">
            <h2 className="text-xl font-semibold">Lessons</h2>
            <p className="mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
          </div>
        </Link>
        <Link to={`/home/${subject}/assignments`}>
          <div className="bg-gray-100 p-4 rounded text-center">
            <h2 className="text-xl font-semibold">Assignment</h2>
          </div>
        </Link>
        <Link to={`/home/${subject}/materials`}>
          <div className="bg-gray-100 p-4 rounded text-center">
            <h2 className="text-xl font-semibold">Material</h2>
          </div>
        </Link>
      </div>

      {/* Announcement Section */}
      <div className="min-h-96 max-h-max bg-red-200">
        <div className="bg-blue-100 p-4 rounded text-center mt-8">
          <h2 className="text-xl font-semibold">Announcement</h2>
        </div>
        <AnnouncementSection subject={subject} updateTrigger={updateTrigger} />
      </div>
      {user && user.type === "teacher" && (
        <button
          className="fixed bottom-16 right-16 border-green-500 border-2 bg-white text-green-500 hover:bg-green-500 hover:text-white text-base p-2 min-w-[40px] rounded-xl font-bold cursor-pointer transition-all duration-300 ease-in-out flex justify-center items-center leading-none"
          onClick={() => setOpen(true)}
        >
          Announce
        </button>
      )}
      {open && (
        <Form
          title="Enter Announcement"
          fields={fields}
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
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
