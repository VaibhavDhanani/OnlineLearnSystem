import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ classData }) => {
  const { subject, description } = classData;
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate(`/home/${subject}`);
  };

  return (
    <div className="group relative overflow-hidden bg-white text-gray-700 shadow-lg rounded-2xl p-6 w-full h-full transform transition duration-500 hover:scale-105 hover:shadow-2xl">
      <div className="absolute -top-10 -right-10 bg-blue-500 w-24 h-24 rounded-full transform transition-all duration-300 group-hover:scale-150"></div>
      <div className="relative z-10">
        <h3 className="text-xl sm:text-2xl font-bold mb-3 transform transition duration-300 group-hover:translate-x-3">
          {subject}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-6 transform transition duration-300 group-hover:translate-x-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque
          optio repellendus.
        </p>
        <button
          onClick={handleExploreClick}
          className="bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-full font-semibold transform transition duration-300 hover:bg-blue-600 hover:scale-105 group-hover:translate-x-3"
        >
          Explore
        </button>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform transition-all duration-300 group-hover:h-2"></div>
    </div>
  );
};

export default Card;
