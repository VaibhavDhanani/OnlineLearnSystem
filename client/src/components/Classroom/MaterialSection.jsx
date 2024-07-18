import React, { useState, useEffect } from "react";
import { storage } from "../../firebase/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { URL } from "../../constant";
import Form from "../common/Form/Form";

const MaterialSection = ({ subject }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [materials, setMaterials] = useState([]);

  //   useEffect(() => {
  //     const fetchMaterials = async () => {
  //       try {
  //         const response = await fetch(`${URL}/materials/${subject}`, {
  //           headers: {
  //             'Authorization': `Bearer ${localStorage.getItem('token')}`
  //           }
  //         });

  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }

  //         const data = await response.json();

  //         if (data.success) {
  //           setMaterials(data.data);
  //         } else {
  //           throw new Error(data.message || "Failed to fetch materials");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching materials:", error);
  //         alert("Failed to load materials. Please try again later.");
  //       }
  //     };

  //     if (subject) {
  //       fetchMaterials();
  //     }
  //   }, [subject]);
  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      try {
        const storageRef = ref(storage, "/documents/" + selectedFile.name);
        const snapshot = await uploadBytes(storageRef, selectedFile);
        const downloadUrl = await getDownloadURL(snapshot.ref);

        setFile(downloadUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file: " + error.message);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({ subject, title, description, file });
    setOpen(false);
  };

  const fields = [
    {
      id: "subject",
      label: "Subject",
      type: "text",
      placeholder: "Enter subject",
      value: subject,
      onChange: null,
      required: true,
      disabled: true,
    },
    {
      id: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter title",
      value: title,
      onChange: setTitle,
      required: true,
      disabled: false,
    },
    {
      id: "description",
      label: "Description",
      type: "text",
      placeholder: "Enter short description",
      value: description,
      onChange: setDescription,
      required: true,
      disabled: false,
    },
    {
      id: "file",
      label: "File",
      type: "file",
      placeholder: "Upload the material",
      onChange: handleFileUpload,
      disabled: false,
      required: true,
      accept: "application/pdf",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Study Materials</h2>

      {materials.length === 0 ? (
        <p className="text-gray-600 text-center">
          No materials available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <div
              key={material.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {material.title}
                </h3>
                <p className="text-gray-600 mb-4">{material.description}</p>
                <a
                  href={material.downloadLink}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                  download
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="fixed bottom-16 right-16 border-green-500 border-2 bg-white text-green-500 hover:bg-green-500 hover:text-white text-base p-2 min-w-[40px] rounded-xl font-bold cursor-pointer transition-all duration-300 ease-in-out flex justify-center items-center leading-none"
        onClick={() => setOpen(true)}
      >
        Upload Material
      </button>
      {open && (
        <Form
          title="Enter Material Details"
          fields={fields}
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default MaterialSection;
