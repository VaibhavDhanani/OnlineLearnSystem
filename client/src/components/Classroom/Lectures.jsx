import React, { useEffect, useState, useCallback } from "react";
import { URL } from "../../constant";
import Form from "../common/Form/Form";
import { Link, Route, Routes } from "react-router-dom";
import LectureDetail from "./LectureDetail.jsx";
import Lesson from "./lecture";
import { useAuth } from "../../hooks/AuthContext.jsx";

const Lectures = ({ subject }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lectures, setLectures] = useState([]);
  const [title, setTitle] = useState("");
  const { user } = useAuth();

  const fetchLectures = useCallback(async () => {
    try {
      const response = await fetch(`${URL}/lectures`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ subject }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLectures(data);
    } catch (error) {
      console.error("There was a problem fetching the lectures:", error);
    } finally {
      setIsLoading(false);
    }
  }, [subject]);

  useEffect(() => {
    fetchLectures();
  }, [fetchLectures]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/lectures/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, subject }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();
      await fetchLectures();
      setOpen(false);
      setTitle("");
    } catch (error) {
      console.error("Error uploading lecture:", error);
      alert("Failed to upload lecture. Please try again.");
    }
  };

  const fields = [
    {
      id: "subject",
      label: "Class Code",
      type: "text",
      placeholder: "Subject",
      value: subject,
      onChange: null,
      required: true,
      disabled: true,
    },
    {
      id: "title",
      label: "Title",
      type: "text",
      placeholder: "Class Title",
      value: title,
      onChange: setTitle,
      required: true,
      disabled: false,
    },
  ];

  if (isLoading) return <p>Loading ...</p>;

  return (
    <div className="container h-full mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Lessons</h1>
      <div className="space-y-4">
        {lectures.length > 0 ? (
          lectures.map((lecture) => (
            <Link
              key={lecture._id}
              to={`/home/Mathematics/lectures/${lecture._id}`}
              className="block bg-yellow-100 border-l-8 border-yellow-400 hover:bg-yellow-200 transition-colors duration-200 ease-in-out"
            >
              <Lesson lecture={lecture} />
            </Link>
          ))
        ) : (
          <p>This Class has no Lessons yet</p>
        )}
      </div>
      {user.type === "teacher" && (
        <div className="fixed bottom-10 right-10">
          <button
            className="x border-green-500 border-2 bg-white text-green-500 hover:bg-green-500 hover:text-white text-base p-2 min-w-[40px] rounded-xl font-bold cursor-pointer transition-all duration-300 ease-in-out flex justify-center items-center leading-none"
            onClick={() => setOpen(true)}
          >
            Add Lesson
          </button>
          {open && (
            <Form
              title="Enter Material Details"
              fields={fields}
              onSubmit={handleSubmit}
              onClose={() => setOpen(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

const LectureSection = ({ subject }) => (
  <Routes>
    <Route index element={<Lectures subject={subject} />} />
    <Route path=":lectureId" element={<LectureDetail />} />
  </Routes>
);

export default LectureSection;