import React, { useState } from "react";
import Form from "../common/Form/Form";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

const LectureDetail = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your submit logic here
    console.log({ title, description, file });
    setOpen(false);
  };

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, 'videos/LearnSpace/' + selectedFile.name);
        const snapshot = await uploadBytes(storageRef, selectedFile);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        console.log('File uploaded successfully. Download URL:', downloadUrl);
        setFile(downloadUrl);
      } catch (error) {
        console.error('Error uploading file:', error);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Video segment */}
        <div className="lg:w-1/3">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Lecture thumbnail"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Lecture details */}
        <div className="lg:w-1/2 space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Lecture 1</h2>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Introduction to React
            </h3>

            <p className="text-gray-600 mb-4">
              In this lecture, we cover the basics of React, including
              components, state, and props. We'll build a simple application to
              demonstrate these concepts in action.
            </p>

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
              Posted on July 19, 2024
            </div>
          </div>
        </div>
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
