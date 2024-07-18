import React from "react";

const Form = ({ title, fields, onSubmit, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition duration-150 ease-in-out"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form className="space-y-6" onSubmit={onSubmit}>
          {fields.map((field, index) => (
            <div key={index}>
              <label
                htmlFor={field.id}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.label}:
              </label>
              <input
                type={field.type}
                id={field.id}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={field.placeholder}
                value={field.type !== "file" ? field.value : undefined}
                onChange={(e) => {
                  if (field.type === "file") {
                    field.onChange(e); // Pass the entire event for file inputs
                  } else {
                    field.onChange(e.target.value); // For other inputs, pass just the value
                  }
                }}
                required={field.required}
                disabled={field.disabled}
                accept={field.type === "file" ? field.accept : undefined}
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
