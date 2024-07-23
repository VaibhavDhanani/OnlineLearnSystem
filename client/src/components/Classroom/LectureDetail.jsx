import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "../common/Form/Form";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { URL } from "../../constant";

const LectureDetail = () => {
  const lessonIdString = useParams().lectureId;
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  console.log(lectures);

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
      // Reset form fields
      setTitle("");
      setDescription("");
      setFile(null);
      // Fetch lectures again to update the list
      fetchLectures();
    } catch (error) {
      console.error("Error submitting lecture:", error);
      setError("Failed to submit lecture. Please try again.");
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
      placeholder: "Upload the Video",
      onChange: handleFileUpload,
      disabled: false,
      required: true,
      accept: "video/*",
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {lectures.map((lecture, index) => (
          <div
            key={lecture._id}
            className="flex flex-col lg:flex-row gap-8 bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="md:w-1/3">
              <div className="aspect-w-16 aspect-h-9">
                <video className="w-full h-full object-cover" controls>
                  <source src={lecture.videolink} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Lecture {index + 1}
                </h2>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  {lecture.title}
                </h3>
                <p className="text-gray-600 mb-4">{lecture.description}</p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg
                  className="w-4 h-4 mr-2"
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
        ))}
      </div>
      <div className="fixed bottom-10 right-10">
        <button
          className="border-green-500 border-2 bg-white text-green-500 hover:bg-green-500 hover:text-white text-base p-2 min-w-[40px] rounded-xl font-bold cursor-pointer transition-all duration-300 ease-in-out flex justify-center items-center leading-none"
          onClick={() => setOpen(true)}
        >
          Add Lecture
        </button>
        {open && (
          <Form
            title="Enter Lecture Details"
            fields={fields}
            onSubmit={handleSubmit}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default LectureDetail;
