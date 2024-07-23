import React, { useState } from 'react';

const Assignment = ({ assignment, onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      onFileUpload(file, assignment.title);
    } else {
      alert('Please select a file to upload');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out mb-6">
      <h2 className="text-2xl font-bold mb-4 text-center">{assignment.title}</h2>
      <p className="text-gray-600 mb-4 text-center">{assignment.description}</p>
      <p className="text-gray-600 mb-4 text-center font-semibold">Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
            Upload your file
          </label>
          <input
            type="file"
            id="file"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            onChange={handleFileChange}
          />
        </div>
        {assignment.files && <p>{assignment.files[0]}</p>}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Assignment;
