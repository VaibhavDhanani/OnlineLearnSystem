import React, { useEffect, useState } from "react";
import Card from "../common/Card/Card.jsx";
import { useAuth } from "../../hooks/AuthContext.jsx";
import { URL } from "../../constant.js";
import Form from "../common/Form/Form.jsx";

const Classroom = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      if (!user) return; 
      const token = localStorage.getItem("token");
      try {
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
  }, [user, URL]);

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
      // Consider updating the classes state here to include the new class
      setClasses(prevClasses => [...prevClasses, data]);
    } catch (error) {
      console.log(error);
      alert("Failed to create class: " + error.message);
    }
    setOpen(false);
    setSubjectName("");
  };

  const fields = [
    {
      id: "teacher",
      label: "Teacher",
      type: "text",
      placeholder: "",
      value: user?.username || "",
      onChange: () => {},
      required: true,
      disabled: true,
    },
    {
      id: "subject",
      label: "Subject",
      type: "text",
      placeholder: "Enter subject name",
      value: subjectName,
      onChange: (value) => setSubjectName(value),
      required: true,
      disabled: false,
    },
  ];

  if (!user) {
    return <div>Please join the classes to view or referesh</div>;
  }

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
        <Form
          title="Enter Class Details"
          fields={fields}
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default Classroom;