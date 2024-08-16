import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "../common/Form/Form";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { URL } from "../../constant";
import { useAuth } from "../../hooks/AuthContext";
import image from "../../assets/image.png";

const LectureDetail = () => {
  const lessonIdString = useParams().lectureId;
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchLectures = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${URL}/resource/${lessonIdString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch lectures");
      const data = await response.json();
      setLectures(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, [lessonIdString]);

  // console.log(lectures);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lecture = {
      title,
      lessonId: lessonIdString,
      description,
      videolink: file,
    };

    try {
      const response = await fetch(`${URL}/resource`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(lecture),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setOpen(false);
      setTitle("");
      setDescription("");
      setFile(null);
      fetchLectures();
    } catch (error) {
      console.error("Error submitting lecture:", error);
      setError("Failed to submit lecture. Please try again.");
    }
  };

  // console.log(localStorage.getItem("token"))
  const deleteLecture = async (lecture) => {
    try {
      const response = await fetch(`${URL}/resource/delete/${lecture._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ lessonId: lessonIdString }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchLectures();
      setLectures((prev) => prev.filter((lec) => lec._id !== lecture._id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      try {
        const storage = getStorage();
        const storageRef = ref(
          storage,
          "videos/LearnSpace/" + selectedFile.name
        );
        const snapshot = await uploadBytes(storageRef, selectedFile);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        console.log("File uploaded successfully. Download URL:", downloadUrl);
        setFile(downloadUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
        setError("Failed to upload file. Please try again.");
      }
    }
  };

  const fields = [
    {
      id: "title",
      label: "Title",
      type: "text",
      placeholder: "Lecture Title",
      value: title,
      onChange: setTitle,
      required: true,
      disabled: false,
    },
    {
      id: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Lecture Description",
      value: description,
      onChange: setDescription,
      required: true,
      disabled: false,
    },
    {
      id: "file",
      label: "VideoLink",
      type: "file",
      value: file,
      placeholder: "Upload the Video",
      onChange: handleFileUpload,
      disabled: false,
      required: true,
      accept: "video/*",
    },
  ];
  //   console.log('user:', user);
  // console.log('lectures:', lectures);
  // console.log('lessonIdString:', lessonIdString);
  // console.log('token', localStorage.getItem('token'));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-indigo-900 mb-5 text-center">
        Lectures
      </h1>
      <div className="space-y-8 max-w-6xl mx-auto">
        {lectures.length !== 0 ? (
          lectures.map((lecture, index) => (
            <div
              key={lecture._id}
              className="flex flex-col lg:flex-row gap-8 bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-full">
                <div className="aspect-w-16 aspect-h-9">
                  <video
                    className="w-full h-full object-cover rounded-tl-xl lg:rounded-bl-xl"
                    controls
                  >
                    <source src={lecture.videolink} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <div className="p-8 w-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold text-indigo-800">
                      Lecture {index + 1}
                    </h2>
                    {user && user.type === "teacher" && (
                      <button
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        onClick={() => deleteLecture(lecture)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                    {lecture.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {lecture.description}
                  </p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="w-5 h-5 mr-2 text-indigo-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Posted on {new Date(lecture.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg italic bg-white p-8 rounded-xl shadow-md">
            No lectures available yet.
          </p>
        )}
      </div>
      {user.type === "teacher" && (
        <div className="fixed bottom-10 right-10">
          <button
            className="bg-gradient-to-r from-green-400 to-green-600 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out flex items-center"
            onClick={() => setOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Lecture
          </button>
          {open && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                <Form
                  title="Enter Lecture Details"
                  fields={fields}
                  onSubmit={handleSubmit}
                  onClose={() => setOpen(false)}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LectureDetail;
