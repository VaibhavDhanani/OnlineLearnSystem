import React, { useState, useEffect } from "react";
import Assignment from "./Assignment";
import Form from "../common/Form/Form";
import { URL } from "../../constant";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const AssignmentSection = ({ subject }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [files, setFiles] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch(`${URL}/assignments/${subject}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAssignments(data.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, [subject]);

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, "documents/" + selectedFile.name);
        const snapshot = await uploadBytes(storageRef, selectedFile);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        console.log("File uploaded successfully. Download URL:", downloadUrl);

        setFiles((prevFiles) => [...prevFiles, downloadUrl]);
      } catch (error) {
        console.error("Error uploading selectedFile:", error);
        return null;
      }
    }
  };

  const fields = [
    {
      id: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter assignment title",
      value: title,
      onChange: setTitle,
      required: true,
    },
    {
      id: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter assignment description",
      value: description,
      onChange: setDescription,
      required: true,
    },
    {
      id: "dueDate",
      label: "Due Date",
      type: "datetime-local",
      value: dueDate,
      onChange: setDueDate,
      required: true,
    },
    {
      id: "files",
      label: "Files",
      type: "file",
      accept: ".pdf,.doc,.docx,.txt",
      onChange: handleFileUpload,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({
    //   title,
    //   description,
    //   dueDate,
    //   files,
    //   subject,
    // });
    try {
      const response = await fetch(`${URL}/assignments/insert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          description,
          dueDate,
          files,
          subject,
        }),
      });

      if (response.ok) {
        setOpen(false);
        setTitle("");
        setDescription("");
        setDueDate("");
        setFiles([]);
      } else {
        console.error("Failed to create assignment");
      }
    } catch (error) {
      console.error("Error submitting assignment:", error);
    }
  };

  console.log(assignments);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">
        Assignments for {subject}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {assignments.map((assignment) => (
          <Assignment
            key={assignment._id}
            assignment={assignment}
            onFileUpload={handleFileUpload}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
          />
        ))}
      </div>

      <div className="fixed bottom-10 right-10">
        <button
          className="x border-green-500 border-2 bg-white text-green-500 hover:bg-green-500 hover:text-white text-base p-2 min-w-[40px] rounded-xl font-bold cursor-pointer transition-all duration-300 ease-in-out flex justify-center items-center leading-none"
          onClick={() => setOpen(true)}
        >
          Create New Assignment
        </button>
        {open && (
          <Form
            title="Create New Assignment"
            fields={fields}
            onSubmit={handleSubmit}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AssignmentSection;
