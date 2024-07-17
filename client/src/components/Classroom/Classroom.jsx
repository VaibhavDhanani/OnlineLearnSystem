import React, { useEffect, useState } from "react";
import Card from "../common/Card/Card.jsx";
import { useAuth } from "../../hooks/AuthContext.jsx";
import { URL } from "../../constant.js";

const Classroom = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      const token = localStorage.getItem("token");
      try {
        setLoading(true);
        const response = await fetch(`${URL}/class/student`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ codes: user.classCodes }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }

        const data = await response.json();
        setClasses(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching classes:", error);
        setError("Failed to load classes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/class`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          subject: subjectName,
          userId: user._id,
        }),
      });
      if (!response.ok) throw new Error("Failed to create class");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
      alert("Failed to create class: " + error.message);
    }
    setOpen(false);
    setSubjectName("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (classes.length === 0) {
    return <div>No classes found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 bg-gray-100 rounded-lg shadow-inner">
      {classes.map((classItem) => (
        <Card key={classItem._id} classData={classItem} />
      ))}
      <button
        className="fixed bottom-16 right-16 border-green-500 border-2 bg-white text-green-500 hover:bg-green-500 hover:text-white text-base p-2 min-w-[40px] rounded-xl font-bold cursor-pointer transition-all duration-300 ease-in-out flex justify-center items-center leading-none"
        onClick={() => setOpen(true)}
      >
        Add Class
      </button>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Enter Class Details
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-600 hover:text-gray-800 transition duration-150 ease-in-out"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="teacher"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Teacher
                </label>
                <input
                  type="text"
                  id="teacher"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={user.username}
                  disabled
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter subject name"

                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classroom;
