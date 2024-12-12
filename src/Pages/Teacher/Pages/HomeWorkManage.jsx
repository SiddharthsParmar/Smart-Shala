import React, { useEffect, useState } from "react";
import "../css/HWManage.css";
import "../css/HoLeftNavBar.css";
import TeacherLeftSideNavBar from "../Components/TeacherLeftSideNavBar";
import HWListComponent from "../Components/HWListComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomeWorkManage = () => {
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const [homeworks, setHomeworks] = useState([]);
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => setSidebarExpanded(!isSidebarExpanded);
  const navigate = useNavigate();

  useEffect(() => {
    async function getHomeworksAssignedByTeacher() {
      const res = await axios.get(`http://localhost:3000/teacher/${savedAuth.id}/homeworks`);
      console.log(res.data.homeworks);
      setHomeworks(res.data.homeworks);
    }
    getHomeworksAssignedByTeacher();
  },[]); 

  return (
    <div className="flex">
      {/* Sidebar */}
      <TeacherLeftSideNavBar
        isExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div
        className={`flex-1 bg-gray-200 p-6 transition-width duration-300 ${
          isSidebarExpanded ? "ml-64" : "ml-16"
        }`}
      >
        <div className="bg-white rounded shadow-lg w-full min-h-[600px] p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-semibold text-xl">Add Homework</h1>
            <button
            onClick={()=>{navigate("/teacher/add-homework/form")}}
              type="button"
              className="bg-sky-800 text-white font-bold text-base px-8 py-3 rounded shadow-md hover:shadow-lg  transition duration-150"
            >
              Add Homework +
            </button>
          </div>
          <hr className="mb-6" />

          {/* Homework List */}
          <div className=" rounded-sm h-screen  overflow-y-hidden ">
            {homeworks.map((hw) => (
              <HWListComponent homework = {hw} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeWorkManage;
