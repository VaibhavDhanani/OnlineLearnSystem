import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { URL } from "../../constant";
import { storage } from "../../firebase/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Assignment = ({ assignment }) => {
  const [file, setFile] = useState(null);
  const { user } = useAuth();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const pdfViewerRef = useRef(null);
  const iframeRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsSubmitted(
      assignment.submission.some((sub) => sub.student === user._id)
    );

    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
      if (iframeRef.current) {
        iframeRef.current.style.height = document.fullscreenElement
          ? "100vh"
          : "300px";
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [assignment.submission, user._id]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      try {
        const storageRef = ref(storage, "/documents/" + selectedFile.name);
        const snapshot = await uploadBytes(storageRef, selectedFile);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        setFile(downloadUrl);
        return true;
      } catch (error) {
        console.error("Error uploading file:", error);
        return false;
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!assignment?._id) {
      console.error("Assignment or assignment ID is missing");
      alert("Assignment information is missing. Please try again.");
      return;
    }

    try {
      const response = await fetch(
        `${URL}/assignments/${assignment._id}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ user, file, assignmentId: assignment._id }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit assignment");
      }

      const result = await response.json();
      setIsSubmitted(true);
      setFile(null);
      console.log("Assignment submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting assignment:", error);
      alert(`Error submitting assignment: ${error.message}`);
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      pdfViewerRef.current?.requestFullscreen().catch((err) => {
        alert(`Error enabling full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-8 overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-full p-8 space-y-6">
          <h2 className="text-3xl font-extrabold text-indigo-900 border-b pb-2">
            {assignment.title}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {assignment.description}
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-lg font-semibold">
              Due Date:{" "}
              <span className="text-indigo-600">
                {new Date(assignment.dueDate).toLocaleDateString()}
              </span>
            </p>
            {isSubmitted && (
              <p className="text-lg text-green-600 bg-green-100 p-3 rounded-lg">
                ✅ Assignment submitted successfully!
              </p>
            )}
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="file"
              >
                Upload your file
              </label>
              <input
                type="file"
                id="file"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                onChange={handleFileChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-bold py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-indigo-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transform hover:scale-105"
            >
              Submit Assignment
            </button>
          </form>
        </div>
        <div className="lg:w-1/2 p-6 bg-gray-100 rounded-2xl m-4">
          {assignment.files?.[0] && (
            <div
              ref={pdfViewerRef}
              className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <iframe
                ref={iframeRef}
                src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(assignment.files[0])}`}
                width="100%"
                height="400px"
                className="border-none"
              ></iframe>
              {!isFullScreen && (
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                  onClick={toggleFullScreen}
                >
                  <span className="text-white text-lg font-semibold bg-indigo-600 px-4 py-2 rounded-lg">
                    Click to expand
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignment;
