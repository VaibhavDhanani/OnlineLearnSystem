import React, { useState, useEffect } from 'react';
import Assignment from './Assignment';

const AssignmentSection = ({ subject }) => {
  const [assignments, setAssignments] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch(`${URL}/assignments?class=${subject}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, [subject]);

  const handleFileUpload = async (selectedFile, assignmentTitle) => {
    try {
      const storageRef = ref(storage, "/documents/" + selectedFile.name);
      const snapshot = await uploadBytes(storageRef, selectedFile);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      setFile(downloadUrl);
      alert(`File ${selectedFile.name} submitted for ${assignmentTitle}`);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file: " + error.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Assignments for {subject}</h1>
      {assignments.map((assignment) => (
        <Assignment key={assignment._id} assignment={assignment} onFileUpload={handleFileUpload} />
      ))}
      <div className="text-center mt-6">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files[0], 'General Upload')}
        />
        <label
          htmlFor="file-upload"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
        >
          Upload Assignment
        </label>
      </div>
    </div>
  );
};

export default AssignmentSection;