import React, { useEffect, useState } from "react";
import { URL } from "../constant";

const EmailSend = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");

  const fetchDetails = async () => {
    try {
      const response = await fetch(`${URL}/user`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
      setStatus("Failed to fetch students");
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleSelectStudent = (email) => {
    setSelectedStudents((prevSelected) => {
      if (prevSelected.includes(email)) {
        return prevSelected.filter((selectedEmail) => selectedEmail !== email);
      } else {
        return [...prevSelected, email];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map((student) => student.email));
    }
  };

  const sendEmails = async () => {
    setIsSending(true);
    setStatus("Sending emails...");

    try {
      const response = await fetch(`${URL}/sendemail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          to: selectedStudents,
          subject: emailSubject,
          text: emailBody,
          html: `<p>${emailBody}</p>`,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setStatus("Emails sent successfully!");
    } catch (error) {
      console.error("Error sending emails:", error);
      setStatus("Failed to send emails");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">
        Send Email to Students
      </h1>

      <div className="mb-4">
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Subject:
        </label>
        <input
          type="text"
          id="subject"
          value={emailSubject}
          onChange={(e) => setEmailSubject(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="body"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Body:
        </label>
        <textarea
          id="body"
          value={emailBody}
          onChange={(e) => setEmailBody(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
        />
      </div>

      <div className="mb-4">
        <button
          onClick={handleSelectAll}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {selectedStudents.length === students.length
            ? "Deselect All"
            : "Select All"}
        </button>
      </div>

      <div className="mb-6">
        <label
          htmlFor="students"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Students:
        </label>
        <div
          id="students"
          className="space-y-2 max-h-60 overflow-y-auto border border-gray-300 rounded-md p-2"
        >
          {students.map((student) => (
            <div key={student._id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedStudents.includes(student.email)}
                onChange={() => handleSelectStudent(student.email)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{student.email}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={sendEmails}
        disabled={isSending || selectedStudents.length === 0}
        className={`w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isSending || selectedStudents.length === 0
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSending ? "Sending..." : "Send Emails"}
      </button>

      {status && <p className="mt-4 text-sm text-gray-600">{status}</p>}
    </div>
  );
};

export default EmailSend;
