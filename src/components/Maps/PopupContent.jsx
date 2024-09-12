import React from "react";

const PopupContent = ({ message, onClick }) => {
  return (
    <div className="p-4 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      {/* Message */}
      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">
        Coordinates:
        <br />
        {message}
      </p>

      {/* Button */}
      <button
        onClick={onClick}
        className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900 transition-all"
      >
        View Images
      </button>
    </div>
  );
};

export default PopupContent;
