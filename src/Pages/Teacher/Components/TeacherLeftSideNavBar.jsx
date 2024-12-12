import React from "react";
import { FaAngleRight, FaAngleLeft, FaHome, FaUser, FaChalkboardTeacher, FaClipboardList, FaCheckCircle, FaBell, FaExclamationTriangle, FaBookOpen, FaBoxOpen } from "react-icons/fa";
import { MdAssignment, MdNotificationsActive } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { Link } from 'react-router-dom';
import '../css/HoLeftNavBar.css';
import { useAuth } from "../../../context/auth.jsx";
import { GoTools } from "react-icons/go";
import { FaRunning } from "react-icons/fa";
import { BsFileEarmarkCheckFill } from "react-icons/bs";
import { MdPlaylistAddCheck } from "react-icons/md";
const TeacherLeftSideNavBar = ({ isExpanded, toggleSidebar }) => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      _id: null,
      token: "",
      role: ""
    });
    localStorage.removeItem("token");
  };

  return (
    <div
      className={`${isExpanded ? "w-64" : "w-16"
        } h-screen transition-all duration-300 border-r-4 border-gray-50 fixed`}
    >
      <button
        onClick={toggleSidebar}
        className="p-4 focus:outline-none text-xl textColor w-full"
      >
        {isExpanded ? <FaAngleLeft className="                  " /> : <FaAngleRight className="                  e" />}
      </button>

      <ul className="mt-4">
         <li className="bGcolor "> 
         <Link to="/teacher" className="flex items-center p-4 rounded cursor-pointerr">
             <FaHome className="text-xl textColor " />
             {isExpanded && <span className="ml-4 textColor font-normal">Home</span> }
          </Link>
          </li>
       
         <li className="bGcolor ">
         <Link to="/teacher/profile" className=" e flex items-center p-4 rounded cursor-pointer">
          <FaUser className="text-xl textColor                  " />
          {isExpanded && <span className="ml-4 textColor font-normal">Profile</span>}
        </Link>
          </li>
         <li className="bGcolor ">
         <Link to="/teacher/classrooms" className="  flex items-center p-4 rounded cursor-pointer">
          <FaChalkboardTeacher className="text-xl textColor               " />
          {isExpanded && <span className="ml-4 textColor font-normal">My Classrooms</span>}
        </Link>
          </li>
         <li className="bGcolor ">
         <Link to="/teacher/add-homework" className="  flex items-center p-4 rounded cursor-pointer">
          <MdAssignment className="text-xl                 hover:                " />
          {isExpanded && <span className="ml-4 textColor font-normal">Add Homework</span>}
        </Link>
        <Link to="/teacher/classroomsforHomework" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <FaClipboardList className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Check Homework</span>}
        </Link>
        <Link to="/teacher/notifications" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <MdNotificationsActive className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Notifications</span>}
        </Link>
        <Link to="/teacher/mark-attendance" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <FaCheckCircle className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Mark Attendance</span>}
        </Link>
        <Link to="/teacher/classrooms-low-attendance" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <FaBell className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Check Attendance</span>}
        </Link>
        <Link to="/teacher/generate-issue" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <FaExclamationTriangle className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Generate Issue</span>}
        </Link>
        <Link to="/teacher/emergency" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <FaExclamationTriangle className="text-xl textColor text-red-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Emergency Alert</span>}
        </Link>
        <Link to="/teacher/request-resource" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <FaBoxOpen className="text-xl textColor text-red-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Request Resource</span>}
        </Link>
        <Link to="/login" className="colorNavChange flex items-center p-4 rounded cursor-pointer" onClick={handleLogout}>
          <IoLogOut className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">LogOut</span>}
         </Link>
        </li> 
      </ul>
    </div>
  );
};

export default TeacherLeftSideNavBar;