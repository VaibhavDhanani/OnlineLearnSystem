import React, { useState } from "react";
import { useAuth } from "../../hooks/AuthContext.jsx";
import { URL } from "../../constant.js";

const BasicModal = () => {
  const [open, setOpen] = useState(false);
  const [classCode, setClassCode] = useState("");
  const { user } = useAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${URL}/user/joinclass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          classCode: classCode,
          userId: user._id,
        }),
      });

      const data = await response.json();
      const success = data.success;

      if (success) {
        handleClose();
      } else {
        alert("Failed to join the class: " + data.message);
      }
    } catch (error) {
      console.error("Error joining class:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="bg-white text-green-500 hover:bg-green-500 hover:text-white text-3xl w-10 h-10 rounded-full p-0 font-bold cursor-pointer transition-all duration-300 flex justify-center items-center leading-none"
      >
        +
      </button>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold mb-4">Enter Class Code</h2>
              <button
                onClick={handleClose}
                className="mb-4 text-xl w-6 h-6 text-white hover:text-gray-800 rounded-full bg-red-600"
              >
                X
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Class Code"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicModal;
