import React from "react";

const UnitTestBox = ({ position = "relative", title = "Box Title", progress = 50, icon, onClick }) => {
  return (
    <div
      className={`${
        position === "absolute" ? "absolute" : "relative"
      }  border rounded-lg shadow-lg p-3 w-[400px] h-[150px]`}
    >
      {/* Title and Icon */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          {icon}
          <span className="ml-2 font-bold text-xl text-gray-700 mt-2">{title}</span>
        </div>
        <button
          onClick={onClick}
          className="text-gray-500 hover:text-sky-800"
        >
          ▶ {/* Play Icon (or custom button action) */}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-300 h-3 rounded-full mt-10">
        <div
          className="bg-sky-800 h-3 rounded-full"
          style={{ width: `${progress}%` }} // Dynamic progress percentage
        ></div>
      </div>
    </div>
  );
};

export default UnitTestBox;
